from typing import Any
import pdfkit

default_options = {
    "margin-top": "0",
    "margin-bottom": "0",
    "margin-left": "0",
    "margin-right": "0"
}

def create_pdf_renderizer(options:Any = None):
    global default_options
    def renderizer(content:str) -> tuple[str, bytes]:
        print(content)
        return 'application/pdf', pdfkit.from_string(content, False, options=(options or default_options))
    return renderizer