import React, { useEffect, useState } from 'react';
import CustomIcon from '../icons/CustomIcon';
import { AnimatePresence, motion } from 'framer-motion';
import { useApiHandler } from '@/utils/api';

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
    const [difficultyDays, setDifficultyDays] = useState<number>(0);

    const apiHandler = useApiHandler()

    const fetchSuggestions = async () => {
        
        const user = await apiHandler("user", "get", "/getUser")
        console.log(user.data)
        const suggestionsdata = await apiHandler("challenge", "get", "/getNewChallenges?number=3")
        console.log("new challenges: ",suggestionsdata.data)
    }

    useEffect(() => {
        fetchSuggestions();
    })
    const suggestions: Suggestion[] = [
        { 
            title: 'Utfordring 1', 
            description: 'Description for Utfordring 1  Sot nibh praese amet risus tincidunt vitae semper quis lectus nulla at volutpat.', 
            category: 'kaffe', 
            time: 15 
        },
        { title: 'Utfordring 2', description: 'Description for Utfordring 2', category: 'kaffe', time: 15 },
        { title: 'Utfordring 3', description: 'Description for Utfordring 3', category: 'kaffe', time: 10 },
        { title: 'Utfordring 4', description: 'Description for Utfordring 4', category: 'kaffe', time: 18 },
        { title: 'Utfordring 5', description: 'Description for Utfordring 5', category: 'kaffe', time: 15 },
        { title: 'Utfordring 6', description: 'Description for Utfordring 6', category: 'kaffe', time: 15 }
    ];

    const totalPages = suggestions.length;

    const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    const [x1, setX1] = useState(100);
    const [x2, setX2] = useState(-100);
    
    const renderSuggestion = () => {
        const suggestion = suggestions[currentPage];
        return (
            <motion.div 
            key={currentPage} 
            initial={{ opacity: 0, x: x1 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: x2 }}
            transition={{ duration: 0.2 }}
            className="border-2 rounded-md p-4  cursor-pointer overflow-y-auto bg-white hover:bg-[#fff] flex flex-col justify-between w-3/4 h-full"
        >
           <span className="text-gray-500 text-sm text-start">
                    <span className="font-semibold">Kategori: </span> {suggestion.category}
                    </span>
                <div className="flex flex-col md:px-16 x-4 justify-center items-center mb-2 ">
                    <h3 className="text-xl font-semibold text-center mb-5">{suggestion.title}</h3>
                    <p className="text-md text-gray-700 text-center mb-2">{suggestion.description}</p>
                </div>
                
                
                <div className="text-center text-gray-600 text-sm mt-auto">
                    <span className="font-semibold">Antall dager: </span> {suggestion.time}<br />
                    <div className='mt-2'>
                        <span className="font-semibold">Dager for fullført: </span> <span className='bg-primary-light p-1 font-semibold text-light rounded-md'>{difficultyDays}</span>
                    </div>
                </div>
            </motion.div> 
        );
    };

    const calculateDifficultyDays = (difficulty:string, page:number) => {
        if(difficulty==="Vanskelig"){
        setDifficultyDays(suggestions[page].time)
    } else if(difficulty==="Medium"){
        setDifficultyDays(Math.floor(suggestions[page].time/100*80))
    } else if(difficulty==="Enkel"){
        setDifficultyDays(Math.floor(suggestions[page].time/100*50))
    }
    }

    const difficultyChange = (difficulty:string, currentPage:number) => {
        setSelectedDifficulty(difficulty); 
        calculateDifficultyDays(difficulty, currentPage)
    }

    const submit = () => {
        
    }

    return (
        <div onClick={onClose} className="modal-container">
            <div onClick={stopPropagation} className="bg-white rounded-lg w-screen md:w-1/2 m-5 overflow-auto h-5/6">
            <div className="bg-fuchsia-200 p-4 rounded-t-lg w-full max-h-1/4 text-center relative font-semibold overflow-auto">
            <div className="flex-grow flex justify-center items-center">
                Ny utfordring?
            </div>
            <button className="absolute top-0 right-0 m-4" onClick={onClose}>
                <CustomIcon 
                    className={""}
                    svg={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    }
                    />
            </button>
        </div>       
            <div className="flex justify-center m-4 text-lg">
            <div className="flex space-x-2 justify-center">
            {["Enkel", "Medium", "Vanskelig"].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => {
                    difficultyChange(difficulty, currentPage)
                }}
                className={`py-2 px-4 rounded-xl font-mono ${
                  selectedDifficulty === difficulty
                    ? "bg-primary-light text-white "
                    : "bg-gray-200"
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
            </div>

            <div className="flex justify-between h-2/3 mb-4">
                <button 
                    onClick={() => {setCurrentPage(Math.max(0, currentPage - 1));
                        setX1(-100);
                        setX2(100);
                        difficultyChange(selectedDifficulty, Math.max(0, currentPage - 1))
                        }} 
                    disabled={currentPage === 0}
                    className={`mx-1 md:px-4 py-2 font-bold ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    <CustomIcon 
                        className={""}
                        svg={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        }
                        />
                </button>
                {renderSuggestion()}
                <button 
                    onClick={() => {setCurrentPage(Math.min(totalPages - 1, currentPage + 1));
                        setX1(100);
                        setX2(-100);    
                        difficultyChange(selectedDifficulty, Math.min(totalPages - 1, currentPage + 1))
                    }}
                    disabled={currentPage === totalPages - 1}
                    className={`mx-1 md:px-4 py-2 font-bold ${currentPage === totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    <CustomIcon 
                        className={""}
                        svg={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        }
                        />
                </button>
            </div>

            <div className="flex justify-center items-center">
                <button className="border-2 border-primary-light p-5" onClick={submit}>Legg til utfordring</button>
            </div>

        </div>
    </div>
    );
};

export default ChallengecardAddModal;
