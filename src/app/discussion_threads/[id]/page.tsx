"use client"
import ThreadCard from '@/app/components/ThreadCard'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Thread } from '@/app/interfaces/Thread'
export default function Threadview() {
    const params = useParams()

    const [thread, setThread] = useState<Thread>({} as Thread)


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
                setThread(data);
              } catch(error) {
                console.error('Error fetching threads', error);
              
              }
        }
        getData();

    },[])

    return(
       <div>
            {thread.id && <ThreadCard data={thread} />}
       </div> 
    )
}