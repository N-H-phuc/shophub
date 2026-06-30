from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models.product import ProductDB
from schemas.product import (
    ProductCreate,
    ProductUpdate,
    ProductRead,
)

router = APIRouter(
    prefix="/products",
    tags=["Products"],
)


# ==========================
# GET ALL PRODUCTS
# ==========================
@router.get("", response_model=list[ProductRead])
def get_products(db: Session = Depends(get_db)):
    products = db.query(ProductDB).all()

    return [
        ProductRead(
            id=p.id,
            name=p.name,
            price=p.price,
            category=p.category,
            description=p.description,
            imageUrl=p.image_path,
        )
        for p in products
    ]


# ==========================
# GET PRODUCT BY ID
# ==========================
@router.get("/{product_id}", response_model=ProductRead)
def get_product(
    product_id: int,
    db: Session = Depends(get_db),
):
    product = (
        db.query(ProductDB)
        .filter(ProductDB.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    return ProductRead(
        id=product.id,
        name=product.name,
        price=product.price,
        category=product.category,
        description=product.description,
        imageUrl=product.image_path,
    )


# ==========================
# CREATE PRODUCT
# ==========================
@router.post(
    "",
    response_model=ProductRead,
    status_code=status.HTTP_201_CREATED,
)
def create_product(
    payload: ProductCreate,
    db: Session = Depends(get_db),
):
    product = ProductDB(
        name=payload.name,
        price=payload.price,
        category=payload.category,
        description=payload.description,
        image_path=payload.imageUrl,
    )

    db.add(product)
    db.commit()
    db.refresh(product)

    return ProductRead(
        id=product.id,
        name=product.name,
        price=product.price,
        category=product.category,
        description=product.description,
        imageUrl=product.image_path,
    )


# ==========================
# UPDATE PRODUCT
# ==========================
@router.put("/{product_id}", response_model=ProductRead)
def update_product(
    product_id: int,
    payload: ProductUpdate,
    db: Session = Depends(get_db),
):
    product = (
        db.query(ProductDB)
        .filter(ProductDB.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    if payload.name is not None:
        product.name = payload.name

    if payload.price is not None:
        product.price = payload.price

    if payload.category is not None:
        product.category = payload.category

    if payload.description is not None:
        product.description = payload.description

    if payload.imageUrl is not None:
        product.image_path = payload.imageUrl

    db.commit()
    db.refresh(product)

    return ProductRead(
        id=product.id,
        name=product.name,
        price=product.price,
        category=product.category,
        description=product.description,
        imageUrl=product.image_path,
    )


# ==========================
# DELETE PRODUCT
# ==========================
@router.delete(
    "/{product_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
):
    product = (
        db.query(ProductDB)
        .filter(ProductDB.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    db.delete(product)
    db.commit()