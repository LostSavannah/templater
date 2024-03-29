import { useRenderizers } from "../hooks/useRenderizers"
import ComboBox from "./ComboBox";
import { StateProps } from "./types";

export default function RenderizerSelector({value, onChange}:StateProps<string>) {
    const renderizers = useRenderizers();
  return (
    <div className="w-100 card p-2">
      <ComboBox
        value={value}
        items={renderizers}
        onValueChanged={onChange}
        title="Renderizer"
      />
    </div>
  )
}
