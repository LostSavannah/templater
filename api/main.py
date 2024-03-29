import uvicorn
import os
from fastapi import FastAPI
from core.http.common import configure_cors, SPAStaticFiles

import router_parsers
import router_renderizers
import router_templates

database = os.environ.get("TEMPLATER_DATABASE")
static_location = os.environ.get("TEMPLATER_STATIC")

app = configure_cors(FastAPI())

app.include_router(router_parsers.router, prefix='/api/parsers', tags=["Parsers"])
app.include_router(router_renderizers.router, prefix='/api/renderizers', tags=["Renderizers"])
app.include_router(router_templates.router, prefix='/api/templates', tags=["Templates"])

app.mount("/", SPAStaticFiles(directory=static_location, html=True), name="static")

try:
    uvicorn.run(
        app, 
        host=os.environ.get("TEMPLATER_HOSTNAME"),
        port=int(os.environ.get("TEMPLATER_PORT")))
except KeyboardInterrupt as k:
    exit(0)