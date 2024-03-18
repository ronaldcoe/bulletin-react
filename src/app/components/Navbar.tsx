import { useAuth } from "../context/AuthContext"

export default function Navbar() {

    const { user, logout } = useAuth()

    return(
        <div>
            <nav className="bg-blue-50 p-4 h-[72px]">
                <div className="mx-auto flex justify-between max-w-[1000px] items-center">
                    <a href="/" className=" text-md md:text-2xl">⚛️ BulletinReact</a>
                    <div className="text-md md:text-lg">
                        {user ? <span className="py-2 px-3">{user?.name}</span> : <a href="/signup" className="py-2 px-3">Sign Up</a>}
                        {user ? <span onClick={()=>logout()} className="py-2 px-3 cursor-pointer">Log out</span> : <a href="/login" className="py-2 px-3">Login</a>}
                    </div>
                </div>
            </nav>
        </div>
    )
}