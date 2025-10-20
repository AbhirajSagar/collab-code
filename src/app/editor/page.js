'use client';
import { Editor } from "@monaco-editor/react";
import Peer from "peerjs";
import { useEffect,useState,useRef } from "react";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCopy, faFile, faPersonCircleQuestion, faSearch, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import AnimatedModal from "@/components/AnimatedModal";

export default function EditorPage()
{
    const searchParams = useSearchParams();
    const [workspaceName, setWorkspaceName] = useState('Untitled Project');
    const [peerId, setPeerId] = useState(null);
    const [workspaceMode, setWorkspaceMode] = useState(null);
    const [connections, setConnections] = useState([]);
    const peerRef = useRef(null);
    //Editor Workspace
    const [code, setCode] = useState(''); //For storing actual written code..

    useEffect(() => 
    {
        if(peerRef === null) //Avoid re-creation of peer
        {
            const peer = new Peer();
            peerRef.current = peer;
            peer.on('open', (id) => 
            {
                //we get the id on open event
                console.log('peer opened with id :', id);
                setPeerId(id);
                
                //we got the id so just setup the environment based on if you're a client or host of workspace

                const editorMode = searchParams.get('mode');
                if(editorMode === 'client')
                {
                    const workspaceIdToJoin = searchParams.get('id');
                    const conn = peer.connect(workspaceIdToJoin);
                    setWorkspaceMode('client');
                }
                else //is a host so no need to setup any connection
                {
                    const name =  searchParams.get('name');
                    setWorkspaceName(name);
                    setWorkspaceMode('host');
                }
            }); 
            peer.on('error',(error) => console.error(error)); //need for any error handling
            peer.on('connection', (conn) => 
            {
                //saving connections to display in share modal
                console.log('new connection received',conn);
                setConnections((oldConns) => [...oldConns, conn]); //can't push so spread..

                conn.on('data', (d) => 
                {
                    console.log(d);
                    //Everybody backup backup... data is cuming
                    if(d.type === 'code')
                        setCode(d.value);
                });
            });
        }
    },[]);


    function handleCodeSync(value)
    {
        const data = 
        {
            type: 'code',
            value: value
        }

        connections.forEach((conn) => conn.send(data));
        setCode(value);
    }

    return (
        <div className="w-full h-[100vh] overflow-hidden">
            <EditorNavbar workspaceName={workspaceName} peerId={peerId}/>
            <div className="w-full h-full flex">
                <Sidebar/>
                <div className="w-full bg-amber-400 h-full">
                    <Editor height='100vh' width='100%' defaultLanguage='javascript' defaultValue={code} onChange={(v) => handleCodeSync(v)} theme='vs-dark'/>
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

function EditorNavbar({workspaceName, peerId})
{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copied, setIsCopied] = useState(false);

    function copyWorkspaceId()
    {
        navigator.clipboard.writeText(peerId);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false),2000);
    }

    return (
        <div className="w-full h-9 flex justify-center items-center relative">
            <h2 className="text-muted font-extrabold">{workspaceName}</h2>
            <FontAwesomeIcon icon={faShareAlt} onClick={() => setIsModalOpen(true)} className="text-muted absolute top-0 right-0 hover:bg-amber-600 hover:text-white transition-all duration-150 rounded-bl-2xl cursor-pointer p-2 bg-background-muted-dark aspect-square"/>
            <AnimatedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className='p-4 flex flex-col'>
                <h2 className="w-full text-muted font-semibold">Share your workspace</h2>
                <div className="w-full justify-between px-3 items-center flex h-10 mt-3 rounded bg-background-dark">
                    <h2 className="text-muted font-light text-sm">{peerId}</h2>
                    <FontAwesomeIcon icon={copied ? faCheckCircle : faCopy} onClick={() => copyWorkspaceId()} className={`${copied ? 'text-green-600' : 'text-muted'} p-2 hover:bg-background-muted-dark ${copied ? 'hover:text-green-400' : 'hover:text-white'} rounded cursor-pointer`}/>
                </div>
                <div className="h-24 w-full rounded my-2 bg-background-dark flex-1 justify-center items-center flex">
                    <div className="flex justify-center items-center w-full h-full flex-col gap-2">
                        <FontAwesomeIcon icon={faPersonCircleQuestion} className="w-full text-7xl text-muted"/>
                        <h2 className="text-center font-extrabold text-muted">No Connections</h2>
                    </div>
                </div>
                <div>
                    <button className="w-1/4 float-right bg-amber-600 hover:bg-orange-600 py-2 rounded cursor-pointer  text-white" onClick={() => setIsModalOpen(false)}>Close</button>
                </div>
            </AnimatedModal>
        </div>
    );
}