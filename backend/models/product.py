from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import Text
from sqlalchemy import DateTime

from sqlalchemy.sql import func

from database import Base



class ProductDB(Base):

    __tablename__ = "products"



    id = Column(
        Integer,
        primary_key=True,
        index=True
    )



    name = Column(
        String(100),
        nullable=False
    )



    price = Column(
        Float,
        nullable=False
    )



    category = Column(
        String(50),
        nullable=False
    )



    description = Column(
        Text,
        nullable=False
    )



    # đường dẫn ảnh
    image_path = Column(
        String(255),
        nullable=True
    )



    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )



    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )