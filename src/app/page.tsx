'use client'
import Image from "next/image";
import { Thread } from "./interfaces/Thread";
import CardDash from "./components/CardDash";
import { useEffect, useState } from "react";
export default function Home() {

  const [threads, setThreads] = useState<Thread[]>([]);


  useEffect(() => {
    const getData = async () => {
   
      try {
        const response = await fetch('/api/threads', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        
        })
        const data = await response.json();
        setThreads(data);
      } catch(error) {
        console.error('Error fetching threads', error);
      
      }
    }

    getData();
  },[])

  return (
  
      <div>
        <a href="/discussion_threads/new" 
        className="button mb-8 text-center w-full md:w-fit block">Create New Thread</a>
        {
          threads.length===0 && 
          <div role="status" className="w-full animate-pulse">
              <div className="h-[200px] bg-gray-200 rounded-md w-full mb-4"></div>
              <div className="h-[200px] bg-gray-200 rounded-md w-full mb-4"></div>
              <span className="sr-only">Loading...</span>
          </div>
        }
        <div className="flex flex-col gap-2">
          {threads.map((thread)=> {
            return <CardDash data={thread} />
          
          
          })}
        </div>
      </div>
  
  );
}
