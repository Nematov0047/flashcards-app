import newFileSvg from '../assets/new_file.svg'
import newFolderSvg from '../assets/new_folder.svg'
import { useEffect, useRef } from 'react'
import List from './List'

function Sidebar({sidebarOpen, dataStructure, openFolder, currentPWD, backFolder, createFolderOrFile, openFile, removeItem}) {
    const sidebar = useRef(null);
    useEffect(() => {
        if (sidebarOpen) {
            sidebar.current.style.left = '0';
            sidebar.current.classList.add('shadow-xl')
        } else {
            sidebar.current.style.left = '-100%';
            sidebar.current.classList.remove('shadow-xl')
        }
    }, [sidebarOpen]);

    return (
        <div className="z-10 flex flex-col min-h-screen overflow-clip bg-slate-800 w-60 absolute md:static text-white duration-300 ease-in-out shadow-slate-950 shadow-xl md:shadow-none" ref={sidebar}>
            <div className="flex flex-row gap-4 border-b-2 border-b-slate-200 p-2">
                <span><img src={newFileSvg} alt="new file" className="h-6 w-6 cursor-pointer" title="new file" onClick={() =>{createFolderOrFile('file')}} /></span>
                <span><img src={newFolderSvg} alt="new folder" className="h-6 w-6 cursor-pointer" title="new folder" onClick={() => {createFolderOrFile('folder')}} /></span>
            </div>
            <div>
                <List dataStructure={dataStructure} openFolder={openFolder} currentPWD={currentPWD} backFolder={backFolder} openFile={openFile} removeItem={removeItem} />
            </div>
        </div>
    )
}

export default Sidebar;