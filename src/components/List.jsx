import folderOpenSvg from '../assets/folder_open.svg'
import fileSvg from '../assets/file.svg'
import folderSvg from '../assets/folder_closed.svg'
import trashSvg from '../assets/trash.svg'

function List({dataStructure, openFolder, currentPWD, backFolder, openFile, removeItem}) {
    return (
        <ul className="text-lg md:texl-xl">
            {currentPWD != '/' ? <li className="flex flex-row gap-2 items-center cursor-pointer p-2 hover:bg-slate-900" onClick={backFolder}><span>..{currentPWD.split('/').slice(0,-1).join('/')}</span></li> : null}
            {dataStructure.map(item => {
                if (item.pwd == currentPWD) {
                    return <li className="flex flex-row gap-2 items-center cursor-pointer p-2 hover:bg-slate-900 relative group" onClick={item.type == 'folder' ? () => {openFolder(item.name)} : () => {openFile(item.name, item.id)} } key={item.id}><span><img src={item.type == 'folder' ? folderSvg : fileSvg} alt="closed folder icon" className="h-4 w-4" /></span>{item.name.slice(0,15)}{item.name.length > 15 ? '...' : ''}<img src={trashSvg} className='h-4 w-4 absolute right-2 group-hover:visible md:invisible' alt="trash icon" onClick={(e) => {e.stopPropagation(); removeItem(item.type, item.id)}} /></li>;
                }
        
        })}
        </ul>
    );
}

export default List;