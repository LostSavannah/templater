import { StateProps } from "./types";

export default function DataEditor({value, onChange}:StateProps<string>) {
  return (    
    <div className="w-100 card p-2 flex-grow-1">
        <h6>Data</h6>
        <textarea className="h-100" onChange={t => onChange(t.target.value)}>
            {value}
        </textarea>
    </div>
  )
}
