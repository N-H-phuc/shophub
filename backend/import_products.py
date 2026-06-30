import json

from database import SessionLocal
from models.product import ProductDB

db = SessionLocal()

with open("data/products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

for p in products:

    exist = db.query(ProductDB).filter(ProductDB.id == p["id"]).first()

    if exist:
        continue

    product = ProductDB(
        id=p["id"],
        name=p["name"],
        price=p["price"],
        category=p["category"],
        description=p["description"],
        image_path=p["imageUrl"],
    )

    db.add(product)

db.commit()
db.close()

print("Import completed!")