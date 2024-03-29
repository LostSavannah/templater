export interface RunButtonProps{
    onClick: () => void
}

export default function RunButton({onClick}:RunButtonProps) {
  return (
    <div className="card p-2">
        <button className="btn btn-success" onClick={onClick}>Parse & Render</button>
    </div>
  )
}
