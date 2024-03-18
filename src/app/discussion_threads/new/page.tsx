'use client'


import toast from 'react-hot-toast';
import { useRequireAuth } from '../../components/useRequireAuth'
import { useState } from 'react'
export default function NewThread() {

    const user = useRequireAuth();

    // const { user, logout } = useAuth()
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [locked, setLocked] = useState(false);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const data = { title, content, user_id: user?.id, locked}
        try {
            const response = await fetch('/api/threads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            if (response.ok) {
                toast.success('Thread created');
            }
        } catch(error) {
            console.error('Error creating thread', error);
        }
    }

    return(
        <form onSubmit={(e)=>handleSubmit(e)}>
            <h1 className="text-xl font-bold">Create a new thread</h1>
            <div className="p-[10px] border text-xs rounded text-gray-600 w-fit mt-4">
                <p>Please follow our comunity guidelines</p>
            </div>
            <div>
                <label className="label">Title
                    <input className="input" type="text" required onChange={(e)=> setTitle(e.target.value)}/>
                </label>
            </div>
            
            <div>
                <label className="label" >Content
                    <textarea className="input p-4" name="discussion_thread[content]" id="discussion_thread_content" onChange={(e)=>setContent(e.target.value)}></textarea>
                </label>
            </div>
            
            <div className="flex gap-4 items-center mt-8">
                <label className="label !mt-0 !flex gap-1">Locked thread
                <input
                    type="checkbox"
                    value={locked ? "1" : "0"} 
                    name="discussion_thread[locked]"
                    id="discussion_thread_locked"
                    checked={locked} 
                    onChange={(e) => setLocked(e.target.checked)} 
                />
                </label>
                
            </div>
            
            <input type="submit" name="commit" value="Create Thread" className="button mt-8" data-disable-with="Create Thread"  />
        </form>
    )
}