export interface StateProps<T>{
    value:T|undefined
    onChange: (value:T|undefined) => void
}
