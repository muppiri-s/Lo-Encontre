import requests
import cloudscraper
from bs4 import BeautifulSoup
import time
from collections import defaultdict
from random import choice
import re
import sys
import json
import urllib.request as uReq

def search(product):
    product_count = 20
    amazon = {}
    amazon = search_amazon(product, product_count)

    master_data = {
        'amazon': amazon,
        # 'walmart': walmart,
        # 'target': target,
        # 'macys': macys,
        # 'lowes': lowes,
        # 'dsw': dsw
    }

    json_res = json.dumps(master_data)
    print(json_res)

def search_amazon(product, total_products_count):
    try:

        # Define headers for request
        user_agent_list = [
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:77.0) Gecko/20100101 Firefox/77.0',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
        ]

        user_agent = choice(user_agent_list)
        headers={'User-Agent': user_agent}

        word_list = product.replace(' ', '+')
        url = 'https://www.amazon.in/s?k=' + word_list
        response = requests.get(url, headers = headers)
        soup = BeautifulSoup(response.content, 'html.parser')

        main_div = soup.find_all(cel_widget_id = re.compile('MAIN-SEARCH_RESULTS-2'))
        retry_count = 0

        # If the results are not present, retry by sending a request again until we hit the retry limit
        if main_div is None:

            retry_limit = 10
            while retry_count < retry_limit and main_div is None:
                # user_agent = choice(user_agent_list)
                # headers = {"User-Agent": user_agent}

                response = requests.get(url)
                soup = BeautifulSoup(response.content, 'html.parser')
                main_div = soup.find_all(cel_widget_id = 'SEARCH_RESULTS')

                retry_count += 1

        # If we still did not receive the results, return empty as amazon not reachable
        if main_div is None:
            print("Did not get results from Amazon")
            return {}

        amazon_products_data = defaultdict(dict)
        count = 0

        for item_div in main_div:
            item_name = item_div.find('img')['alt']

            # Check if item is not listed on the amazon page
            if item_name is None:
                continue

            amazon_products_data[count]['item_name'] = item_name.strip().replace(u'\xa0', u' ')

            # Get the rating
            item_rating = item_div.find('i', {'class': 'a-icon'})

            if item_rating is not None:
                item_rating = item_rating.get_text().strip()
                item_rating = "".join([item_rating.split()[0], '/5'])
                
                amazon_products_data[count]['item_rating'] = item_rating
            else:
                amazon_products_data[count]['item_rating'] = 'Unavailable'

            # Get the price
            item_price = item_div.find('span', {'class': 'a-price-whole'})
            if item_price is not None:
                # Get rid of commas in the string
                item_price = item_price.get_text().strip().replace(',', '')
                amazon_products_data[count]['item_price'] = item_price
            else:
                amazon_products_data[count]['item_price'] = 'Unavailable'

            # Get the link
            item_link = item_div.find('a', {'class': 'a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal'})
            amazon_products_data[count]['item_link'] = "".join(['https://www.amazon.com', item_link['href']])

            count += 1
            if count == total_products_count:
                return amazon_products_data

        return amazon_products_data

    except Exception as e:
        print(e)
        return {}

if __name__ == '__main__':
    key = sys.argv[1]
    # amazon = sys.argv[2].lower() == 'true'
    # walmart = sys.argv[3].lower() == 'true'
    # target = sys.argv[4].lower() == 'true'
    # macys = sys.argv[5].lower() == 'true'
    # lowes = sys.argv[6].lower() == 'true'
    # dsw = sys.argv[7].lower() == 'true'
    search(key)