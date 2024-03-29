import { useEffect, useState } from "react";
import { TemplaterService } from "../services/TemplaterService";

export function useRenderizers(){
    const [renderizers, setRenderizers] = useState<string[]>([]);
    
    useEffect(() => {
        new TemplaterService().getRenderizers().then(setRenderizers);
    }, []);

    return renderizers;
}