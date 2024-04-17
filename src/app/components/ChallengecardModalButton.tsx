import React from 'react';

const ChallengecardModalButton = ({
    text
}: {
    text: string;
}) => {
    
    return (
        <div className="flex justify-center items-center">
            <div className="w-20 h-20 rounded-lg shadow-md bg-grey-200 cursor-pointer hover:bg-green-100 flex justify-center items-center">
                {text}
            </div>
        </div>
    );
};

export default ChallengecardModalButton;
