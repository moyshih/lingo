
import React, { useState, useEffect } from 'react';
import Card from './Card';
import { memoryGameData } from './assets/mockData/memoryGameData';
import { Trophy, Zap, Footprints, RotateCcw, ChevronLeft } from 'lucide-react';

interface MemoryGameProps {
    isDarkMode?: boolean;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ isDarkMode }) => {
    const [level, setLevel] = useState(1);
    const [cards, setCards] = useState<any[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        startGame();
    }, [level]);

    useEffect(() => {
        if (cards.length > 0 && matchedPairs.length === cards.length / 2) {
            setIsGameOver(true);
        }
    }, [matchedPairs, cards]);

    const startGame = () => {
        let currentLevelData;
        if (level === 1) {
            currentLevelData = memoryGameData.slice(0, 8);
        } else if (level === 2) {
            currentLevelData = memoryGameData.slice(8, 20);
        } else {
            currentLevelData = memoryGameData.slice(20, 36);
        }

        const wordCards = currentLevelData.map((item) => ({ ...item, type: 'word' }));
        const iconCards = currentLevelData.map((item) => ({ ...item, type: 'icon' }));
        const gameCards = [...wordCards, ...iconCards];
        setCards(shuffleArray(gameCards));
        setFlippedCards([]);
        setMatchedPairs([]);
        setMoves(0);
        setScore(0);
        setIsGameOver(false);
    };

    const shuffleArray = (array: any[]) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const handleCardClick = (index: number) => {
        if (flippedCards.length === 2 || flippedCards.includes(index) || matchedPairs.includes(cards[index].id)) {
            return;
        }

        const newFlippedCards = [...flippedCards, index];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            setMoves(moves + 1);
            const firstCard = cards[newFlippedCards[0]];
            const secondCard = cards[newFlippedCards[1]];

            if (firstCard.id === secondCard.id && firstCard.type !== secondCard.type) {
                setMatchedPairs([...matchedPairs, firstCard.id]);
                setScore(score + 10); // Updated scoring logic for better UX
                setFlippedCards([]);
            } else {
                setTimeout(() => {
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    const isCardFlipped = (index: number) => {
        return flippedCards.includes(index) || matchedPairs.includes(cards[index].id);
    };

    const handleNextLevel = () => {
        setLevel(prev => prev + 1);
    };

    const handleRestartGame = () => {
        // If already at level 1, just restart. If higher, reset to 1? Or just restart level?
        // Logic in original was reset to level 1 if game over at level 3.
        // Let's simple reset the current level if not game over, or follow original logic.
        // Original logic: restart game set level to 1.
        setLevel(1);
    };

    const getGridClass = () => {
        if (level === 1) return 'grid-cols-4';
        if (level === 2) return 'grid-cols-4 sm:grid-cols-6';
        return 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8'; // Level 3
    };

    return (
        <div className={`h-full flex flex-col pb-24 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Header / Stats */}
            <div className={`p-4 shadow-sm sticky top-0 z-10 flex flex-col gap-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex justify-between items-center">
                    <h1 className={`text-xl font-bold flex items-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        <Zap className="ml-2 text-yellow-500" />
                        משחק הזיכרון
                    </h1>
                    <div className="flex bg-gray-100 rounded-lg p-1 dark:bg-gray-700">
                        <button onClick={() => setLevel(1)} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${level === 1 ? 'bg-white shadow-sm text-blue-600 dark:bg-gray-600 dark:text-gray-200' : 'text-gray-400'}`}>קל</button>
                        <button onClick={() => setLevel(2)} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${level === 2 ? 'bg-white shadow-sm text-blue-600 dark:bg-gray-600 dark:text-gray-200' : 'text-gray-400'}`}>בינוני</button>
                        <button onClick={() => setLevel(3)} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${level === 3 ? 'bg-white shadow-sm text-blue-600 dark:bg-gray-600 dark:text-gray-200' : 'text-gray-400'}`}>מיתולוגי</button>
                    </div>
                </div>

                <div className="flex justify-around items-center">
                    <div className={`flex flex-col items-center p-2 rounded-lg min-w-[80px] ${isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <Footprints size={14} className="ml-1" />
                            צעדים
                        </div>
                        <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{moves}</span>
                    </div>

                    <div className={`flex flex-col items-center p-2 rounded-lg min-w-[80px] ${isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <Trophy size={14} className="ml-1 text-yellow-500" />
                            ניקוד
                        </div>
                        <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{score}</span>
                    </div>

                    <button onClick={startGame} className={`p-3 rounded-full transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
                        <RotateCcw size={18} color={isDarkMode ? 'red' : 'black'} />
                    </button>
                </div>
            </div>

            {/* Game Board */}
            <div className="flex-1 overflow-y-auto p-4 flex mt-4 al">
                <div className={`grid gap-3 max-w-4xl m-auto w-full ${getGridClass()}`} dir="ltr">
                    {cards.map((item, index) => (
                        <Card
                            key={`${item.id}-${index}`}
                            item={item}
                            isFlipped={isCardFlipped(index)}
                            onClick={() => handleCardClick(index)}
                            isDarkMode={isDarkMode}
                            disabled={flippedCards.length === 2}
                        />
                    ))}
                </div>
            </div>

            {/* Game Over Modal */}
            {isGameOver && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className={`w-full max-w-sm p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center transform scale-100 animate-bounce-in ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                        <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-6 shadow-inner dark:bg-yellow-900/30">
                            <Trophy size={48} className="text-yellow-500 drop-shadow-md" />
                        </div>

                        <h2 className="text-3xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
                            {level === 3 ? 'ניצחון אדיר!' : 'כל הכבוד!'}
                        </h2>
                        <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            סיימת את שלב {level}<br />
                            <span className="text-sm opacity-75">עם {moves} צעדים ו-{score} נקודות</span>
                        </p>

                        <div className="flex flex-col gap-3 w-full">
                            {level < 3 && (
                                <button onClick={handleNextLevel} className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center">
                                    <span>לשלב הבא</span>
                                    <ChevronLeft className="mr-2 rotate-180" />
                                </button>
                            )}
                            <button onClick={handleRestartGame} className={`w-full py-4 rounded-xl font-bold text-lg border-2 flex items-center justify-center active:scale-95 transition-transform ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50 text-gray-700'}`}>
                                <RotateCcw className="ml-2" size={20} />
                                {level < 3 ? 'התחל שוב' : 'משחק חדש'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemoryGame;
