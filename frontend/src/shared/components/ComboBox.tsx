export interface ComboBoxProps{
    title: string
    value:string|undefined
    items: string[]
    onValueChanged: (item:string|undefined) => void;
}

export default function ComboBox({title, value, items, onValueChanged}:ComboBoxProps) {
  return (
    <div className="form-group">
    <label> <h6>{title}</h6></label>
    <select
        className="form-control" 
        value={value} onChange={e => onValueChanged(e.target.value == "" ? undefined: e.target.value)}>
        <option value={undefined}></option>
        {items.map(i => <option key={i} value={i}>{i}</option>)}
    </select>
    </div>
  )
}
