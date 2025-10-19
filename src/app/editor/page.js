'use client';
import { Editor } from "@monaco-editor/react";
import Peer from "peerjs";
import { useEffect } from "react";

export default function EditorPage()
{
    return (
        <Editor height='100vh' defaultLanguage='javascript' defaultValue='Aw Shit! here we go again'/>
    );
}