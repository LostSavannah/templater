from docx import Document
from htmldocx import HtmlToDocx
from io import BytesIO

content_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

def htmldocx_renderizer(content:str) -> tuple[str, bytes]:
    document = Document()
    parser = HtmlToDocx()
    parser.add_html_to_document(content, document)
    b = BytesIO()
    document.save(b)
    return content_type, b.getvalue()