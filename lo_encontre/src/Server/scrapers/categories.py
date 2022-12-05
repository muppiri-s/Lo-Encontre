import pandas as pd  #pandas are for making dataframes
import selenium      #for automating
from selenium import webdriver
import time
from selenium.common.exceptions import NoSuchElementException #for exception handling
from selenium.webdriver.common.by import By
import sys
import json

driver = webdriver.Chrome("C:\\Users\\sahit\\github-classroom\\PFW-CS\\Lo-Encontre\\ChromeDriver\\chromedriver.exe")
driver.get("https://www.amazon.in/")

def get_category(key):
    search = driver.find_element(By.ID, "twotabsearchtextbox")
    search.send_keys(key)

    search_btn = driver.find_element(By.ID, "nav-search-submit-button")

    search_btn.click()

    urls = []
    for i in driver.find_elements(By.XPATH, "//a[@class='a-link-normal a-text-normal']"):
        urls.append(i.get_attribute("href"))

    brand_name = [] 
    product_name = [] 
    rating_total = [] 
    price = []
    for i in urls:
        driver.get(i) 
        try:
            brand = driver.find_element(By.XPATH, "//td[@class='a-span9']/span")
            brand_name.append(brand.text)
        except:
            brand_name.append('-')         
        try:
            product =  driver.find_element(By.ID,"productTitle")
            product_name.append(product.text)
        except:
            product_name.append('-')   
        try:
            rate = driver.find_element(By.ID,"acrCustomerReviewText")
            rating_total.append(rate.text)
        except:
            rating_total.append('-')
        try:
            price_parent = driver.find_element(By.CLASS_NAME,"a-price")
            total_price = price_parent.find_element(By.CLASS_NAME, "a-offscreen")
            price.append(total_price.text)
        except:
            price.append('-') 


    res = {'Brand': brand_name, 'Product': product_name, 'Rating': rating_total, 'Price': price}
    json_res = json.dumps(res)
    print(json_res)

if __name__ == '__main__':
    key = sys.argv[1]
    get_category(key)