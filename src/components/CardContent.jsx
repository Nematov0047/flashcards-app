import trashSvg from '../assets/trash.svg'
function CardContent({cards, currentWorkingFile, openReviewModal, flipCards, resetCards, changeCard, removeItem}) {
    let filteredCards = cards.filter(card => card.fileId == currentWorkingFile.id);
    const divClasses = "border-2 border-slate-200 p-2 group relative";
    const colors = [
        "border-red-200 text-red-950 bg-red-200",
        "border-yellow-200 text-yellow-950 bg-yellow-200",
        "border-cyan-200 bg-cyan-200 text-cyan-950",
        "border-green-200 bg-green-200 text-green-950"]
    
    function loseFocus(e) {
        if (e.key == 'Enter') {
            e.target.blur();
        }
    }

    return (
        <div className="space-y-4">
        <h2 className="text-lg md:text-xl">this collection has {filteredCards.length} card{filteredCards.length <= 1 ? '' : 's'}</h2>
        <div className="flex flex-col md:flex-row gap-2">
            <button className="bg-slate-800 p-2 px-4 text-white cursor-pointer w-full md:w-fit" onClick={openReviewModal}>Review now</button>
            <button className="bg-slate-800 p-2 px-4 text-white cursor-pointer w-full md:w-fit" onClick={flipCards}>Flip</button>
            <button className="bg-slate-800 p-2 px-4 text-white cursor-pointer w-full md:w-fit" onClick={resetCards}>Reset</button>
        </div>
        
        <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredCards.map(card => {
                return (
                    <div className={(card?.state >= 0 && card?.state <= 4) ? divClasses + " " + colors[card.state] : divClasses} key={card.id}>
                        <p className="p-1" contentEditable="" onBlur={(e) => {changeCard(card.id, 'frontSide', e.target.textContent)}} onKeyDown={(e) => loseFocus(e)} title="click to edit">{card.frontSide}</p>
                        <p className="p-1" contentEditable="" onBlur={(e) => {changeCard(card.id, 'backSide', e.target.textContent)}} onKeyDown={(e) => loseFocus(e)} title="click to edit">{card.backSide}</p>
                        <img src={trashSvg} alt=" trash icon" className="h-4 w-4 absolute right-2 bottom-2 group-hover:visible md:invisible" onClick={() => removeItem('card',card.id)} />
                    </div>
                )
            })}
        </div>
        </div>
    );
}

export default CardContent;