import { useEffect, useState } from "react";
import { TemplaterService } from "../services/TemplaterService";
import { Content } from "../types/common";

export function useTemplates(){
    const [currentTemplate, setCurrentTemplate] = useState<string|undefined>(undefined);
    const [currentTemplateContent, setCurrentTemplateContent] = useState<string|undefined>();
    const [currentRenderizer, setCurrentRenderizer] = useState<string|undefined>(undefined);
    const [currentParser, setCurrentParser] = useState<string|undefined>(undefined);
    const [currentData, setCurrentData] = useState<string|undefined>("");
    const [currentResult, setCurrentResult] = useState<Content|undefined>(undefined);
    const [canParse, setCanParse] = useState(false);

    useEffect(() => {
        setCanParse([currentParser, currentRenderizer, currentTemplate].every(a => a!=undefined));
    }, [currentParser, currentRenderizer, currentTemplate])

    useEffect(() => {
        if(currentTemplate){
            new TemplaterService()
                .getTemplateContent(currentTemplate)
                .then(setCurrentTemplateContent);
        }
    }, [currentTemplate]);

    function parse(){
        return new Promise<void>((resolve, reject) => {
            if([currentTemplate, currentParser, currentRenderizer, currentData].every(a => a!=undefined)){
                new TemplaterService()
                    .parse(currentTemplate!, currentParser!, currentRenderizer!, currentData!)
                    .then(result => {
                        setCurrentResult(result);
                        resolve();
                    })
                    .catch(reject);
            }else{
                reject();
            }
        });
    }

    return{
        currentTemplate,
        currentParser,
        currentRenderizer,
        currentTemplateContent,
        currentData,
        currentResult,
        canParse,
        parse,
        setCurrentTemplate,
        setCurrentParser,
        setCurrentRenderizer,
        setCurrentData
    }
}