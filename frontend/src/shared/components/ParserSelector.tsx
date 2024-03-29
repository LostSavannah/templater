import { useParsers } from "../hooks/useParsers";
import ComboBox from "./ComboBox";
import { StateProps } from "./types";

  
export default function ParserSelector({value, onChange}:StateProps<string>) {
    const parsers = useParsers();
  return (
    <div className="w-100 card p-2">
      <ComboBox
        value={value}
        items={parsers}
        onValueChanged={onChange}
        title="Parser"
      />
    </div>
  )
}
