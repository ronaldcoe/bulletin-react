'use client'
import toast from 'react-hot-toast';
import { useRequireAuth } from '../../../components/useRequireAuth'
import { useState, useEffect } from 'react'
import { Thread } from '@/app/interfaces/Thread'
import { useParams, useRouter } from 'next/navigation'

export default function Edit() {
    const user = useRequireAuth();
    const [title, setTitle] = useState<string | undefined>(undefined);
    const [content, setContent] = useState<string | undefined>(undefined);
    const [locked, setLocked] = useState(false);

    const router = useRouter();
    const params = useParams()

    useEffect(()=> {        
        const getData = async () => {
      
            try {
                const response = await fetch(`/api/thread?id=${params.id}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                
                })
                const data = await response.json();
                setTitle(data.title);
                setContent(data.content);
                setLocked(data.locked);
            
              } catch(error) {
                console.error('Error fetching threads', error);
              
              }
        }
        getData();

    },[])

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const data = {id:params.id, title, content, user_id: user?.id, locked}
        try {
            const response = await fetch('/api/threads', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            if (response.ok) {
                toast.success('Thread Updated');
                router.push(`/discussion_threads/${params.id}`);

            }
        } catch(error) {
            console.error('Error creating thread', error);
        }
    }

    return (
        <div>
            {!title &&
                <div role="status" className="w-full animate-pulse">
                    <div className="h-[30px] bg-gray-200 rounded-md w-[100px] mb-4"></div>
                    <div className="h-[40px] bg-gray-200 rounded-md w-[150px] mb-4"></div>
                    <div className="h-[40px] bg-gray-200 rounded-md w-full mb-4"></div>
                    <div className="h-[40px] bg-gray-200 rounded-md w-full mb-4"></div>
                    <div className="h-[50px] bg-gray-200 rounded-md w-[100px] mb-4"></div>
                    <span className="sr-only">Loading...</span>
                </div>
            }
            {title && content &&
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <h1 className="text-xl font-bold">Update thread</h1>
                    <div className="p-[10px] border text-xs rounded text-gray-600 w-fit mt-4">
                        <p>Please follow our comunity guidelines</p>
                    </div>
                    <div>
                        <label className="label">Title
                            <input className="input" value={title} type="text" required onChange={(e)=> setTitle(e.target.value)}/>
                        </label>
                    </div>
                    
                    <div>
                        <label className="label" >Content
                            <textarea className="input p-4" value={content} name="discussion_thread[content]" id="discussion_thread_content" onChange={(e)=>setContent(e.target.value)}></textarea>
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
                    
                    <input type="submit" name="commit" value="Update Thread" className="button mt-8" data-disable-with="Create Thread"  />
                </form>
            }
        </div>
    )
}