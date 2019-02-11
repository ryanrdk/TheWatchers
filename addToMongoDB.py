import json
from pymongo import MongoClient

client = MongoClient('mongodb://admin:admin123@localhost:27017')
db = client['demoDB']
collection_currency = db['bootcampers']

with open('./client/src/dummyDemographics.json') as f:
    file_data = json.load(f)

collection_currency.insert(file_data)
client.close()
