export interface Thread {
    id: string;
    title: string;
    content: string;
    user_id: string;
    created_at: string;
    updated_at: string;
    users: {
        name:string
    }
    likes: {
        user_id: string,
        id: string
    }[],
    comments: {
        id: string,
        content: string,
        created_at: string,
        users: {
            name: string
        }
    }[]
    
}