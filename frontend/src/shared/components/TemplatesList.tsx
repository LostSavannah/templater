import { useTemplatesList } from "../hooks/useTemplatesList"
import { CreateDirectory, DirectoryEvents, DirectoryView } from "./DirectoryView";

export interface TemplatesListProps{
    value:string|undefined
    events:DirectoryEvents
}

export default function TemplatesList({value, events}:TemplatesListProps) {
    const {templates} = useTemplatesList();
  return (
    <div className="w-100 card p-2">
        <h6>Template</h6>
        <div className="p-2 w-100">
            <DirectoryView current={value} events={events} folder={CreateDirectory(templates)}/>
        </div>
    </div>
  )
}
