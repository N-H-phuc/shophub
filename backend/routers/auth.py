from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.user import UserDB
from schemas.user import LoginRequest
from utils.security import verify_password, create_token

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


# ==========================
# LOGIN
# ==========================
@router.post("/login")
def login(
    payload: LoginRequest,
    db: Session = Depends(get_db)
):
    # Tìm user theo email
    user = (
        db.query(UserDB)
        .filter(UserDB.email == payload.email)
        .first()
    )

    # Không tìm thấy user
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Kiểm tra mật khẩu
    if not verify_password(
        payload.password,
        user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Tạo JWT Token
    token = create_token(
        {
            "id": user.id,
            "role": user.role
        }
    )

    # Trả dữ liệu về React
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role
        }
    }