from fastapi import FastAPI, Request, Response
from fastapi.staticfiles import StaticFiles
from starlette.types import Scope

def configure_cors(api:FastAPI) -> FastAPI:
    async def inner(request:Request, call_next):
        response:Response = Response() if request.method == "OPTIONS" else await call_next(request)
        response.headers["Access-Control-Allow-Origin"] = '*'
        response.headers["Access-Control-Allow-Methods"] = 'GET, POST, OPTIONS, PUT, DELETE, PATCH'
        response.headers["Access-Control-Allow-Headers"] = '*'
        return response
    api.middleware("http")(inner)
    return api

class SPAStaticFiles(StaticFiles):
    async def get_response(self, path: str, scope) -> Response:
        try:
            response = await super().get_response(path, scope)
            if response.status_code == 404:
                raise Exception('IDK')
            return response
        except Exception as e:
            return await super().get_response('.', scope)