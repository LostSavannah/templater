from jinja2 import Template
import json

def jinja_json_parser(content:str, template:str) -> str:
    return Template(template).render(json.loads(content))