
import React from 'react';

interface CardProps {
    item: { id: number; word: string; icon: React.ReactNode; type: string };
    isFlipped: boolean;
    onClick: () => void;
    isDarkMode?: boolean;
    disabled?: boolean;
}

const Card: React.FC<CardProps> = ({ item, isFlipped, onClick, isDarkMode, disabled }) => {
    const handleCardClick = () => {
        if (disabled) return;

        if (item.type === 'word') {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(item.word);
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            window.speechSynthesis.speak(utterance);
        }
        onClick();
    };

    return (
        <div
            className={`relative w-full aspect-square cursor-pointer group perspective-1000`}
            onClick={handleCardClick}
        >
            <div className={`w-full h-full relative transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front (Hidden) */}
                <div className={`absolute w-full h-full backface-hidden rounded-xl shadow-md flex items-center justify-center text-4xl border-b-4
                    ${isDarkMode
                        ? 'bg-gray-800 border-gray-700 text-gray-600'
                        : 'bg-white border-gray-200 text-blue-200'
                    } group-hover:-translate-y-1 transition-transform`}
                >
                    <span className="opacity-50 font-bold text-3xl">?</span>
                </div>

                {/* Back (Revealed) */}
                <div className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-md flex items-center justify-center border-b-4
                    ${isDarkMode
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-blue-100 text-gray-800'
                    }`}
                >
                    {item.type === 'word' ? (
                        <span className="font-bold text-lg p-1 text-center leading-tight break-words overflow-hidden">{item.word}</span>
                    ) : (
                        <span className="text-4xl">{item.icon}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;
