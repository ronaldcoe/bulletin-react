'use client'

import { User } from "../interfaces/User"
import { Thread } from "../interfaces/Thread"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';

import toast from "react-hot-toast"

type CardDashProps = {
    data: Thread
}


export default function ThreadCard({data}: CardDashProps) {
    const router = useRouter();
    const {user} = useAuth();

    const [likedByUser, setLikedByUser] = useState(false);
    const [likeid, setLikeid] = useState<string | null>(null);



    useEffect(()=> {
        if(user) {
            const liked = data.likes.find((like) => like.user_id === user.id);
            
            if(liked) {
                setLikedByUser(true);
                setLikeid(liked.id);
            }
        }
    }, [data.likes, user])


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

    const handleLike =  async () => {
        if(!user) {
            toast.error('You must be logged in to like a thread');
            router.push('/login');
            return;
        }
        try {
            const response = await fetch('/api/likes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({thread_id: data?.id, user_id: user?.id})
            })
            const like = await response.json();
            if (like.id) {
                setLikedByUser(true);
                setLikeid(like.id);
                toast.success('You liked this thread');
                // window.location.reload();
            }
         
        } catch(error) {
            console.error('Error liking thread', error);
        }
    }
    
    const handleUnlike = async () => {
        try {
            
            // const liked = data.likes.find((like) => like.user_id === user?.id);
      
            const response = await fetch('/api/likes', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: likeid})
            })
            const unlike = await response.json();
          
            if (response.ok) {
                setLikedByUser(false);
                toast.success('You unliked this thread');
                // window.location.reload();

            }
        } catch(error) {
            console.error('Error unliking thread', error);
        }
    }
    return (
        <div className="card_thread w-full">
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <svg  xmlns="http://www.w3.org/2000/svg"  
                    width="14"  height="14"  viewBox="0 0 24 24"  
                    fill="currentColor"  
                    className="icon icon-tabler icons-tabler-filled icon-tabler-user">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                    <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
                    </svg>
                    <p className="text-xs">{data.users.name}</p>
                </div>
                <p className="text-xs">{formatDate(data.created_at)}</p>
            </div>
            <h1 className="text-2xl font-bold block mt-4">{data.title}</h1>
            <p className="mt-4">{data.content}</p>
            <div className="mt-4 flex gap-4 items-center">
                <span className="text-sm">{data.likes.length} Likes</span>
                <div className="flex gap-1 items-center cursor-pointer">
                    {
                        likedByUser ?
                        <div className="flex gap-2 items-center text-sm" onClick={()=>handleUnlike()}>
                            <svg  xmlns="http://www.w3.org/2000/svg"  
                            width="18"  height="18"  viewBox="0 0 24 24"  fill="currentColor"  
                            className="icon icon-tabler icons-tabler-filled icon-tabler-heart">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
                            </svg>
                            <span>Unlike</span>
                        </div> :
                        <div className="flex gap-2 items-center text-sm" onClick={()=>handleLike()}>
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18" 
                             viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  
                             stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"
                               className="icon icon-tabler icons-tabler-outline icon-tabler-heart">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                            </svg>
                            Like
                        </div>
                    }
                    
                </div>
                
               
            </div>
            
        </div>
    )
}