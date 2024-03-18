import { useAuth } from "../context/AuthContext"

export default function Navbar() {

    const { user, logout } = useAuth()

    return(
        <div>
            <nav className="bg-blue-50 p-4 h-[72px]">
                <div className="container mx-auto flex justify-between items-center">
                    <a href="/" className=" text-2xl">⚛️ BulletinReact</a>
                    <div>
                        {user ? <span className="py-2 px-3">{user?.name}</span> : <a href="/signup" className="py-2 px-3">Sign Up</a>}
                        {user ? <span onClick={()=>logout()} className="py-2 px-3 cursor-pointer">Log out</span> : <a href="/login" className="py-2 px-3">Login</a>}
                    </div>
                </div>
            </nav>
        </div>
    )
}