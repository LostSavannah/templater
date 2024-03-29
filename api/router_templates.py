import sqlite3
import os
from fastapi import APIRouter, HTTPException, Request, Response
from core.renderizers import renderizers
from core.parsers import parsers
from base64 import b64encode

database = os.environ.get("TEMPLATER_DATABASE")

router = APIRouter()

@router.get("/")
async def get_templates():
    with sqlite3.Connection(database) as db:
        c = db.execute("SELECT templateName FROM Templates;")
        return [r[0] for r in c.fetchall()]
    
@router.get("/{template_name:path}")
async def get_template(template_name: str):
    with sqlite3.Connection(database) as db:
        c = db.execute("SELECT templateBody FROM Templates WHERE templateName = ?;", tuple([template_name]))
        if (result := c.fetchone()) == None:
            raise HTTPException(404, f"Template '{template_name}' not found")
        return Response(result[0])

@router.post("/{template_name:path}")
async def set_template(template_name: str, req: Request):
    template_body = (await req.body()).decode('utf-8')
    with sqlite3.Connection(database) as db:
        db.execute("DELETE FROM Templates WHERE templateName = ?;", tuple([template_name]))
        db.execute("INSERT INTO Templates VALUES (?, ?);", tuple([template_name, template_body]))
        db.commit()
        return { "template_name": template_name }

@router.delete("/{template_name:path}")
def remove_template(template_name: str):
    with sqlite3.Connection(database) as db:
        db.execute("DELETE FROM Templates WHERE templateName = ?;", tuple([template_name]))
        db.commit()
        return { "template_name": template_name }


@router.put("/{template_name:path}")
async def process_template(template_name: str, req: Request, parser:str, renderizer:str):
    try:
        body = (await req.body()).decode('utf-8')
        template:str = None
        with sqlite3.Connection(database) as db:
            c = db.execute("SELECT templateBody FROM Templates WHERE templateName = ?;", tuple([template_name]))
            if (result := c.fetchone()) == None:
                raise HTTPException(404, f"Template '{template_name}' not found")
            template = result[0]
        parser_function = parsers[parser]
        renderizer_function = renderizers[renderizer]
        content_type, data = renderizer_function(parser_function(body, template))
        return {
            "contentType": content_type,
            "data": b64encode(data).decode()
        }
    except Exception as e:
        return {
            "contentType": "text/plain",
            "data": b64encode(repr(e).encode()).decode()
        }
