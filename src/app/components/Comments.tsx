'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

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


type CommentProps = {
    reload: boolean
}
export default function Comments({reload}:CommentProps) {

    const [comments, setComments] = useState([])
    const params = useParams()
    const{user} = useAuth();

    useEffect(()=> {        
        const getData = async () => {
            try {
                const response = await fetch(`/api/comments?id=${params.id}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                
                })
                const data = await response.json();
                setComments(data);
              } catch(error) {
                console.error('Error fetching comments', error);
              
              }
        }
        getData();

    },[reload])

    const handleDeleteComment = async (id:number) => {
        try {
            const response = await fetch(`/api/comments?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                toast.success('Comment deleted');
                setComments(comments.filter((comment:any) => comment.id !== id));
            }
        } catch(error) {
            console.error('Error deleting comment', error);
        }
    }
    

    function formatDate(dateString:string): string {

        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    }



    return(
        <div>
            {comments.length > 0 &&
            <div className="card_thread">
                <h2 className="text-xl font-bold mb-8">Comments</h2>
            
                <ul className="flex flex-col gap-8 mt-[10px]" >
                    {
                        comments.map((comment:any)=> {
                            return(
                                <li className="w-full">
                                    <div className="flex items-center gap-4">
                                    <div className="rounded-full min-w-[40px] h-[40px] block bg-gray-300 flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-user">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z"></path>
                                    <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z"></path>
                                    </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex gap-2">
                                        <p className="text-xs">{comment.users.name}</p>
                                        <p className="text-xs">{formatDate(comment.created_at)}</p>
                                        </div>
                                        <p className="mt-2">{comment.content}</p>
                                        {user && user.id === comment.users.id &&
                                        <AlertDialog>
                                            <AlertDialogTrigger className='text-xs text-start underline text-red-700 cursor-pointer'>Delete Comment</AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure you want delete this comment?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone.
                                                </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                className='bg-blue-500'
                                                onClick={()=> handleDeleteComment(comment.id)}>Continue
                                                </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                        }
                                    </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            }
        </div>
    )
}