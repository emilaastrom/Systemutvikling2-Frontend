import React from 'react';

type ChallengecardModalProps = {
    onClose: () => void;
};

type Suggestion = {
    text: string;
    time: number;
};

const ChallengecardAddModal: React.FC<ChallengecardModalProps> = ({ onClose }) => {

    const suggestions: Suggestion[] = [
        { text: 'Utfordring 1', time: 15 },
        { text: 'Utfordring 2', time: 30 },
        { text: 'Utfordring 3', time: 45 },
    ];

    const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    const generateDates = (start: number, end: number) => {
        const dates = [];
        for (let i = start; i <= end; i++) {
            dates.push(i);
        }
        return dates;
    };

    return (
        <div onClick={onClose} className="fixed h-screen w-screen inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
            <div onClick={stopPropagation} className="bg-white rounded-lg w-screen md:w-1/2 m-5 overflow-auto">
                <div className="bg-fuchsia-200 p-4 rounded-t-lg w-full max-h-1/4 text-center flex flex-col justify-center items-center font-semibold overflow-auto">
                    Ny utfordring?
                </div>
                <div className="items-center justify-center w-full my-4">
                    <h2 className="text-center font-semibold">Forslag til utfordringer</h2>
                </div>
                {suggestions.map((suggestion, index) => (
                    <div 
                        key={index} 
                        className="m-3 border-2 rounded-md p-3 cursor-pointer hover:bg-gray-100 flex justify-between"
                    >
                        <div className="items-center flex">
                            {suggestion.text}
                        </div>
                        <div className="text-center whitespace-nowrap ml-2">
                            Tid:<br /> 
                            {suggestion.time} dager
                            </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChallengecardAddModal;
