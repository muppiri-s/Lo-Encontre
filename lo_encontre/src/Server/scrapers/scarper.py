import asyncio
import concurrent.futures
import hashlib
from datetime import datetime as dt

import click
import requests
from bs4 import BeautifulSoup

from config import Config, ES, EP

INDEX = 'product'


def delete_document(doc_id, item_name, address):
    if ES.exists(index=Config.ES_INDEX, doc_type='default', id=doc_id):
        click.echo("Discount for {} at {} is on longer available.".format(item_name, address))
        ES.delete(index=Config.ES_INDEX, doc_type='default', id=doc_id)


def parse_item_data(item):
    """Parses the inventory and pricing data for a given item
    :param
        item:Subsection of the primary page's HTML containing product information
    :return:
    """
    minimum_percent_off = 20
    minimum_percent_off = (100-minimum_percent_off)/100

    links = item.find_all('a')
    item_summary = links[0]
    item_name = item_summary['title']
    if 'walmart' in links[2]['href']:
        sku = links[2]['href'].split('/')[-1]
        store_name = 'Walmart'
    elif 'target' in links[2]['href']:
        sku = links[2]['href'].split('=')[-1][:-1]
        store_name = 'Target'
    else:
        # ToDO Support more stores. Bestbuy would be top pick.
        return

    data = {
        'method': 'sku',
        'sku': sku,
        'upc': None,
        'zip': Config.ZIP_CODE,
        'sort': 'recommended'
    }

    # Load the product page's HTML in as text for parsing
    base_item_url = '{}-inventory-checker?sku={}'.format(store_name.lower(), sku)
    url = EP.format(base_item_url)
    response = requests.post(url, data=data, proxies=Config.PROXY)
    soup_data = response.text

    if 'No results found in the searched area.' in soup_data:
        return

    inventory_soup = BeautifulSoup(soup_data, 'html.parser')

    try:
        stores = inventory_soup.main.find("div", {"class": "table"})
        stores = stores.find_all("div", {"class": "table__row"})[1:]

        original_price = inventory_soup.main.find_all("div", {"class": "item-overview__meta-item"})[0]
        original_price = original_price.text.split(' ')[-2]

        if 'N/A' in original_price:
            return

        original_price = float(original_price[1:].replace(',', ''))

    except AttributeError:
        click.echo('Unable to parse {}'.format(url))
        return

    for store in stores:
        if store_name == 'Walmart':
            address = store.address.find_all("a", {"class": "address__link"})[0]['href'].split("?q=")[-1]
            address = address.replace("+", " ")
        elif store_name == 'Target':
            address = store.address.text.split('\n')[1][:-1]
        else:
            return

        doc_id = hashlib.sha256(str.encode('{} {} {}'.format(store_name, address.replace(" ", ""), sku))).hexdigest()
        quantity = store.find("div", {"class": "inventory-checker-table__availability"}).text
        quantity = quantity.replace("\n", "")

        if 'Out of Stock' in quantity or 'Limited Stock' in quantity:
            delete_document(doc_id, item_name, address)
            continue

        try:
            price = store.find("span", {"class": "price-formatted"}).text
            price = float(price[1:].replace(',', ''))
            if price > (original_price * minimum_percent_off):
                delete_document(doc_id, item_name, address)
                continue
        except AttributeError:
            delete_document(doc_id, item_name, address)
            continue

        if ES.exists(index=Config.ES_INDEX, doc_type='default', id=doc_id):
            product_doc = ES.get(index=Config.ES_INDEX, doc_type='default', id=doc_id)['_source']
            es_price = product_doc.get('sales_price')
            es_quantity = product_doc.get('quantity')

            if es_quantity != quantity or es_price != price:
                all_changes = product_doc.get('change_log', [])
                change_log = dict(modified_at=dt.utcnow())

                if es_price != price:
                    change_log['sales_price'] = dict(original_price=es_price, new_price=price)
                    click.echo("Price Change! {} at {}. WAS: ${}. NOW: ${}".format(item_name, address,
                                                                                   es_price, price))
                    product_doc['sales_price'] = price

                if es_quantity != quantity:
                    change_log['quantity'] = dict(original_quantity=es_quantity, new_quantity=quantity)
                    product_doc['quantity'] = quantity

                all_changes.append(change_log)
                product_doc['change_log'] = all_changes
                product_doc['last_updated'] = dt.utcnow()

            product_doc['last_seen'] = dt.utcnow()

        else:
            click.echo("NEW! {} found at {} for ${}".format(item_name, address, str(price)))
            product_doc = {
                "created_at": dt.utcnow(),
                "last_seen": dt.utcnow(),
                "store": store_name,
                "address": address,
                "name": item_name,
                "sku": sku,
                "sales_price": price,
                "original_price": original_price,
                "quantity": quantity
            }

        try:
            ES.update(index=Config.ES_INDEX, doc_type='default', id=doc_id,
                      body={
                          "doc": product_doc,
                          "doc_as_upsert": True
                      })
        except Exception as e:
            click.echo(str(e))


