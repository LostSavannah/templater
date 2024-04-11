from .common import Renderizer
from .raw_renderizer import create_raw_renderizer
from .htmldocx_renderizers import htmldocx_renderizer
from .xhtml2pdf_renderizers import renderizer

renderizers:dict[str, Renderizer] = {
    "Text render": create_raw_renderizer(),
    "Html render": create_raw_renderizer("text/html"),
    "Html to pdf - xhtml2pdf": renderizer,
    "Html to word - htmldocx": htmldocx_renderizer
}