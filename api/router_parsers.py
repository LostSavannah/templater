from fastapi import APIRouter
from core.parsers import parsers

router = APIRouter()

@router.get("/")
def get_parsers():
    return [i for i in parsers]