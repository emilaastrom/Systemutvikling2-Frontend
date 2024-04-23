import React, { useState } from 'react';

type ChallengecardModalProps = {
    onClose: () => void;
};

type Suggestion = {
    title: string;
    description: string;
    category: string;
    time: number;
    
};

const ChallengecardAddModal: React.FC<ChallengecardModalProps> = ({ onClose }) => {
    const [currentPage, setCurrentPage] = useState(0); // Zero-based index for the current page
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);


    const suggestions: Suggestion[] = [
        { 
            title: 'Utfordring 1', 
            description: 'Description for Utfordring 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sollicitudin ac orci phasellus egestas tellus rutrum. Quis enim lobortis scelerisque fermentum. Eget aliquet nibh praesent tristique magna. Ullamcorper sit amet risus nullam eget felis. Volutpat ac tincidunt vitae semper quis lectus nulla at volutpat.', 
            category: 'kaffe', 
            time: 15 
        },
        { title: 'Utfordring 2', description: 'Description for Utfordring 2', category: 'kaffe', time: 15 },
        { title: 'Utfordring 3', description: 'Description for Utfordring 3', category: 'kaffe', time: 15 },
        { title: 'Utfordring 4', description: 'Description for Utfordring 4', category: 'kaffe', time: 15 },
        { title: 'Utfordring 5', description: 'Description for Utfordring 5', category: 'kaffe', time: 15 },
        { title: 'Utfordring 6', description: 'Description for Utfordring 6', category: 'kaffe', time: 15 }
    ];

    const totalPages = suggestions.length;

    const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    const renderSuggestion = () => {
        const suggestion = suggestions[currentPage];

        return (
            <div className="mx-10 border-2 rounded-md p-4  cursor-pointer bg-green-100 hover:bg-green-200 flex flex-col justify-between h-2/3">
                <span className="text-gray-500 text-sm text-start">
                    <span className="font-semibold">Kategori: </span> {suggestion.category}
                    </span>
                <div className="flex flex-col px-16 justify-center items-center mb-2 overflow-y-auto">
                    <h3 className="text-3xl font-semibold text-center mb-5">{suggestion.title}</h3>
                    <p className="text-lg text-gray-700 text-center mb-2">{suggestion.description}</p>
                </div>
                
                
                <div className="text-center text-gray-600 text-sm mt-auto">
                    <span className="font-semibold">Antall dager: </span> {suggestion.time}
                </div>
            </div>   
        );
    };

    return (
        <div onClick={onClose} className="fixed h-screen w-screen inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
            <div onClick={stopPropagation} className="bg-white rounded-lg w-screen md:w-1/2 h-2/3 m-5 overflow-auto">
                <div className="bg-fuchsia-200 p-4 rounded-t-lg w-full max-h-1/4 text-center flex flex-col justify-center items-center font-semibold overflow-auto">
                    Ny utfordring?
                </div>              
                <div className="flex justify-center mt-4 mx-4 text-lg ">
                    <div className="flex items-center mr-4">
                        <input
                            type="radio"
                            id="easy"
                            name="difficulty"
                            value="easy"
                            checked={selectedDifficulty === 'easy'}
                            onChange={() => setSelectedDifficulty('easy')}
                        />
                        <label htmlFor="easy" className="ml-2">Easy</label>
                    </div>
                    <div className="flex items-center mr-4">
                        <input
                            type="radio"
                            id="medium"
                            name="difficulty"
                            value="medium"
                            checked={selectedDifficulty === 'medium'}
                            onChange={() => setSelectedDifficulty('medium')}
                        />
                        <label htmlFor="medium" className="ml-2">Medium</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="hard"
                            name="difficulty"
                            value="hard"
                            checked={selectedDifficulty === 'hard'}
                            onChange={() => setSelectedDifficulty('hard')}
                        />
                        <label htmlFor="hard" className="ml-2">Hard</label>
                    </div>
                </div>

                <div className="flex justify-between mx-4 mb-4 font-semibold">
                    <button 
                        onClick={() => setCurrentPage(Math.max(0, currentPage - 1))} 
                        disabled={currentPage === 0}
                        className={`mx-1 px-4 py-2 font-bold ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        Prev
                    </button>
                    
                    <button 
                        onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))} 
                        disabled={currentPage === totalPages - 1}
                        className={`mx-1 px-4 py-2 font-bold ${currentPage === totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        Next
                    </button>
                </div>
            
                {renderSuggestion()}
            </div>
        </div>
    );
};

export default ChallengecardAddModal;
