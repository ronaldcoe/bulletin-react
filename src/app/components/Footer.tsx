export default function Footer() {
    return(
        <footer className="flex text-center flex-col justify-center md:justify-start md:flex-row p-8 mt-10 bg-blue-50 gap-8">
            <p>© 2024 Ronald Coello</p>
            <p>Made with ⚛️ React</p>
            <a href="https://github.com/ronaldcoe/bulletin-react" target="_blank" className="underline">
                Check out the Repository
            </a>
        </footer>
    )
}