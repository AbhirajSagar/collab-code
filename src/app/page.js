'use client';
import { useState } from "react";

import Navbar from "@/components/Navbar";
import Tabs from "@/components/HomePageTabs"

export default function Home() 
{
  return (
    <>
      <Navbar/>
      <div className="w-full flex justify-center items-center md:items-start px-12 flex-col">
        <h2 className="bg-gradient-to-r mt-[12vh] from-amber-400 to-orange-600 font-extrabold text-4xl sm:text-6xl text-transparent bg-clip-text w-fit">Hey there,</h2>
        <h2 className="text-muted font-extrabold text-xl sm:text-4xl">Welcome to Code Collab</h2>
        <TabsComponent/>  
      </div>
    </>
  );
}

function TabsComponent()
{
  const [currentTab, setCurrentTab] = useState(Tabs[0]);

  return (
    <>
      <div className="w-full h-10 mt-15 flex justify-center md:justify-start">
        {Tabs.map((tab, idx) => <h2 key={idx} onClick={() => setCurrentTab(tab)} className={`w-fit mx-3 text-sm sm:text-lg text-nowrap cursor-pointer ${tab === currentTab ? 'text-orange-400 underline' : 'text-muted'}`}>{tab.name}</h2>)}
      </div>
      <div className="dark:bg-background-muted-dark bg-white h-max w-3/4 sm:w-1/2 min-w-72 rounded-md">
        {currentTab.content}
      </div>
    </>
  );
}