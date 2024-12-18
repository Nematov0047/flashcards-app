import CardForm from "./CardForm";
import CardContent from "./CardContent";
import ReviewCards from "./ReviewCards";
import { useState } from "react";

function MainCard({currentWorkingFile, addCardToFile, cards, changeCardState, flipCards, resetCards, changeCard, removeItem}) {
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const frontSide = formData.get('frontSide');
        const backSide = formData.get('backSide');
        if (frontSide.length === 0 || backSide.length === 0) {
            return;
        } else {
            addCardToFile(frontSide, backSide, currentWorkingFile.id);
        }
        e.currentTarget.reset();
    }

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    function openReviewModal() {
        setIsReviewModalOpen(prev => !prev);
    }

    return (
        <div className="p-2 md:p-4">
        {currentWorkingFile?.name ?
        <> 
        <CardForm currentWorkingFile={currentWorkingFile} handleSubmit={handleSubmit} />
        <CardContent currentWorkingFile={currentWorkingFile} cards={cards} openReviewModal={openReviewModal} flipCards={flipCards} resetCards={resetCards} changeCard={changeCard} removeItem={removeItem} />
        </>
        :
        <>
            <h1 className="text-xl md:text-2xl">Welcome back!</h1>
            <h2 className="text-lg md:text-xl">create or select a file, and begin adding flashcards</h2>
        </>
        }
        <ReviewCards isReviewModalOpen={isReviewModalOpen} openReviewModal={openReviewModal} filteredCards={cards.filter(card => card.fileId == currentWorkingFile.id)} changeCardState={changeCardState} />
        </div>
        
    );
}

export default MainCard;