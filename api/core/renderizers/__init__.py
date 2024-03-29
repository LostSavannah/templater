from .common import Renderizer
from .raw_renderizer import create_raw_renderizer
from .pdfkit_renderizers import create_pdf_renderizer
from .htmldocx_renderizers import htmldocx_renderizer

renderizers:dict[str, Renderizer] = {
    "Text render": create_raw_renderizer(),
    "Html render": create_raw_renderizer("text/html"),
    "Html to pdf - pdfkit": create_pdf_renderizer(),
    "Html to word - htmldocx": htmldocx_renderizer
}