function Modal({inputFileFolder, closeFolderOrFile, create}) {
    function handleForm(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get('inputFileFolder');
        if (title.trim().length == 0) {
            e.currentTarget.reset();
            closeFolderOrFile();
        } else {
            create(title);
        }
        e.currentTarget.reset();
        closeFolderOrFile();
    }

    return (
        <div className="fixed bg-slate-800 p-4 bottom-0 w-full md:w-fit md:right-0 z-20">
            <form className="flex flex-col md:flex-row gap-2 items-center text-white" onSubmit={handleForm}>
                <input type="text" placeholder="eg. Economics" className="p-2 text-lg md:text-xl outline-none text-black w-full md:w-fit" ref={inputFileFolder} name="inputFileFolder" autoFocus />
                <input type="submit" value="Create" className="p-2 text-lg md:text-xl bg-slate-800 border-2 border-slate-200 hover:border-slate-400 w-full md:w-fit md:hidden" />
                <input type="button" value="Cancel" className="p-2 text-lg md:text-xl bg-slate-800 border-2 border-slate-200 hover:border-slate-400 w-full md:w-fit md:hidden" onClick={(e) => {closeFolderOrFile()}} />
            </form>
        </div>
    )
}

export default Modal;