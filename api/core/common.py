from typing import Callable

Parser = Callable[[str, str], str]
Renderizer = Callable[[str,], tuple[str, bytes]]