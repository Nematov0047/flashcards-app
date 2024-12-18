import { useState } from 'react';
import exitSvg from '../assets/x.svg';

function ReviewCards({isReviewModalOpen, openReviewModal, filteredCards, changeCardState}) {
    const [currentItem, setCurrenItem] = useState(0);
    const [showTheAnswer, setShowTheAnswer] = useState(false);
    let currentCards = filteredCards;

    function scoreItem(score) {
        changeCardState(currentCards[currentItem].id, score);
        setShowTheAnswer(false);
        changeCardState();

        if (currentCards.length == currentItem+1) {
            setCurrenItem(0);
            openReviewModal();
        } else {
            setCurrenItem(prev=> prev+1);
        }

    }

    function closeModal() {
        setShowTheAnswer(false);
        setCurrenItem(0);
    }

    return (
        (isReviewModalOpen && filteredCards.length !== 0) &&
        <div className="z-30 fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center bg-slate-800 text-white">
            <h1 className="text-2xl md:text-4xl">{showTheAnswer ? currentCards[currentItem].backSide : currentCards[currentItem].frontSide}</h1>
            <span className="fixed top-4 right-4 h-6 w-6 cursor-pointer" onClick={() => {openReviewModal(); closeModal(); }}><img src={exitSvg} alt="exit" /></span>
            {!showTheAnswer && 
            <div className="my-12 flex flex-row items-center gap-2 fixed bottom-0 right-0 left-0 w-full justify-center">
                <button className="text-xl md:text-3xl py-2 px-4 bg-teal-900 text-white" onClick={() => {setShowTheAnswer(prev => !prev)}}>Show the answer</button>
            </div>}
            {showTheAnswer && 
            <div className="my-12 flex flex-row items-center gap-2 fixed bottom-0 right-0 left-0 w-full justify-center">
                <button className="text-xl md:text-3xl py-2 px-4 bg-red-200 text-red-950" onClick={() => {scoreItem(0)}}>worse</button>
                <button className="text-xl md:text-3xl py-2 px-4 bg-yellow-200 text-yellow-950" onClick={() => {scoreItem(1)}}>bad</button>
                <button className="text-xl md:text-3xl py-2 px-4 bg-cyan-200 text-cyan-950" onClick={() => {scoreItem(2)}}>good</button>
                <button className="text-xl md:text-3xl py-2 px-4 bg-green-200 text-green-950" onClick={() => {scoreItem(3)}}>better</button>
            </div>
            }
        </div>
    );
}

export default ReviewCards;