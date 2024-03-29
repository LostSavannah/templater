from typing import Callable

Renderizer = Callable[[str,], tuple[str, bytes]]