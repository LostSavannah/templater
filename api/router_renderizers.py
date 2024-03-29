from core.renderizers import renderizers
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_renderizers():
    return [i for i in renderizers]