async def iter_items(items):
    with concurrent.futures.ThreadPoolExecutor(max_workers=100) as executor:
        loop = asyncio.get_event_loop()
        futures = [
            loop.run_in_executor(
                executor,
                parse_item_data,
                item
            ) for item in items]

        await asyncio.gather(*futures)


def get_deals(filter_mapping, page=1):
    category = ''
    Config.setup(filter_mapping['index_name'])
    base_url = 'deals/?sort=trending{}{}&pg={}'.format(filter_mapping['url'], category, page)
    url = EP.format(base_url)
    click.echo('Parsing page {}'.format(page))

    soup_data = requests.get(url, proxies=Config.PROXY).text

    try:
        soup = BeautifulSoup(soup_data, 'html.parser')
        items = soup.main.find_all("div", {"class": "item-list__item--deal"})
    except AttributeError:
        click.echo("Refresh your public IP")
        click.echo("Died while parsing page {}".format(page))
        return

    items = [item for item in items if item != '\n']
    loop = asyncio.get_event_loop()
    loop.run_until_complete(iter_items(items))
headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}
page = requests.get('http://www.bestbuy.com/site/misc/deal-of-the-day/pcmcat248000050016.c?id=pcmcat248000050016', headers=headers)
tree = html.fromstring(page.content)

# Parse HTML
prices = tree.xpath('//div[@class="pb-current-price  pb-sale-price"]/span/text()')
items = tree.xpath('//h3[@class="offer-link"]/a/text()')
items += tree.xpath('//h3[@class="feature-ellipsis"]/a/text()')

# Clean lists
prices = filter(lambda k: '$' not in k, prices)
items = filter(lambda k: '% Off' not in k, items)
items = filter(lambda k: 'Merchandise' not in k, items)
items = filter(lambda k: 'Save' not in k, items)
items = filter(lambda k: 'Products' not in k, items)
items = filter(lambda k: 'Gift Card' not in k, items)

# Combine the two lists into one list of tuples. product[0] = item, product[1] = price. Both are str values
products = list(zip(items, prices))

# Write to output
with open("bb_dotd.xml", "w") as f:
	for product in products:
		f.write("<product>\n")
		f.write("\t<item>" + product[0] + "</item>\n")
		f.write("\t<price>" + product[1] + "</price>\n")
		f.write("</product>\n")

# Initializes variable for today's date and time
now = datetime.datetime.now()
now = now.strftime("%A, %B %d, %Y")
# User interaction
print("Welcome to Best Buy's 'Deals of the Day' for " + now + '.')
wallet = float(input('Enter the amount of money you can spend at Best Buy today:\n'))
wallet = '{0:.2f}'.format(wallet)   #str value
print('\nYour wallet holds $' + wallet + '. You can afford:')
for product in products:
	if (float(product[1]) <= float(wallet)):
		print('- ' + product[0] + ' [' + product[1] + ']')