from mako.template import Template
import json

def mako_json_parser(content:str, template:str) -> str:
    return Template(template).render(**json.loads(content))