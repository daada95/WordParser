def get_database():
    from pymongo import MongoClient
    import json

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    # Select tls=True, tlsAllowInvalidCertificates=True to connect properly to your database
    cluster = MongoClient("mongodb+srv://test:test@test.z1bvy.mongodb.net/test?retryWrites=true&w=majority", tls=True, tlsAllowInvalidCertificates=True)
    db = cluster["test"]
    collection = db["test"]

    with open('json_file.json') as file:
        file_data = json.load(file)
        print(file_data)
        collection.insert_one(file_data)

if __name__ == "__main__":
    get_database()