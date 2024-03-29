import { useEffect, useRef } from "react"
import { Content } from "../types/common"

export interface EmbeddedContentProps{
    content:Content
}

export default function EmbeddedContent({content}:EmbeddedContentProps) {
    const ref = useRef<HTMLIFrameElement>(null);
    useEffect(() => {
        if(ref.current){
            ref.current.src = `data:${content.contentType};base64,${content.data}`;
        }
    }, [ref, content]);
  return (
    <div className="card p-2 h-100">
        <h4>Result</h4>
        <iframe className="w-100 h-100" ref={ref}></iframe>
    </div>
  )
}
