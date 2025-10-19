'use client';
import { useState } from "react";
import Navbar from "@/components/Navbar";

const TABS = 
[
  {
    name: "Create Workspace",
  },
  {
    name: "Join Workspace",
  },
  {
    name: "Recents",
  }
]

export default function Home() 
{
  return (
    <>
      <Navbar/>
      <div className="w-full flex justify-end px-12 flex-col">
        <h2 className="bg-gradient-to-r mt-[12vh] from-amber-400 to-orange-600 font-extrabold text-6xl text-transparent bg-clip-text w-fit">Hey there,</h2>
        <h2 className="text-muted font-extrabold text-4xl">Welcome to Code Collab</h2>
        <Tabs/>    
      </div>
    </>
  );
}

function Tabs()
{
  const [currentTab, setCurrentTab] = useState('Home');

  return (
    <div className="w-full h-10 mt-15 flex" >
      {TABS.map((tab, idx) => <h2 key={idx} onClick={() => setCurrentTab(tab.name)} className={`w-fit mx-3 cursor-pointer ${tab.name === currentTab ? 'text-orange-400 underline' : 'text-muted'}`}>{tab.name}</h2>)}
    </div>
  );
}