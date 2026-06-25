import json
import os
import shutil

from typing import Optional

from fastapi import (
    FastAPI,
    HTTPException,
    Query,
    UploadFile,
    File
)

from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

app = FastAPI(
    title="ShopHub Product API",
    version="1.1.0"
)

# =========================
# CORS
# =========================

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# JSON HELPERS
# =========================

def load_products():
    with open(
        "data/products.json",
        "r",
        encoding="utf-8"
    ) as file:
        return json.load(file)


def save_products(products):
    with open(
        "data/products.json",
        "w",
        encoding="utf-8"
    ) as file:
        json.dump(
            products,
            file,
            indent=4,
            ensure_ascii=False
        )

# =========================
# SCHEMAS
# =========================

class ProductCreate(BaseModel):
    name: str = Field(..., min_length=3, max_length=100)
    price: float = Field(..., gt=0)
    category: str = Field(..., min_length=3)
    description: str = Field(..., min_length=5)
    imageUrl: Optional[str] = None


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    description: Optional[str] = None
    imageUrl: Optional[str] = None


class ProductPublic(BaseModel):
    id: int
    name: str
    price: float
    category: str
    description: str
    imageUrl: Optional[str] = None


# =========================
# BASIC ROUTES
# =========================

@app.get("/")
def root():
    return {
        "message": "Welcome to ShopHub API"
    }


@app.get("/about")
def about():
    return {
        "project": "ShopHub",
        "version": "1.1.0"
    }


# =========================
# GET ALL PRODUCTS
# SEARCH + FILTER + PAGINATION
# =========================

@app.get("/products")
def get_products(
    category: Optional[str] = None,
    search: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100)
):

    products = load_products()

    # Search
    if search:
        products = [
            p for p in products
            if search.lower() in p["name"].lower()
            or search.lower() in p["description"].lower()
        ]

    # Category
    if category:
        products = [
            p for p in products
            if p["category"].lower() == category.lower()
        ]

    # Min Price
    if min_price is not None:
        products = [
            p for p in products
            if p["price"] >= min_price
        ]

    # Max Price
    if max_price is not None:
        products = [
            p for p in products
            if p["price"] <= max_price
        ]

    total = len(products)

    # Pagination
    start = (page - 1) * size
    end = start + size

    paginated_products = products[start:end]

    return {
        "total": total,
        "page": page,
        "size": size,
        "items": paginated_products
    }


# =========================
# GET PRODUCT BY ID
# =========================

@app.get(
    "/products/{product_id}",
    response_model=ProductPublic
)
def get_product(product_id: int):

    products = load_products()

    for product in products:
        if product["id"] == product_id:
            return product

    raise HTTPException(
        status_code=404,
        detail="Product not found"
    )


# =========================
# CREATE PRODUCT
# =========================

@app.post(
    "/products",
    response_model=ProductPublic
)
def create_product(product: ProductCreate):

    products = load_products()

    new_id = max(
        [p["id"] for p in products],
        default=0
    ) + 1

    new_product = {
        "id": new_id,
        **product.model_dump()
    }

    products.append(new_product)

    save_products(products)

    return new_product


# =========================
# UPDATE PRODUCT
# =========================

@app.put(
    "/products/{product_id}",
    response_model=ProductPublic
)
def update_product(
    product_id: int,
    updated_product: ProductUpdate
):

    products = load_products()

    for product in products:

        if product["id"] == product_id:

            update_data = updated_product.model_dump(
                exclude_unset=True
            )

            product.update(update_data)

            save_products(products)

            return product

    raise HTTPException(
        status_code=404,
        detail="Product not found"
    )


# =========================
# DELETE PRODUCT
# =========================

@app.delete("/products/{product_id}")
def delete_product(product_id: int):

    products = load_products()

    for product in products:

        if product["id"] == product_id:

            products.remove(product)

            save_products(products)

            return {
                "message": "Product deleted successfully"
            }

    raise HTTPException(
        status_code=404,
        detail="Product not found"
    )


# =========================
# UPLOAD IMAGE
# =========================

@app.post("/upload-image")
def upload_image(
    image: UploadFile = File(...)
):

    os.makedirs(
        "data_images",
        exist_ok=True
    )

    file_path = f"data_images/{image.filename}"

    with open(
        file_path,
        "wb"
    ) as buffer:
        shutil.copyfileobj(
            image.file,
            buffer
        )

    return {
        "filename": image.filename,
        "imageUrl": f"/images/{image.filename}"
    }


# =========================
# GET IMAGE
# =========================

@app.get("/images/{filename}")
def get_image(filename: str):

    file_path = f"data_images/{filename}"

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail="Image not found"
        )

    return FileResponse(file_path)