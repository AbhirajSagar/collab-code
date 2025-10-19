// Tabs on Home Page
// Add more properties to extend functionality

import { useRouter } from "next/navigation";

const TABS = 
[
  {
    name: "Create Workspace",
    content: <CreateWorkSpace/>
  },
  {
    name: "Join Workspace",
    content: <JoinWorkSpace/>
  }
]

export default TABS;


function CreateWorkSpace()
{
    const router = useRouter();

    return (
      <div className="p-4">
        <h2 className="text-xl text-muted font-bold mb-4">Create a New Workspace</h2>
        <input 
          type="text" 
          placeholder="Workspace Name" 
          className="border p-2 rounded text-muted focus:outline-1 focus:outline-orange-300 w-full mb-3"
        />
        <textarea 
          placeholder="Description (optional)" 
          className="border p-2 resize-none rounded text-muted focus:outline-1 focus:outline-orange-300 w-full mb-3"
        />
        <button onClick={() => launchWorkSpace(router)} className="dark:bg-background-dark bg-muted text-white mb-4 cursor-pointer dark:text-muted px-4 py-2 rounded float-right duration-300 transition-colors hover:bg-orange-500 hover:text-white">
          Create Workspace
        </button>
      </div>
    )
}

function JoinWorkSpace()
{
    const router = useRouter();

    return (
      <div className="p-4">
        <h2 className="text-xl text-muted font-bold mb-4">Join a Workspace</h2>
        <input 
          type="text" 
          placeholder="Workspace Join Code" 
          className="border p-2 rounded text-muted focus:outline-1 focus:outline-orange-300 w-full mb-3"
        />
        <button onClick={() => launchWorkSpace(router)} className="dark:bg-background-dark bg-muted text-white mb-4 cursor-pointer dark:text-muted px-4 py-2 rounded float-right duration-300 transition-colors hover:bg-orange-500 hover:text-white">
          Join Workspace
        </button>
      </div>
    )
}

function launchWorkSpace(router)
{
  router.push('/editor');
}