'use client';
import { Editor } from "@monaco-editor/react";
import Peer from "peerjs";
import { useEffect,useState } from "react";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faSearch, faShareAlt } from "@fortawesome/free-solid-svg-icons";

export default function EditorPage()
{
    const searchParams = useSearchParams();
    const [workspaceName, setWorkspaceName] = useState('Untitled Project');

    useEffect(() => 
    {
        const name =  searchParams.get('name');
        setWorkspaceName(name);
    },[searchParams]);

    return (
        <div className="w-full h-[100vh] overflow-hidden">
            <EditorNavbar workspaceName={workspaceName}/>
            <div className="w-full h-full flex">
                <Sidebar/>
                <div className="w-full bg-amber-400 h-full">
                    <Editor height='100vh' width='100%' defaultLanguage='javascript' defaultValue='Aw Shit! here we go again' theme='vs-dark'/>
                </div>
            </div>
        </div>
    );
}

function Sidebar()
{
    return (
        <div className="w-14 h-full flex flex-col items-center">
            <div className="cursor-pointer hover:bg-background-muted-dark w-full flex justify-center items-center h-14">
                <FontAwesomeIcon icon={faFile} className="text-3xl text-muted"/>
            </div>
            <div className="cursor-pointer hover:bg-background-muted-dark w-full flex justify-center items-center h-14">
                <FontAwesomeIcon icon={faSearch} className="text-3xl text-muted"/>
            </div>
        </div>
    );
}

function EditorNavbar({workspaceName})
{
    return (
        <div className="w-full h-9 flex justify-center items-center relative">
            <h2 className="text-muted font-extrabold">{workspaceName}</h2>
            <FontAwesomeIcon icon={faShareAlt} className="text-muted absolute top-0 right-0 hover:bg-amber-600 hover:text-white transition-all duration-150 rounded-bl-2xl cursor-pointer p-2 bg-background-muted-dark aspect-square"/>
        </div>
    );
}