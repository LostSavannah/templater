import { useEffect, useState } from "react";
import { TemplaterService } from "../services/TemplaterService";

export function useTemplatesList(){
    const [templates, setTemplates] = useState<string[]>([]);
    useEffect(() => {
        new TemplaterService()
            .getTemplates()
            .then(result => {
                setTemplates(result);
            });
    }, []);
    return {
        templates
    }
}