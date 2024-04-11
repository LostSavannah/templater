from xhtml2pdf import pisa
from io import BytesIO

def renderizer(content:str) -> tuple[str, bytes]:
    with BytesIO() as b:
        pisa.CreatePDF(content, dest=b)
        return 'application/pdf', b.getvalue()
