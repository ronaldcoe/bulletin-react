'use client'
import Image from "next/image";
import { Thread } from "./interfaces/Thread";
import CardDash from "./components/CardDash";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
export default function Home() {

  const [threads, setThreads] = useState<Thread[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const {user} = useAuth();
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

  const currentUser = user?.name;
  // Filter threads
  function filterThreads(threads:any, filter:any, currentUser:any) {
    switch (filter) {
      case 'relevance':
        // Assuming relevance is determined by the sum of likes and comments
        return threads.slice().sort((a:any, b:any) => 
          (b.likes.length + b.comments.length) - (a.likes.length + a.comments.length));
      case 'mine':
        return threads.filter((thread: any) => thread.users.name === currentUser);

      case 'all':
      default:
        return threads.slice().sort((a: any, b: any) => +new Date(b.created_at) - +new Date(a.created_at));

    }
  }

  const filteredThreads = filterThreads(threads, filter, currentUser);
  return (
  
      <div>
        <a href="/discussion_threads/new" 
        className="button mb-8 text-center w-full md:w-fit block">Create New Thread</a>
        
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">All Threads</h1>
          <label className="label">Sort by:</label>
          <select className="input" onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value)}>
            <option value="all">Date Posted</option>
            <option value="relevance">Relevance</option>
            <option value="mine">My Threads</option>
          </select>
          {/* {threads.filter(threads.users.name === user.name).map((thread)=> {
            return <CardDash data={thread} />
          
          
          })} */}
          {
          threads.length===0 && 
          <div role="status" className="w-full animate-pulse">
              <div className="h-[200px] bg-gray-200 rounded-md w-full mb-4"></div>
              <div className="h-[200px] bg-gray-200 rounded-md w-full mb-4"></div>
              <span className="sr-only">Loading...</span>
          </div>
        }
          {filteredThreads.map((thread:any) => (
            <CardDash key={thread.id} data={thread} />
          ))}
        </div>
      </div>
  
  );
}
