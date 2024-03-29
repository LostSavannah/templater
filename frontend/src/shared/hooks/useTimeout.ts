import { useEffect } from "react";

export function useTimeout(callback:() => void, timeout: number){
    useEffect(() => {
        const handler = setTimeout(callback, timeout);
        return () => clearTimeout(handler);
    }, [timeout, callback]);
}