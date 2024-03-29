from .common import Parser
from .jinja_parsers import jinja_json_parser
from .raw_parser import raw_content, raw_template
from .mako_parser import mako_json_parser

parsers:dict[str, Parser] = {
    "Raw data": raw_content,
    "Raw template": raw_template,
    "Jinja2": jinja_json_parser,
    "Mako": mako_json_parser
}