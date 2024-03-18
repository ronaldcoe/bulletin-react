'use client'

import { User } from "../interfaces/User"
import { Thread } from "../interfaces/Thread"
type CardDashProps = {
    data: Thread
}
export default function CardDash({data}: CardDashProps) {

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
            <a href={`/discussion_threads/${data.id}`} className="text-2xl font-bold block mt-4">{data.title}</a>
            <p className="mt-4">{data.content}</p>
            <div className="mt-4 flex gap-4">
                <div className="flex gap-1 items-center">
                    <svg  xmlns="http://www.w3.org/2000/svg"  
                    width="18"  height="18"  viewBox="0 0 24 24"  fill="currentColor"  
                    className="icon icon-tabler icons-tabler-filled icon-tabler-heart">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
                    </svg>
                    <span className="text-xs">{data.likes.length} Likes</span>
                </div>
                <div className="flex gap-1 items-center">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  
                    viewBox="0 0 24 24"  fill="currentColor"  
                    className="icon icon-tabler icons-tabler-filled icon-tabler-message-circle-2">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M5.821 4.91c3.898 -2.765 9.469 -2.539 13.073 .536c3.667 3.127 4.168 8.238 1.152 11.897c-2.842 3.447 -7.965 4.583 -12.231 2.805l-.232 -.101l-4.375 .931l-.075 .013l-.11 .009l-.113 -.004l-.044 -.005l-.11 -.02l-.105 -.034l-.1 -.044l-.076 -.042l-.108 -.077l-.081 -.074l-.073 -.083l-.053 -.075l-.065 -.115l-.042 -.106l-.031 -.113l-.013 -.075l-.009 -.11l.004 -.113l.005 -.044l.02 -.11l.022 -.072l1.15 -3.451l-.022 -.036c-2.21 -3.747 -1.209 -8.392 2.411 -11.118l.23 -.168z" />
                    </svg>
                    <span className="text-xs">{data.comments.length} Comments</span>

                </div>
            </div>
            
        </div>
    )
}