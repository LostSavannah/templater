def create_raw_renderizer(content_type:str = 'text/plain', encoding:str = 'utf-8'):
    def raw_renderizer(content:str) -> tuple[str, bytes]:
        return content_type, content.encode(encoding)
    return raw_renderizer