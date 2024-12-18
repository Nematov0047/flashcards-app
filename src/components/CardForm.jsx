function CardForm({currentWorkingFile, handleSubmit}) {
    return (
        <>
            <h1 className="text-xl md:text-2xl">current file: {currentWorkingFile.name}</h1>
            <form className="flex flex-col gap-4 mt-4 max-w-96 min-w-fit" onSubmit={handleSubmit}>
                <label htmlFor="frontSide" className="text-lg md:text-xl">Write for the front side</label>
                <input type="text" placeholder="Tree" className="text-lg md:text-xl p-2 outline-none border-2 border-slate-200 focus:border-slate-400" id="frontSide" name="frontSide" />
                <label htmlFor="backSide" className="text-lg md:text-xl">Write for the back side</label>
                <input type="text" placeholder="Daraxt" className="text-lg md:text-xl p-2 outline-none border-2 border-slate-200 focus:border-slate-400" id="backSide" name="backSide" />
                <input type="submit" value="Add" className="p-2 text-lg md:text-xl bg-white border-2 border-slate-200 hover:border-slate-400 cursor-pointer" />
            </form>
        </>
    )
}

export default CardForm;