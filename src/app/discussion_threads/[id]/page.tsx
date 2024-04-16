"use client"
import ThreadCard from '@/app/components/ThreadCard'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Thread } from '@/app/interfaces/Thread'
import { useAuth } from "../../context/AuthContext"
import { toast } from 'react-hot-toast'
import {useRouter} from 'next/navigation'
import Comments from '@/app/components/Comments'


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"


export default function Threadview() {
    const params = useParams()
    const router = useRouter();
    const [thread, setThread] = useState<Thread>({} as Thread)
    const {user} = useAuth();
    const [reloadComments, setReloadComments] = useState(false);
    const [commentText, setCommentText] = useState<string | null >(null);

 
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
                if (data === null) {
                    router.push("/")
                    toast.error('Thread not found');
                    return
                }
                setThread(data);
              } catch(error) {
                console.error('Error fetching threads', error);
              
              }
        }
        getData();

    },[])

    const handleSubmitComment = async (e:any) => {
        e.preventDefault();
        if(!user) {
            toast.error('You must be logged in to add a comment');
            router.push('/login');
            return;
        }
        if(commentText === null) {
            toast.error('Comment cannot be empty');
            return;
        }
        const data = { content: e.target[0].value, user_id: user?.id, thread_id: thread.id}
        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            if (response.ok) {
                toast.success('Comment created');
                setCommentText(null);
                setReloadComments(!reloadComments);
            }
        } catch(error) {
            console.error('Error creating comment', error);
        }
    }

    const handleDeleteThread = async () => {
        try {
            const response = await fetch(`/api/thread?id=${params.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                toast.success('Thread deleted');
                router.push('/');
            }
        } catch(error) {
            console.error('Error deleting thread', error);
        }
    }

    return(
       <div>
            {!thread.id&& 
           
                <div role="status" className="w-full animate-pulse">
                    <div className="h-[200px] bg-gray-200 rounded-md w-full mb-4"></div>
                    <span className="sr-only">Loading...</span>
                </div>
            
            }
            {
                user && user.id === thread.user_id &&
                <div className="flex gap-4">
                    <div className=" w-fit flex items-center gap-2">
                    <a className="flex button items-center gap-2" href={`/discussion_threads/edit/${params.id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                        <path d="M16 5l3 3"></path>
                        </svg>
                        <span>Edit</span>
                        </a>    
                    </div>
                    <div>
                        <AlertDialog>
                            <AlertDialogTrigger className="bg-red-100 border-red-500 text-red-700 flex items-center gap-2 border rounded py-2 px-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M4 7l16 0"></path><path d="M10 11l0 6"></path>
                                <path d="M14 11l0 6"></path>
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                </svg>
                                <span>Delete</span>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure you want delete this thread?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                className='bg-blue-500'
                                onClick={()=> handleDeleteThread()}>Continue
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                       
                    </div>
                    </div>
            }
            {thread.id && <ThreadCard data={thread} />}
            {thread.locked ?
                <p className="bg-yellow-100 border-yellow-500 mt-8 text-yellow-700 p-4 border rounded-md mb-8">This thread is locked and no longer accepting comments.</p> 
                :
                <form className='mt-8' onSubmit={handleSubmitComment}>
                
                    <p>
                    <textarea placeholder="Add a comment" value={commentText || ""} onChange={(e)=> setCommentText(e.target.value)} className="input !p-4" required ></textarea>
                    </p>
                    <p>
                    <input type="submit" className="button mt-4"/>
                    </p>
                </form>
            }
            <div className='mt-4'>
                <Comments reload={reloadComments} />
            </div>
       </div> 
    )
}