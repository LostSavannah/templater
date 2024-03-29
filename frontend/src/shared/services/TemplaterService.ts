import { Content } from "../types/common";
import BaseHttpService from "./BaseHttpService";

export class TemplaterService extends BaseHttpService{
    getTemplates(){
        return this.get<string[]>("api/templates/")
    }

    getTemplateContent(template:string){
        return this.get<string>(`api/templates/${template}`)
    }

    getParsers(){
        return this.get<string[]>("api/parsers/")
    }

    getRenderizers(){
        return this.get<string[]>("api/renderizers/")
    }

    parse(template:string, parser:string, renderizer:string, content:string){
        return this.put<string, Content>(`api/templates/${template}?parser=${parser}&renderizer=${renderizer}`, content)
    }
}