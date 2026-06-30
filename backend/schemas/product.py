from pydantic import BaseModel, Field
from typing import Optional


class ProductBase(BaseModel):

    name: str = Field(
        ...,
        min_length=3,
        max_length=100
    )

    price: float = Field(
        ...,
        gt=0
    )

    category: str = Field(
        ...,
        min_length=3
    )

    description: str = Field(
        ...,
        min_length=5
    )



class ProductCreate(ProductBase):

    imageUrl: str = ""



class ProductUpdate(BaseModel):

    name: Optional[str] = None

    price: Optional[float] = None

    category: Optional[str] = None

    description: Optional[str] = None

    imageUrl: Optional[str] = None



class ProductRead(ProductBase):

    id: int

    imageUrl: str


    class Config:
        from_attributes = True