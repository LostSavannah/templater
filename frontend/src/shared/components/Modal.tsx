import { ReactNode, forwardRef,  useImperativeHandle, useRef } from "react"

export interface ModalProps{
    hidden: boolean
    title: string
    children: ReactNode
    actions: {
        text: string,
        action: (() => void),
        className: string
    }[]
}

export interface ModalMethods{
    closeDialog: (() => void),
    showDialog: (() => void),
}

export const Modal = forwardRef<ModalMethods, ModalProps>((props:ModalProps, ref) => {
    useImperativeHandle(ref, () => ({
        closeDialog,
        showDialog
    }));

    const modalRef = useRef<HTMLDialogElement>(null);

    function closeDialog(){
        () => modalRef.current?.close()
    }

    function showDialog(){
        () => modalRef.current?.showModal()
    }
    
    return (<dialog className="vw-50 vh-50" ref={modalRef}>
        <div className="d-flex flex-column justify-content-between">
            <h4>{props.title}</h4>
            <div className="w-100">
                {props.children}
            </div>
            <div className="w-100 d-flex justify-content-end">
                {props.actions.map(action => 
                    <button 
                        onClick={action.action}
                        className={action.className}>
                        {action.text}
                    </button>)}
                    <button className="bnt btn-danger" onClick={closeDialog}>Cancel</button>
            </div>
        </div>
    </dialog>)
});