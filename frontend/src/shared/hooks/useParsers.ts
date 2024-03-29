import { useEffect, useState } from "react";
import { TemplaterService } from "../services/TemplaterService";

export function useParsers(){
    const [parsers, setParsers] = useState<string[]>([]);

    useEffect(() => {
        new TemplaterService().getParsers().then(setParsers);
    }, []);

    return parsers;
}