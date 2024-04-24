import React, { useState } from 'react';

const ChallengecardModalButton = ({
    text
}: {
    text: string;
}) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        console.log("clicked")
        setIsClicked(!isClicked);
    };

    return (
        <div className="flex justify-center items-center">
            <div 
                className={`w-14 h-14 border-2 border-gray-300 rounded-lg shadow-lg cursor-pointer flex justify-center items-center ${isClicked ? 'bg-green-200' : 'bg-white hover:bg-green-100'}`}
                onClick={handleClick}
            >
                {text}
            </div>
        </div>
    );
};

export default ChallengecardModalButton;
