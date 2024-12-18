import { useEffect, useRef } from 'react';
import barSvg from '../assets/bar.svg'

function Topbar({onClick, sidebarOpen}) {
    let menuIcon = useRef(null);
    useEffect(() => {
        if (sidebarOpen) {
            menuIcon.current.style.transform = 'rotate(90deg)';
        } else {
            menuIcon.current.style.transform = 'rotate(0deg)';
        }
    }, [sidebarOpen])
    return (
    <div className="bg-slate-800 p-4 text-white flex flex-row gap-4 items-center">
        <span onClick={onClick} className="md:hidden"><img src={barSvg} alt="menu" className="h-6 w-6 cursor-pointer duration-300" ref={menuIcon} /></span>
        <h1 className="text-xl md:text-2xl">Flashcards App</h1>
    </div>);
}

export default Topbar;