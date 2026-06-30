from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import os
import shutil


from database import engine

from models.product import Base as ProductBase
from models.user import Base as UserBase


from routers.products import router as product_router
from routers.users import router as user_router

from routers.auth import router as auth_router

# ==========================
# CREATE APP
# ==========================

app = FastAPI(
    title="ShopHub API",
    version="2.0.0",
)


app.mount(
    "/images",
    StaticFiles(directory="images"),
    name="images"
)


# ==========================
# STATIC IMAGE FOLDER
#
# Nơi lưu ảnh upload
#
# uploads/
#    laptop.jpg
#
# URL:
# localhost:8000/uploads/laptop.jpg
# ==========================


os.makedirs(
    "uploads",
    exist_ok=True
)



app.mount(

    "/uploads",

    StaticFiles(
        directory="uploads"
    ),

    name="uploads"

)







# ==========================
# CREATE DATABASE TABLES
# ==========================


ProductBase.metadata.create_all(
    bind=engine
)


UserBase.metadata.create_all(
    bind=engine
)








# ==========================
# CORS
# ==========================


origins = [

    "http://localhost:5173",

]



app.add_middleware(

    CORSMiddleware,

    allow_origins=origins,

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)









# ==========================
# ROUTERS
# ==========================


app.include_router(
    product_router
)


app.include_router(
    user_router
)


app.include_router(
    auth_router
)






# ==========================
# UPLOAD IMAGE
# ==========================


@app.post("/upload")
async def upload_image(

    image: UploadFile = File(...)

):


    # tên file

    file_path = (

        f"uploads/{image.filename}"

    )



    # lưu file

    with open(

        file_path,

        "wb"

    ) as buffer:


        shutil.copyfileobj(

            image.file,

            buffer

        )




    return {


        "imageUrl":

        f"/uploads/{image.filename}"


    }









# ==========================
# ROOT
# ==========================


@app.get("/")

def root():

    return {


        "message":

        "Welcome to ShopHub PostgreSQL API"


    }










# ==========================
# ABOUT
# ==========================


@app.get("/about")

def about():

    return {


        "project":

        "ShopHub",


        "database":

        "PostgreSQL",


        "version":

        "2.0.0",

    }