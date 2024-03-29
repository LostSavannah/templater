import { useState } from "react";

type EventHandler<T> = (item:T) => void;

export interface DirectoryEvents{
    onSelect: EventHandler<string>
    onDelete: EventHandler<string>
    OnUpdate: EventHandler<string> 
}

export interface DirectoryItemProps{
    file:DirectoryFileNode
    current: string | undefined
    events: DirectoryEvents
}

export function DirectoryItem({file, current, events}:DirectoryItemProps){
    return (
        <div 
            className={"directory-item w-100 d-flex justify-content-between "  + (current == file.fullPath? "selected": "")}
            onClick={() => events.onSelect(file.fullPath)}>
            <button>
                <span className="directory-icon">🗎</span>
                <span className={"directory-file "}
                >{file.name}</span>
            </button>
            <span>
                <button onClick={() => events.OnUpdate(file.fullPath)}>✎</button>
                <button onClick={() => events.onDelete(file.fullPath)}>🗑</button>
            </span>
        </div>
        );
}

export interface DirectoryViewProps{
    folder:DirectoryFolderNode
    current: string | undefined
    events: DirectoryEvents
}

export function DirectoryView({folder, current, events}:DirectoryViewProps){
    const [open, setOpen] = useState(false);
    return (
    <div className="w-100">
        <span onClick={() => setOpen(!open)}>
            <span className="directory-icon">{open? "🗁":"🗀"}</span>
            <span>{folder.name}</span>
        </span>
        {<div className={"w-100 directory-children " + (!open ? "d-none": "")}>
        {folder.folders.map(f => <DirectoryView current={current} events={events} key={`folder_${f.fullPath}`} folder={f}/>)}
        {folder.files.map(f => <DirectoryItem current={current} events={events} key={`file_${f.fullPath}`} file={f}/>)}
        </div>}
    </div>
    )
}


export interface DirectoryFileNode{
    name: string,
    fullPath: string
}

export interface DirectoryFolderNode{
    name: string,
    fullPath: string,
    files: DirectoryFileNode[],
    folders: DirectoryFolderNode[]
}

export function CreateDirectory(entries:string[]){
    const result:DirectoryFolderNode = {
        name: "/",
        fullPath: "/",
        files: [],
        folders: []
    }
    entries.forEach(entry => {
        addEntry(result, entry);
    });
    return result;
}

function addEntry(node:DirectoryFolderNode, entry:string){
    let currentNode = node;
    const path:string[] = [];
    const parts = entry.split("/");
    parts.forEach((name, index) => {
        path.push(name);
        if(index == parts.length -1){
            currentNode.files.push({name, fullPath: entry});
        }else{
            if(!currentNode.folders.find(f => f.name == name)){
                currentNode.folders.push({name, fullPath: path.join("/"), files:[], folders: []})
            }
            currentNode = currentNode.folders.find(f => f.name == name)!;
        }
    });
}