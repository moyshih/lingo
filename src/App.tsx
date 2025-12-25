// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { Book, LogIn, Trophy, Home, User, Star, ChevronLeft, Check, X, Volume2, Award, Zap, BookOpen, Glasses, Filter, Library, FileText, Briefcase, Coffee, Globe, Cpu, HeartPulse, MessageCircle, Send, Sparkles, Loader2, Plus, RefreshCw, Settings, LogOut, Bell, Edit3, Medal, PenTool, Lightbulb, GraduationCap, Plane, Stethoscope, Microscope, Palette, Moon, Sun } from 'lucide-react';
import { /* initializeApp removed - use shared instance */ } from 'firebase/app';
import { signInAnonymously, signInWithCustomToken, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, signInWithRedirect, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot, collection } from 'firebase/firestore';
import firebaseApp, { auth as firebaseAuth } from './firebase';
import { MOCK_DB, ACHIEVEMENTS, CHAT_SCENARIOS } from './assets/mockData/mockData';

const ClickableWord = ({ word, translation, isActive, isHighlighted, onClick, onMouseEnter, onMouseLeave, isDarkMode }) => {
  return (
    <span className="relative inline-block mx-1 my-1">
      {isActive && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-20 shadow-lg animate-fade-in-up">
          {translation}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></span>
        </span>
      )}
      <span
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`cursor-pointer transition-all rounded px-1 -mx-1 select-none ${isHighlighted
          ? 'bg-blue-100 text-blue-700 font-semibold ring-2 ring-blue-100 ring-opacity-50'
          : isDarkMode ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-100 text-gray-700'
          }`}
      >
        {word}
      </span>
    </span>
  );
};

// --- View Components ---

const Navigation = ({ activeTab, setActiveTab, isDarkMode }) => (
  <div className={`fixed bottom-0 w-full border-t pb-safe flex justify-around items-center h-16 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transition-colors ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
    <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center p-2 transition-colors ${activeTab === 'home' ? 'text-blue-500' : isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}><Home size={24} /><span className="text-xs mt-1 font-medium">בית</span></button>
    <button onClick={() => setActiveTab('learn')} className={`flex flex-col items-center p-2 transition-colors ${activeTab === 'learn' || activeTab === 'abc' ? 'text-blue-500' : isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}><Book size={24} /><span className="text-xs mt-1 font-medium">לימוד</span></button>
    <button onClick={() => { setActiveTab('reading'); }} className={`flex flex-col items-center p-2 transition-colors ${activeTab === 'reading' ? 'text-blue-500' : isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}><BookOpen size={24} /><span className="text-xs mt-1 font-medium">קריאה</span></button>
    <button onClick={() => setActiveTab('chat')} className={`flex flex-col items-center p-2 transition-colors ${activeTab === 'chat' ? 'text-blue-500' : isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}><MessageCircle size={24} /><span className="text-xs mt-1 font-medium">צ'אט AI</span></button>
    <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center p-2 transition-colors ${activeTab === 'profile' ? 'text-blue-500' : isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}><User size={24} /><span className="text-xs mt-1 font-medium">פרופיל</span></button>
  </div>
);

const HomeView = ({ data, startLesson, dailyTip, isTipLoading, fetchDailyTip, isDarkMode }) => (
  <div className="p-6 space-y-6 pb-24 animate-fade-in">
    <header className="flex justify-between items-center">
      <div>
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>היי, {(data.user.name || '').split(/\s+/)[0]} 👋</h1>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>בוא נמשיך ללמוד!</p>
      </div>
      <div className={`flex items-center space-x-2 space-x-reverse px-3 py-1 rounded-full border ${isDarkMode ? 'bg-orange-900/30 border-orange-800 text-orange-400' : 'bg-orange-100 border-orange-200 text-orange-700'}`}>
        <Zap className="fill-current" size={18} />
        <span className="font-bold">{data.user.streak} ימים</span>
      </div>
    </header>

    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-white/10 transform rotate-12 -translate-y-1/2 translate-x-1/2"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg flex items-center">
            <Lightbulb size={20} className="ml-2 text-yellow-300" />
            טיפ יומי
          </h3>
          <button onClick={fetchDailyTip} className="p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors" disabled={isTipLoading}>
            <RefreshCw size={16} className={isTipLoading ? "animate-spin" : ""} />
          </button>
        </div>
        <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm text-sm leading-relaxed min-h-[60px]">
          {isTipLoading ? "מחפש טיפ מעניין..." : dailyTip}
        </div>
      </div>
    </div>

    {/* TODO: Fix Dark Mode */}
    <div className="space-y-3">
      <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>מומלץ עבורך</h2>
      <div onClick={() => startLesson(data.lessons[1])} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4 space-x-reverse active:scale-95 transition-transform cursor-pointer`}>
        <div className={`w-12 h-12 ${data.lessons[1].color || 'bg-gray-200'} rounded-full flex items-center justify-center text-2xl`}>{data.lessons[1].icon}</div>
        <div className="flex-1">
          <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{data.lessons[1].title}</h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}>10 מילים חדשות • 3 דקות</p>
        </div>
        <ChevronLeft className="text-gray-300 rotate-180" />
      </div>
    </div>

    <div className="space-y-3">
      <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>סטטיסטיקה</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-xl border flex flex-col items-center justify-center py-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <Award className="text-yellow-500 mb-2" size={32} />
          <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{data.user.xp}</span>
          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>XP צבור</span>
        </div>
        <div className={`p-4 rounded-xl border flex flex-col items-center justify-center py-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <Star className="text-purple-500 mb-2" size={32} />
          <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{data.user.level}</span>
          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>רמה נוכחית</span>
        </div>
      </div>
    </div>
  </div >
);

const LearnView = ({ data, startLesson, setActiveTab, setShowWritingModal, handleGenerateQuiz, isGeneratingQuiz, setShowGrammarModal, handleGenerateIdiom, isDarkMode }) => {
  const [quizTopic, setQuizTopic] = useState('');

  return (
    <div className="p-6 pb-24">
      <h1 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>מסלול הלימוד</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div onClick={() => setActiveTab('abc')} className="bg-gradient-to-br from-purple-600 to-indigo-700 p-4 rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform text-white h-20">
          <div className="text-4xl mb-1">🔤</div>
          <span className="font-bold text-sm">לוח אותיות</span>
        </div>
        <div onClick={() => setActiveTab('numbers')} className="bg-gradient-to-br from-yellow-600 to-amber-700 p-4 rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform text-white h-20">
          <div className="text-4xl mb-1">🔢</div>
          <span className="font-bold text-sm">לוח מספרים</span>
        </div>
        {/* <div onClick={() => setShowWritingModal(true)} className="bg-gradient-to-br from-blue-600 to-cyan-700 p-4 rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform text-white h-32">
          <div className="text-4xl mb-2">✍️</div>
          <span className="font-bold text-sm">מאמן כתיבה (AI)</span>
        </div>
        <div onClick={() => setShowGrammarModal(true)} className="bg-gradient-to-br from-teal-500 to-emerald-700 p-4 rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform text-white h-32">
          <div className="text-4xl mb-2">🔬</div>
          <span className="font-bold text-sm">מעבדת דקדוק (AI)</span>
        </div>
        <div onClick={handleGenerateIdiom} className="bg-gradient-to-br from-pink-600 to-rose-700 p-4 rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform text-white h-32">
          <div className="text-4xl mb-2">🎨</div>
          <span className="font-bold text-sm">ניב בהפתעה (AI)</span>
        </div> */}
      </div>

      {/* AI Quiz Generator */}
      {/* <div className={`p-5 rounded-2xl shadow-sm border mb-8 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <h3 className={`font-bold mb-3 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          <Sparkles className="text-yellow-500 ml-2" size={18} />
          חידון AI מהיר
        </h3>
        <div className="flex items-center space-x-2 space-x-reverse">
          <input
            type="text"
            value={quizTopic}
            onChange={(e) => setQuizTopic(e.target.value)}
            placeholder="נושא (למשל: ספורט, מוזיקה...)"
            className={`flex-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-800'}`}
          />
          <button
            onClick={() => handleGenerateQuiz(quizTopic)}
            disabled={isGeneratingQuiz || !quizTopic.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50 flex items-center"
          >
            {isGeneratingQuiz ? <Loader2 className="animate-spin" size={18} /> : 'צור'}
          </button>
        </div>
      </div> */}

      <div className="space-y-6 relative">
        <div className={`absolute top-4 bottom-4 right-[2.2rem] w-1 -z-10 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
        {data.lessons && data.lessons.length > 0 ? (
          data.lessons.map((lesson) => (
            <div key={lesson.id} className="flex items-center group" onClick={() => startLesson(lesson)}>
              <div className={`w-20 h-20 rounded-full border-b-4 flex items-center justify-center text-3xl cursor-pointer transition-transform active:translate-y-1 active:border-b-0 shadow-sm z-10 ${lesson.color || 'bg-gray-200'} text-white`}>
                {lesson.icon}
              </div>
              <div className={`mr-6 p-3 rounded-xl shadow-sm border flex-1 relative ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <div className={`absolute top-1/2 -right-2 w-4 h-4 border-t border-l transform rotate-45 -translate-y-1/2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}></div>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{lesson.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Star size={14} className="ml-1 text-yellow-400 fill-current" />
                  {lesson.id <= 2 ? 'פתוח ללמידה' : 'נעול'}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4 text-gray-500">טוען שיעורים...</div>
        )}
      </div>
    </div>
  );
};

const AbcView = ({ setActiveTab, isDarkMode }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [viewMode, setViewMode] = useState('both');

  const playSound = (letter) => {
    window.speechSynthesis.cancel();
    // Using lowercase forces the TTS to say the letter sound/name without "Capital"
    const textToSpeak = letter === 'Z' ? 'Zed' : letter.toLowerCase();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const getLetterText = (letter) => {
    if (viewMode === 'upper') return letter;
    if (viewMode === 'lower') return letter.toLowerCase();
    return `${letter}${letter.toLowerCase()}`;
  };

  return (
    <div className="p-6 pb-24 h-full flex flex-col">
      <div className={`flex flex-col space-y-4 mb-6 sticky top-0 z-10 py-2 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="flex items-center space-x-4 space-x-reverse">
          <button onClick={() => setActiveTab('learn')} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}>
            <ChevronLeft size={24} className="rotate-180" />
          </button>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>אותיות (ABC)</h1>
        </div>
        <div className={`p-1 rounded-xl flex self-center shadow-inner ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <button onClick={() => setViewMode('upper')} className={`px-4 py-1.5 text-sm rounded-lg transition-all ${viewMode === 'upper' ? 'bg-white text-blue-600 shadow-sm font-bold' : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>גדולות</button>
          <button onClick={() => setViewMode('both')} className={`px-4 py-1.5 text-sm rounded-lg transition-all ${viewMode === 'both' ? 'bg-white text-blue-600 shadow-sm font-bold' : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>שניהם</button>
          <button onClick={() => setViewMode('lower')} className={`px-4 py-1.5 text-sm rounded-lg transition-all ${viewMode === 'lower' ? 'bg-white text-blue-600 shadow-sm font-bold' : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>קטנות</button>
        </div>
        <p className="text-sm text-gray-500 text-center">לחצו על אות כדי לשמוע</p>
      </div>
      <div className="grid grid-cols-5 gap-3 overflow-y-auto pb-20 px-1 overlay-scrollbar" dir="ltr">
        {letters.map((letter) => (
          <button key={letter} onClick={() => playSound(letter)} className={`aspect-square rounded-xl shadow-sm border flex flex-col items-center justify-center active:scale-90 transition-all group ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-400'}`}>
            <span className={`${viewMode === 'lower' ? 'text-3xl transform -translate-y-1' : 'text-2xl'} font-bold group-hover:text-blue-600  ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{getLetterText(letter)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const NumberView = ({ setActiveTab, isDarkMode }) => {
  const ranges = [
    { label: '1-20', start: 1, end: 20 },
    { label: '21-60', start: 21, end: 60 },
    { label: '61-100', start: 61, end: 100 },
    { label: '101-140', start: 101, end: 140 },
    { label: '141-1000', start: 141, end: 1000 },
  ];

  const [rangeIndex, setRangeIndex] = useState(0);
  const range = ranges[rangeIndex];
  const numbers = Array.from({ length: range.end - range.start + 1 }, (_, i) => range.start + i);

  const playNumber = (n) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(n.toString());
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-6 pb-24 h-full flex flex-col">
      <div className={`flex flex-col space-y-4 mb-6 sticky top-0 z-10 py-2 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="flex items-center space-x-4 space-x-reverse">
          <button onClick={() => setActiveTab('learn')} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}>
            <ChevronLeft size={24} className="rotate-180" />
          </button>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>מספרים</h1>
        </div>

        <div className={`p-1 rounded-xl flex self-center shadow-inner ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          {ranges.map((r, idx) => (
            <button
              key={r.label}
              onClick={() => setRangeIndex(idx)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-all ${idx === rangeIndex ? 'bg-white text-blue-600 shadow-sm font-bold' : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {r.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 text-center">לחצו על מספר כדי לשמוע</p>
      </div>

      <div className="grid grid-cols-5 gap-3 overflow-y-auto pb-20 px-1 overlay-scrollbar" dir="ltr">
        {numbers.map((n) => (
          <button key={n} onClick={() => playNumber(n)}
            className={`aspect-square rounded-xl shadow-sm border flex flex-col items-center justify-center active:scale-90 transition-all group ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-400'}`}>
            <span className={`text-2xl font-bold group-hover:text-blue-600  ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{n}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const QuizView = ({ quizState, currentLesson, handleAnswer, nextQuestion, closeQuiz, finishQuiz, isDarkMode }) => {
  const speakWord = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  if (quizState.completed) {
    return (
      <div className={`h-full flex flex-col items-center justify-center p-8 text-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 animate-bounce ${isDarkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'}`}>
          <Trophy size={64} className="text-yellow-500" />
        </div>
        <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>כל הכבוד!</h2>
        <p className="text-gray-500 mb-8">סיימת את השיעור בהצלחה</p>
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className={`p-4 rounded-xl text-center ${isDarkMode ? 'bg-green-900/30' : 'bg-green-50'}`}>
            <span className="block text-2xl font-bold text-green-600">{quizState.score}/{currentLesson.words.length}</span>
            <span className="text-sm text-green-800">תשובות נכונות</span>
          </div>
          <div className={`p-4 rounded-xl text-center ${isDarkMode ? 'bg-orange-900/30' : 'bg-orange-50'}`}>
            <span className="block text-2xl font-bold text-orange-600">+{quizState.score * 10}</span>
            <span className="text-sm text-orange-800">XP</span>
          </div>
        </div>
        <button onClick={finishQuiz} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg active:bg-blue-700 transition-colors">
          סיום ושמירת התקדמות
        </button>
      </div>
    );
  }

  const currentWord = currentLesson.words[quizState.currentQuestionIndex];
  const progress = ((quizState.currentQuestionIndex) / currentLesson.words.length) * 100;

  return (
    <div className={`h-full flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`p-4 flex items-center space-x-4 space-x-reverse shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'} gap-4`}>
        <button onClick={closeQuiz} className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'} m-0`}>
          <X size={24} />
        </button>
        <div className={`flex-1 h-3 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <div className="flex-1 flex flex-col p-6 max-w-lg mx-auto w-full">
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h2 className="text-lg text-gray-500 mb-4">מה הפירוש של:</h2>
          <div className="flex items-center justify-center space-x-3 space-x-reverse mb-8 gap-4">
            <h1 className={`text-4xl font-bold border-b-2 border-dashed pb-2 ${isDarkMode ? 'text-white border-gray-600' : 'text-gray-800 border-gray-300'}`}>{currentWord.en}</h1>
            <button onClick={() => speakWord(currentWord.en)} className="p-2 bg-blue-100 rounded-full text-blue-500 hover:bg-blue-200 transition-colors active:scale-95">
              <Volume2 size={24} />
            </button>
          </div>
          <div className="w-full space-y-3">
            {(() => {
              const shuffleArray = (arr) => {
                const a = [...arr];
                for (let i = a.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [a[i], a[j]] = [a[j], a[i]];
                }
                return a;
              };

              const options = React.useMemo(() => {
                if (!currentWord || !currentWord.options) return [];
                return shuffleArray(currentWord.options);
              }, [currentWord, quizState.currentQuestionIndex]);

              return options.map((option, idx) => {
                const isSelected = quizState.selectedAnswer === option;
                let buttonStyle = isDarkMode
                  ? "bg-gray-800 border-2 border-gray-700 text-gray-200 hover:bg-gray-700"
                  : "bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50";

                if (quizState.showResult) {
                  if (option === currentWord.he) buttonStyle = isDarkMode ? "bg-green-900/30 border-green-600 text-green-400" : "bg-green-100 border-green-500 text-green-700";
                  else if (isSelected) buttonStyle = isDarkMode ? "bg-red-900/30 border-red-600 text-red-400" : "bg-red-100 border-red-500 text-red-700";
                  else buttonStyle = isDarkMode ? "opacity-50 border-gray-700" : "opacity-50 border-gray-100";
                } else if (isSelected) {
                  buttonStyle = "bg-blue-50 border-blue-500 text-blue-700";
                }
                return (
                  <button key={idx} disabled={quizState.showResult} onClick={() => handleAnswer(option)} className={`w-full p-4 rounded-xl text-lg font-medium transition-all ${buttonStyle} shadow-sm`}>
                    {option}
                  </button>
                );
              });
            })()}
          </div>
        </div>
      </div>
      <div className={`p-6 border-t ${!quizState.showResult
        ? (isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200')
        : quizState.isCorrect
          ? (isDarkMode ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-200')
          : (isDarkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200')
        }`}>
        {!quizState.showResult ? (
          <button disabled={true} className={`w-full py-4 rounded-xl font-bold text-lg cursor-not-allowed ${isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'}`}>
            בדוק תשובה
          </button>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${quizState.isCorrect ? (isDarkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-600') : (isDarkMode ? 'bg-red-800 text-red-200' : 'bg-red-100 text-red-600')}`}>
                {quizState.isCorrect ? <Check size={28} /> : <X size={28} />}
              </div>
              <div>
                <h3 className={`font-bold text-lg ${quizState.isCorrect ? (isDarkMode ? 'text-green-400' : 'text-green-800') : (isDarkMode ? 'text-red-400' : 'text-red-800')}`}>
                  {quizState.isCorrect ? 'מצוין!' : 'לא נורא'}
                </h3>
                {!quizState.isCorrect && <p className={`text-sm ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>התשובה הנכונה היא: {currentWord.he}</p>}
              </div>
            </div>
            <button onClick={nextQuestion} className={`px-8 py-3 rounded-xl font-bold text-white shadow-md transition-transform active:scale-95 ${quizState.isCorrect ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}>
              המשך
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ChatView = ({ chatMessages, chatInput, setChatInput, handleSendMessage, isChatLoading, handleResetChat, setChatMessages, handleTutorInitiate, isDarkMode }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleScenarioSelect = (scenario) => {
    setChatMessages([
      { role: 'user', text: `Let's roleplay: ${scenario.prompt}` },
      { role: 'model', text: `Sure! I'm ready. Let's start the roleplay as a ${scenario.title}.` }
    ]);
  };

  return (
    <div className="flex flex-col h-full pb-20">
      <div className={`p-4 shadow-sm sticky top-0 z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className={`text-xl font-bold flex items-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              <MessageCircle className="ml-2 text-blue-500" />
              מורה פרטי (AI)
            </h1>
            <p className="text-xs text-gray-500">תרגל אנגלית בשיחה חופשית</p>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={handleTutorInitiate}
              disabled={isChatLoading}
              className="flex items-center space-x-1 space-x-reverse bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold hover:shadow-md transition-all active:scale-95 disabled:opacity-50"
              title="בקש מהמורה להתחיל את השיחה"
            >
              <Sparkles size={14} />
              <span>המורה מתחיל</span>
            </button>
            <button onClick={handleResetChat} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} title="שיחה חדשה">
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        {/* Scenarios */}
        <div className="flex space-x-2 space-x-reverse overflow-x-auto pb-2 scrollbar-hide">
          {CHAT_SCENARIOS.map(scen => (
            <button
              key={scen.id}
              onClick={() => handleScenarioSelect(scen)}
              className={`flex items-center space-x-1 space-x-reverse px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap ${isDarkMode ? 'bg-gray-900 border-gray-700 text-blue-300 hover:bg-gray-800' : 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100'}`}
            >
              {scen.icon}
              <span>{scen.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" dir="ltr">
        {chatMessages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user'
              ? 'bg-blue-600 text-white rounded-tr-none'
              : isDarkMode
                ? 'bg-gray-800 border border-gray-700 text-gray-200 rounded-tl-none shadow-sm'
                : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
              }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isChatLoading && (
          <div className="flex justify-start">
            <div className={`border p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <Loader2 className="animate-spin text-blue-500" size={16} />
              <span className="text-xs text-gray-400">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className={`p-4 border-t ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center space-x-2 space-x-reverse">
          <input
            type="text"
            dir="ltr"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className={`flex-1 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-left ${isDarkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-800'}`}
          />
          <button
            onClick={handleSendMessage}
            disabled={isChatLoading || !chatInput.trim()}
            className="p-3 bg-blue-600 text-white rounded-full disabled:opacity-50 hover:bg-blue-700 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ReadingView = ({
  data,
  currentStory,
  setCurrentStory,
  readingType,
  setReadingType,
  readingLevelFilter,
  setReadingLevelFilter,
  readingCategoryFilter,
  setReadingCategoryFilter,
  isExplaining,
  handleExplainStory,
  explanation,
  isGeneratingStory,
  handleGenerateStory,
  showGenerateModal,
  setShowGenerateModal,
  genTopic,
  setGenTopic,
  genLevel,
  setGenLevel,
  setExplanation,
  isDarkMode
}) => {
  const [activeWordIndex, setActiveWordIndex] = useState(null);
  const [hoveredWordIndex, setHoveredWordIndex] = useState(null);

  useEffect(() => {
    setActiveWordIndex(null);
    setHoveredWordIndex(null);
    setExplanation(null);
  }, [currentStory, setExplanation]);

  const materials = data.readingMaterials || [];
  const levels = ['הכל', 'קל', 'בינוני', 'מתקדם'];
  const categories = ['הכל', ...new Set(materials.map(item => item.category))];

  const filteredStories = materials.filter(item => {
    const typeMatch = item.type === readingType;
    const levelMatch = readingLevelFilter === 'הכל' ? true : item.level === readingLevelFilter;
    const categoryMatch = readingCategoryFilter === 'הכל' ? true : item.category === readingCategoryFilter;
    return typeMatch && levelMatch && categoryMatch;
  });

  if (currentStory) {
    const isWordHighlighted = (index) => {
      if (activeWordIndex !== null) {
        if (activeWordIndex === index) return true;
        const activeItem = currentStory.content[activeWordIndex];
        const currentItem = currentStory.content[index];
        if (activeItem.phraseId && currentItem.phraseId && activeItem.phraseId === currentItem.phraseId) return true;
      }
      if (hoveredWordIndex !== null) {
        if (hoveredWordIndex === index) return true;
        const hoveredItem = currentStory.content[hoveredWordIndex];
        const currentItem = currentStory.content[index];
        if (hoveredItem.phraseId && currentItem.phraseId && hoveredItem.phraseId === currentItem.phraseId) return true;
      }
      return false;
    };

    const handleWordClick = (index) => {
      if (activeWordIndex === index) {
        setActiveWordIndex(null);
      } else {
        setActiveWordIndex(index);
      }
    };

    return (
      <div className="h-full flex flex-col pb-24" onClick={() => setActiveWordIndex(null)}>
        <div className={`p-4 shadow-sm flex items-center space-x-4 space-x-reverse sticky top-0 z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setCurrentStory(null)} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <ChevronLeft size={24} className={`rotate-180 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
          <div className="flex-1">
            <h2 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{currentStory.title}</h2>
            <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-500">
              <span>{currentStory.heTitle}</span>
              <span>•</span>
              <span>{currentStory.category}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">לחצו על מילה כדי לראות תרגום</p>
          </div>
          <button onClick={handleExplainStory} disabled={isExplaining} className={`flex items-center space-x-1 space-x-reverse px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${isDarkMode ? 'bg-purple-900/50 text-purple-300 hover:bg-purple-900' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}>
            {isExplaining ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
            <span>הסבר לי</span>
          </button>
        </div>
        <div className="p-6 max-w-2xl mx-auto w-full space-y-6">
          <div className={`rounded-2xl p-8 shadow-sm border min-h-[300px] ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-center mb-6">
              <Glasses size={32} className="text-blue-500 opacity-20" />
            </div>
            <p className={`text-2xl leading-relaxed text-center font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`} style={{ direction: 'ltr' }}>
              {currentStory.content.map((item, idx) => (
                <ClickableWord
                  key={idx}
                  word={item.w}
                  translation={item.t}
                  isActive={activeWordIndex === idx}
                  isHighlighted={isWordHighlighted(idx)}
                  onClick={() => handleWordClick(idx)}
                  onMouseEnter={() => setHoveredWordIndex(idx)}
                  onMouseLeave={() => setHoveredWordIndex(null)}
                  isDarkMode={isDarkMode}
                />
              ))}
            </p>
          </div>
          {explanation && (
            <div className={`p-6 rounded-2xl border animate-fade-in ${isDarkMode ? 'bg-purple-900/20 border-purple-800' : 'bg-purple-50 border-purple-100'}`}>
              <h3 className="text-purple-600 font-bold mb-2 flex items-center">
                <Sparkles size={16} className="ml-2" />
                הסבר וניתוח (Gemini AI)
              </h3>
              <div className={`text-sm whitespace-pre-wrap leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {explanation}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 pb-24">
      {/* Story Generation Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`rounded-2xl w-full max-w-md p-6 space-y-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center">
                <Sparkles size={20} className="ml-2 text-purple-600" />
                צור סיפור עם AI
              </h3>
              <button onClick={() => setShowGenerateModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>על מה הסיפור?</label>
                <input
                  type="text"
                  value={genTopic}
                  onChange={(e) => setGenTopic(e.target.value)}
                  placeholder="לדוגמה: דרקון שאהב פיצה..."
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>רמת קושי</label>
                <div className="flex space-x-2 space-x-reverse">
                  {['קל', 'בינוני', 'מתקדם'].map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => setGenLevel(lvl)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border ${genLevel === lvl ? 'bg-purple-600 text-white border-purple-600' : isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-white border-gray-200 text-gray-600'}`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerateStory}
              disabled={isGeneratingStory || !genTopic}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold flex items-center justify-center disabled:opacity-50 transition-colors"
            >
              {isGeneratingStory ? (
                <>
                  <Loader2 className="animate-spin ml-2" size={20} />
                  כותב סיפור...
                </>
              ) : (
                'צור סיפור קסום ✨'
              )}
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>ספרייה</h1>
        <button
          onClick={() => setShowGenerateModal(true)}
          className="flex items-center space-x-1 space-x-reverse bg-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-purple-700 shadow-md transition-colors"
        >
          <Plus size={16} />
          <span>צור סיפור</span>
        </button>
      </div>

      <div className={`p-1 rounded-xl flex mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <button onClick={() => setReadingType('passage')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center space-x-2 space-x-reverse ${readingType === 'passage' ? 'bg-white text-blue-600 shadow-sm' : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>
          <FileText size={16} />
          <span>קטעים קצרים</span>
        </button>
        <button onClick={() => setReadingType('story')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center space-x-2 space-x-reverse ${readingType === 'story' ? 'bg-white text-blue-600 shadow-sm' : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>
          <Library size={16} />
          <span>סיפורים</span>
        </button>
      </div>

      <div className="flex space-x-2 space-x-reverse mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {levels.map(level => (
          <button key={level} onClick={() => setReadingLevelFilter(level)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${readingLevelFilter === level ? 'bg-blue-600 text-white border-blue-600' : isDarkMode ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-white text-gray-600 border-gray-200'}`}>
            {level}
          </button>
        ))}
      </div>

      <div className="flex space-x-2 space-x-reverse mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button key={cat} onClick={() => setReadingCategoryFilter(cat)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border flex items-center space-x-2 space-x-reverse ${readingCategoryFilter === cat ? 'bg-orange-100 text-orange-700 border-orange-200' : isDarkMode ? 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700' : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'}`}>
            {cat === 'Work' && <Briefcase size={12} />}
            {cat === 'Social' && <Coffee size={12} />}
            {cat === 'Travel' && <Globe size={12} />}
            {cat === 'Science' && <Cpu size={12} />}
            {cat === 'Daily Life' && <HeartPulse size={12} />}
            {cat === 'Fantasy' && <Star size={12} />}
            {cat === 'Animals' && <Star size={12} />}
            {cat === 'Hobbies' && <Star size={12} />}
            {cat === 'AI Generated' && <Sparkles size={12} />}
            <span>{cat === 'Work' ? 'עבודה' : cat === 'Social' ? 'חברתי' : cat === 'Daily Life' ? 'חיי יום יום' : cat === 'Travel' ? 'נסיעות' : cat === 'Science' ? 'מדע' : cat === 'Fantasy' ? 'פנטזיה' : cat === 'Animals' ? 'חיות' : cat === 'Hobbies' ? 'תחביבים' : cat === 'AI Generated' ? 'נוצר ע"י AI' : cat}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredStories.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <p>לא נמצאו {readingType === 'passage' ? 'קטעים' : 'סיפורים'} בתצוגה זו.</p>
          </div>
        )}
        {filteredStories.map((story) => (
          <div
            key={story.id}
            onClick={() => setCurrentStory(story)}
            className={`p-5 rounded-xl border shadow-sm active:scale-[0.98] transition-all cursor-pointer flex items-center justify-between group ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}
          >
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-colors ${story.level === 'קל' ? (isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600') : story.level === 'בינוני' ? (isDarkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-600') : (isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600')}`}>
                {story.type === 'passage' ? <FileText size={20} /> : <BookOpen size={20} />}
              </div>
              <div>
                <h3 className={`font-bold text-lg group-hover:text-blue-600 transition-colors ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{story.title}</h3>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">{story.heTitle}</p>
                  <span className="text-xs text-gray-400 mt-1 flex items-center">
                    {story.category === 'AI Generated' && <Sparkles size={10} className="ml-1 text-purple-500" />}
                    {story.category}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-xs px-2 py-1 rounded-full font-medium mb-1 ${story.level === 'קל' ? (isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-700') : story.level === 'בינוני' ? (isDarkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-50 text-yellow-700') : (isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-700')}`}>
                {story.level}
              </span>
              <ChevronLeft className="text-gray-300 rotate-180 group-hover:text-blue-500" size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfileView = ({ data, updateUserData, handleGoogleLogin, auth, isDarkMode, toggleDarkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(data.user.name);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const avatarURL = data?.user?.photoURL || auth.currentUser?.photoURL || null;

  useEffect(() => {
    // reset image state when avatar source changes
    setImgError(false);
    setImgLoaded(false);
  }, [avatarURL]);

  // Check if guest (anonymous OR no email)
  const isGuest = auth.currentUser?.isAnonymous || !auth.currentUser?.email;

  const handleSaveProfile = () => {
    if (tempName.trim()) {
      updateUserData({
        ...data,
        user: { ...data.user, name: tempName }
      });
      setIsEditing(false);
    }
  };

  return (
    <div className="p-6 pb-24 h-full overflow-y-auto overlay-scrollbar">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>הפרופיל שלי</h1>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <Settings size={24} />
        </button>
      </div>

      {/* User Card */}
      <div className={`p-6 rounded-2xl shadow-sm border flex flex-col items-center mb-6 relative overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-500 to-blue-400 z-0"></div>
        <div className={`w-24 h-24 rounded-full p-1 z-10 mb-3 shadow-md relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            {avatarURL && !imgError ? (
              <img
                src={avatarURL}
                alt="Profile"
                className={`w-full h-full object-cover ${imgLoaded ? '' : 'opacity-0'}`}
                loading="lazy"
                decoding="async"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                onLoad={() => setImgLoaded(true)}
                onError={(e) => {
                  setImgError(true);
                  try {
                    e.currentTarget.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
                  } catch (err) { }
                }}
              />
            ) : (
              <User size={40} className="text-gray-400" />
            )}
            {/* show a simple placeholder while the image is loading */}
            {avatarURL && !imgLoaded && !imgError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              </div>
            )}
          </div>
          {/* <button onClick={() => setIsEditing(true)} className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full shadow-sm hover:bg-blue-600" title="ערוך שם משתמש">
            <Edit3 size={14} />
          </button> */}
        </div>

        {isEditing ? (
          <div className="z-10 flex flex-col items-center gap-2 w-full max-w-xs animate-fade-in">
            <label className="text-xs text-gray-500">שם משתמש:</label>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className={`w-full text-center text-lg font-bold border-b-2 border-blue-500 focus:outline-none bg-transparent ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
              autoFocus
            />
            <div className="flex gap-2 mt-2">
              <button onClick={handleSaveProfile} className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-sm">שמור</button>
              <button onClick={() => { setIsEditing(false); setTempName(data.user.name); }} className={`px-3 py-1 rounded-lg text-sm font-bold shadow-sm ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>ביטול</button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 z-10">
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{data.user.name}</h2>
              <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-blue-500">
                <Edit3 size={16} />
              </button>
            </div>
            <p className="text-gray-500 text-sm z-10 mt-1">רמה {data.user.level} • {isGuest ? 'אורח' : 'מחובר'}</p>
          </>
        )}
      </div>

      {/* Login Promo if Guest */}
      {isGuest && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-4 text-white shadow-lg mb-6 flex items-center justify-between">
          <div>
            <h3 className="font-bold">שמור את ההתקדמות שלך!</h3>
            <p className="text-xs text-indigo-100">התחבר כדי לא לאבד את הנתונים</p>
          </div>
          <button onClick={handleGoogleLogin} className="bg-white text-indigo-600 px-4 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-indigo-50 flex items-center gap-2">
            <LogIn size={16} />
            Google
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className={`p-4 rounded-xl border shadow-sm flex flex-col items-center ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <div className={`p-2 rounded-full mb-2 ${isDarkMode ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-600'}`}>
            <Zap size={20} />
          </div>
          <span className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{data.user.streak}</span>
          <span className="text-xs text-gray-500">ימי רצף</span>
        </div>
        <div className={`p-4 rounded-xl border shadow-sm flex flex-col items-center ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <div className={`p-2 rounded-full mb-2 ${isDarkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-600'}`}>
            <Award size={20} />
          </div>
          <span className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{data.user.xp}</span>
          <span className="text-xs text-gray-500">נקודות XP</span>
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-8">
        <h3 className={`font-bold text-lg mb-4 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          <Medal size={20} className="ml-2 text-purple-500" />
          הישגים
        </h3>
        <div className="space-y-3">
          {ACHIEVEMENTS.map(ach => (
            <div key={ach.id} className={`flex items-center p-3 rounded-xl border ${ach.unlocked ? (isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200') : (isDarkMode ? 'bg-gray-900 border-gray-800 opacity-60' : 'bg-gray-50 border-gray-100 opacity-60')}`}>
              <div className="text-2xl ml-4">{ach.icon}</div>
              <div className="flex-1">
                <h4 className={`font-bold text-sm ${ach.unlocked ? (isDarkMode ? 'text-gray-200' : 'text-gray-800') : 'text-gray-500'}`}>{ach.title}</h4>
                <p className="text-xs text-gray-400">{ach.desc}</p>
              </div>
              {ach.unlocked && <Check size={16} className="text-green-500" />}
            </div>
          ))}
        </div>
      </div>

      {/* Menu Options */}
      <div className="space-y-2">
        <button
          onClick={toggleDarkMode}
          className={`w-full p-4 rounded-xl border flex items-center justify-between active:scale-[0.99] transition-transform ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-700'}`}
        >
          <div className="flex items-center">
            {isDarkMode ? <Moon size={20} className="ml-3 text-blue-400" /> : <Sun size={20} className="ml-3 text-orange-400" />}
            <span>מצב לילה</span>
          </div>
          <div className={`w-10 h-6 rounded-full relative transition-colors ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}>
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isDarkMode ? 'left-1' : 'right-1'}`}></div>
          </div>
        </button>

        <button className={`w-full p-4 rounded-xl border flex items-center justify-between active:scale-[0.99] transition-transform ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-700'}`}>
          <div className="flex items-center">
            <Bell size={20} className="ml-3 text-gray-400" />
            <span>התראות</span>
          </div>
          <div className="w-10 h-6 bg-blue-500 rounded-full relative">
            <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </button>
        <button className={`w-full p-4 rounded-xl border flex items-center justify-between active:scale-[0.99] transition-transform ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-700'}`}>
          <div className="flex items-center">
            <Volume2 size={20} className="ml-3 text-gray-400" />
            <span>אפקטים קוליים</span>
          </div>
          <div className="w-10 h-6 bg-blue-500 rounded-full relative">
            <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </button>

        {/* Fallback Login Button in Menu */}
        {isGuest && (
          <button onClick={handleGoogleLogin} className={`w-full p-4 rounded-xl border flex items-center font-bold active:scale-[0.99] transition-transform ${isDarkMode ? 'bg-gray-800 border-gray-700 text-indigo-400' : 'bg-white border-gray-200 text-indigo-600'}`}>
            <LogIn size={20} className="ml-3" />
            <span>התחבר עם Google</span>
          </button>
        )}

        <button onClick={() => auth.signOut()} className={`w-full p-4 rounded-xl border flex items-center text-red-500 active:scale-[0.99] transition-transform mt-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <LogOut size={20} className="ml-3" />
          <span>{isGuest ? 'אפס נתונים (התנתק)' : 'התנתק'}</span>
        </button>
      </div>
    </div>
  );
};

// --- Grammar Lab Modal (New) ---

const GrammarLabModal = ({ isOpen, onClose }) => {
  const [sentence, setSentence] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleAnalyze = async () => {
    if (!sentence.trim()) return;
    setIsLoading(true);
    setAnalysis(null);
    try {
      const apiKey = "";
      const prompt = `
              Analyze this English sentence for a Hebrew speaker: "${sentence}"
              Return a JSON object with the following structure:
              {
                "isCorrect": boolean,
                "corrected": "The fully corrected sentence",
                "tense": "Grammatical tense",
                "explanation": "Hebrew explanation",
                "breakdown": [{"word": "word", "role": "POS", "hebrew": "trans"}],
                "diff": [
                  {"text": "segment text", "type": "neutral" | "removed" | "added"}
                ]
              }
              For 'diff', break the original and corrected sentences into segments to show changes.
              Example: Original "I has cat", Corrected "I have a cat"
              Diff: [
                {"text": "I", "type": "neutral"},
                {"text": "has", "type": "removed"},
                {"text": "have", "type": "added"},
                {"text": "a", "type": "added"},
                {"text": "cat", "type": "neutral"}
              ]
            `;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      const data = await response.json();
      const result = JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text);
      setAnalysis(result);
    } catch (e) {
      console.error(e);
      alert("שגיאה בניתוח המשפט");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto overlay-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <Microscope size={20} className="ml-2 text-teal-600" />
            מעבדת דקדוק
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">כתוב משפט באנגלית:</label>
            <textarea
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              placeholder="I goes to school yesterday..."
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none h-24 resize-none"
              dir="ltr"
            ></textarea>
          </div>
          <button
            onClick={handleAnalyze}
            disabled={isLoading || !sentence}
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold flex items-center justify-center disabled:opacity-50 transition-colors"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'נתח משפט 🔬'}
          </button>

          {analysis && (
            <div className="space-y-4 animate-fade-in">
              {/* Status Box */}
              <div className={`p-4 rounded-xl border ${analysis.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <h4 className={`font-bold mb-1 ${analysis.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {analysis.isCorrect ? 'משפט תקין! ✅' : 'נמצאו שגיאות ❌'}
                </h4>
              </div>

              {/* Correction/Diff Display (Outside the status box) */}
              {!analysis.isCorrect && (
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500 mb-2">תיקון:</p>
                  <div className="text-lg leading-relaxed" dir="ltr">
                    {analysis.diff && analysis.diff.map((item, idx) => (
                      <span key={idx} className={
                        item.type === 'removed' ? 'bg-red-100 text-red-700 line-through decoration-red-700 mx-0.5 px-1 rounded' :
                          item.type === 'added' ? 'bg-green-100 text-green-700 font-bold mx-0.5 px-1 rounded' :
                            ''
                      }>
                        {item.text}{' '}
                      </span>
                    ))}
                  </div>
                  {/* Clean Corrected Sentence Fallback */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-400 mb-1">המשפט המלא המתוקן:</p>
                    <p className="text-gray-800 font-medium" dir="ltr">{analysis.corrected}</p>
                  </div>
                </div>
              )}

              {/* Correct sentence handling if correct */}
              {analysis.isCorrect && (
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-lg text-gray-800 font-medium" dir="ltr">{analysis.corrected}</p>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-500 mb-1">זמן (Tense):</p>
                <p className="font-bold text-gray-800" dir="ltr">{analysis.tense}</p>
                <hr className="my-3 border-gray-200" />
                <p className="text-sm text-gray-700">{analysis.explanation}</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">ניתוח תחבירי:</h4>
                <div className="flex flex-wrap gap-2" dir="ltr">
                  {analysis.breakdown.map((item, idx) => (
                    <div key={idx} className="bg-teal-50 border border-teal-100 px-3 py-2 rounded-lg text-center min-w-[80px]">
                      <div className="font-bold text-teal-800">{item.word}</div>
                      <div className="text-xs text-teal-600">{item.role}</div>
                      <div className="text-xs text-gray-400">{item.hebrew}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Idiom Generator Modal (New) ---

const IdiomGeneratorModal = ({ isOpen, onClose }) => {
  const [idiom, setIdiom] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch idiom on open
  useEffect(() => {
    if (isOpen && !idiom) {
      fetchIdiom();
    }
  }, [isOpen]);

  const fetchIdiom = async () => {
    setIsLoading(true);
    try {
      const apiKey = "";
      const prompt = `
                Generate a random, useful English idiom.
                Return JSON:
                {
                    "idiom": "The idiom",
                    "meaning": "Meaning in Hebrew",
                    "example": "Example sentence in English",
                    "exampleTranslation": "Translation of the example sentence in Hebrew",
                    "origin": "Short origin story or fun fact in Hebrew"
                }
            `;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      const data = await response.json();
      const result = JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text);
      setIdiom(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-rose-500"></div>
        <button onClick={onClose} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        <div className="mt-4 mb-6">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Palette size={32} className="text-pink-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">ניב בהפתעה</h3>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin text-pink-500" size={32} />
          </div>
        ) : idiom ? (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-pink-600" dir="ltr">{idiom.idiom}</h2>
            <p className="text-lg text-gray-700 font-medium">{idiom.meaning}</p>

            <div className="bg-gray-50 p-3 rounded-xl text-left border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">דוגמה:</p>
              <p className="text-gray-800 italic dir-ltr mb-1" dir="ltr">"{idiom.example}"</p>
              <p className="text-gray-600 text-sm border-t border-gray-200 pt-1 mt-1">{idiom.exampleTranslation}</p>
            </div>

            <div className="text-xs text-gray-500 bg-yellow-50 p-2 rounded-lg border border-yellow-100">
              💡 {idiom.origin}
            </div>

            <button
              onClick={fetchIdiom}
              className="flex items-center justify-center w-full py-2 mt-4 text-pink-600 font-bold hover:bg-pink-50 rounded-lg transition-colors"
            >
              <RefreshCw size={16} className="ml-2" />
              ניב אחר
            </button>
          </div>
        ) : (
          <p>שגיאה בטעינת הנתונים</p>
        )}
      </div>
    </div>
  );
};

// --- Writing Coach Modal (Preserved) ---
const WritingCoachModal = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState('');
  const [userText, setUserText] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleCheckWriting = async () => {
    if (!userText.trim()) return;
    setIsLoading(true);
    setFeedback(null);

    try {
      const apiKey = "";
      const prompt = `
                Act as an English teacher for Hebrew speakers.
                I will give you a text written by a student on the topic: "${topic}".
                Analyze it. Return a JSON with:
                {
                    "score": number (1-10),
                    "feedback": "Hebrew explanation of mistakes and grammar tips",
                    "improved": "Better English version of the text"
                }
                Student Text: "${userText}"
             `;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      const data = await response.json();
      const result = JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text);
      setFeedback(result);

    } catch (error) {
      console.error(error);
      alert("Error analyzing text");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto overlay-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <PenTool size={20} className="ml-2 text-blue-500" />
            מאמן כתיבה
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {!feedback ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">נושא הכתיבה (אופציונלי)</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="לדוגמה: My favorite food..."
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">הטקסט שלך</label>
              <textarea
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                placeholder="כתוב כאן באנגלית..."
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-40 resize-none"
                dir="ltr"
              ></textarea>
            </div>
            <button
              onClick={handleCheckWriting}
              disabled={isLoading || !userText}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center disabled:opacity-50 transition-colors"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'בדוק את הכתיבה שלי ✨'}
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span className="font-bold text-gray-700">ציון:</span>
              <span className="text-2xl font-bold text-blue-600">{feedback.score}/10</span>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <h4 className="font-bold text-blue-800 mb-2">משוב ותיקונים:</h4>
              <p className="text-gray-700 text-sm whitespace-pre-wrap">{feedback.feedback}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <h4 className="font-bold text-green-800 mb-2">גרסה משופרת:</h4>
              <p className="text-gray-700 text-sm italic" dir="ltr">{feedback.improved}</p>
            </div>

            <button
              onClick={() => { setFeedback(null); setUserText(''); }}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-colors"
            >
              כתוב טקסט חדש
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


// --- Main App Component ---

const App = () => {
  // Firebase Auth State
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // App Data State
  const [data, setData] = useState(null); // Data loaded from Firebase
  const [isDarkMode, setIsDarkMode] = useState(true); // Global Dark Mode State

  // Use shared Firebase app/auth instance from `src/firebase.ts`
  const app = firebaseApp;
  const auth = firebaseAuth;
  const db = getFirestore(app);
  const appId = typeof import.meta.env.VITE_FIREBASE_PROJECT_ID !== 'undefined' ? import.meta.env.VITE_FIREBASE_PROJECT_ID : 'default-app-id';
  // Google Auth Provider
  const googleProvider = new GoogleAuthProvider();

  // --- Auth & Data Loading Effect ---
  useEffect(() => {
    // Ensure auth persistence is local so the user stays signed in across refreshes
    setPersistence(auth, browserLocalPersistence).catch((e) => console.warn('Failed to set persistence', e));

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- Firestore Data Sync Effect ---
  useEffect(() => {
    if (!user) return;

    const docRef = doc(db, 'artifacts', appId, 'users', user.uid, 'data', 'profile');

    const unsubscribeData = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        // MERGE: Ensure we combine existing data with INITIAL_DB to fill gaps
        const fetchedData = snapshot.data();
        setData({
          ...MOCK_DB,
          ...fetchedData,
          // Ensure arrays exist even if empty in fetched data
          lessons: fetchedData.lessons || MOCK_DB.lessons,
          readingMaterials: fetchedData.readingMaterials || MOCK_DB.readingMaterials,
          // Merge user but prefer stored values, then auth profile fields as fallback
          user: {
            ...MOCK_DB.user,
            ...fetchedData.user,
            name: (fetchedData.user && fetchedData.user.name) || (auth.currentUser?.displayName) || MOCK_DB.user.name,
            photoURL: (fetchedData.user && fetchedData.user.photoURL) || auth.currentUser?.photoURL || null,
            email: (fetchedData.user && fetchedData.user.email) || auth.currentUser?.email || null
          }
        });
      } else {
        // Initialize new user data if it doesn't exist
        const newData = { ...MOCK_DB, user: { ...MOCK_DB.user, name: user.displayName || "אורח", photoURL: user.photoURL || null, email: user.email || null } };
        setDoc(docRef, newData);
        setData(newData);
      }
    }, (error) => {
      console.error("Firestore error:", error);
    });

    return () => unsubscribeData();
  }, [user]);

  // When the user signs out, clear loaded user data so UI shows guest defaults
  useEffect(() => {
    if (!user) {

      const updatedData = {
        ...MOCK_DB,
        user: {
          ...MOCK_DB.user,
          xp: MOCK_DB.user.xp,
          streak: MOCK_DB.user.streak // Logic to increase streak could go here if checking dates
        }
      };

      setData(updatedData);
      setActiveTab('home');
    }
  }, [user]);

  // --- Helper to update State AND Firebase ---
  const updateUserData = async (newData) => {
    if (!user || !newData) return;
    setData(newData); // Optimistic UI update
    try {
      const docRef = doc(db, 'artifacts', appId, 'users', user.uid, 'data', 'profile');
      await setDoc(docRef, newData);
    } catch (e) {
      console.error("Error saving data:", e);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      const code = error?.code || '';
      const msg = error?.message || '';
      // If popup is blocked or COOP prevents popup messaging, fall back to redirect
      if (code === 'auth/popup-blocked' || msg.includes('Cross-Origin-Opener-Policy') || msg.includes('window.closed') || code === 'auth/cancelled-popup-request') {
        console.warn('Popup blocked or COOP issue; falling back to redirect auth.', error);
        try {
          await signInWithRedirect(auth, provider);
        } catch (redirErr) {
          console.error('Redirect sign-in failed', redirErr);
          alert('שגיאה בהתחברות עם גוגל (redirect) — בדוק הגדרות דפדפן ו-popups');
        }
      } else {
        console.error('Google sign in error', error);
        alert('שגיאה בהתחברות עם גוגל');
      }
    }
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    // Save preference if data exists
    if (data) {
      updateUserData({
        ...data,
        user: { ...data.user, darkMode: newMode }
      });
    }
  };

  // --- Existing State ---
  const [activeTab, setActiveTab] = useState('home');
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentStory, setCurrentStory] = useState(null);

  const [readingType, setReadingType] = useState('passage');
  const [readingLevelFilter, setReadingLevelFilter] = useState('הכל');
  const [readingCategoryFilter, setReadingCategoryFilter] = useState('הכל');

  const [chatMessages, setChatMessages] = useState([
    { role: 'model', text: 'Hello! I am your AI English tutor. How are you today?' }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatInput, setChatInput] = useState('');

  const [isExplaining, setIsExplaining] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [genTopic, setGenTopic] = useState('');
  const [genLevel, setGenLevel] = useState('קל');

  const [dailyTip, setDailyTip] = useState("Did you know? 'I am' is the shortest complete sentence in the English language.");
  const [isTipLoading, setIsTipLoading] = useState(false);

  const [showWritingModal, setShowWritingModal] = useState(false);
  const [showGrammarModal, setShowGrammarModal] = useState(false);
  const [showIdiomModal, setShowIdiomModal] = useState(false);

  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);

  const [quizState, setQuizState] = useState({
    active: false,
    currentQuestionIndex: 0,
    score: 0,
    showResult: false,
    selectedAnswer: null,
    isCorrect: null,
    completed: false
  });

  const fetchDailyTip = async () => {
    setIsTipLoading(true);
    try {
      const apiKey = "";
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Give me a short, interesting tip for learning English (grammar, vocabulary, or idiom) with Hebrew translation. Keep it under 20 words." }] }]
        })
      });
      const data = await response.json();
      const tip = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (tip) setDailyTip(tip);
    } catch (e) {
      console.error("Tip error", e);
    } finally {
      setIsTipLoading(false);
    }
  };

  const handleTutorInitiate = async () => {
    setIsChatLoading(true);
    try {
      const apiKey = "";
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: "You are an energetic English tutor. The student wants you to take the lead. Introduce a new, interesting random topic (like travel, movies, food, future technology, or hobbies) and ask the student a specific, engaging question about it to get them talking. Keep it friendly and concise." }] }
          ]
        })
      });
      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Let's talk! What is your favorite hobby?";
      setChatMessages(prev => [...prev, { role: 'model', text: reply }]);
    } catch (e) {
      console.error(e);
      setChatMessages(prev => [...prev, { role: 'model', text: "Error connecting to AI." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const apiKey = "";
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: "You are a helpful and patient English tutor for a Hebrew speaker. Correct their grammar gently if needed. Keep responses concise and encouraging." }] },
            ...chatMessages.map(m => ({ role: m.role === 'model' ? 'model' : 'user', parts: [{ text: m.text }] })),
            { role: "user", parts: [{ text: chatInput }] }
          ]
        })
      });
      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";
      setChatMessages(prev => [...prev, { role: 'model', text: reply }]);
    } catch (e) {
      console.error(e);
      setChatMessages(prev => [...prev, { role: 'model', text: "Error connecting to AI." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleResetChat = () => {
    setChatMessages([{ role: 'model', text: 'Hello! I am your AI English tutor. How are you today?' }]);
  };

  const handleExplainStory = async () => {
    if (!currentStory) return;
    setIsExplaining(true);
    setExplanation(null);

    const storyText = currentStory.content.map(c => c.w).join(' ');

    try {
      const apiKey = "";
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `Explain this story in Hebrew for an English learner. Summarize it briefly and list 3 key vocabulary words with translation. Return plain text.\n\nStory:\n${storyText}` }]
          }]
        })
      });
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Could not generate explanation.";
      setExplanation(text);
    } catch (e) {
      setExplanation("Error loading explanation.");
    } finally {
      setIsExplaining(false);
    }
  };

  const handleGenerateStory = async () => {
    if (!genTopic.trim()) return;
    setIsGeneratingStory(true);

    try {
      const apiKey = "";
      const prompt = `
        Create a short English story (5-6 sentences) about "${genTopic}" suitable for ${genLevel} level learners.
        
        Strictly return ONLY a valid JSON object with this structure (no markdown formatting):
        {
          "title": "Story Title",
          "heTitle": "Hebrew Title",
          "content": [
            { "w": "Word", "t": "Hebrew Translation", "phraseId": "optional_id_for_phrases" }
          ]
        }
        
        Rules for content:
        1. Split the text into individual words or punctuation marks.
        2. Provide Hebrew translation for EACH word in context.
        3. Identify phrasal verbs or common phrases (like "wake up", "thank you"). For these, give both words the SAME 'phraseId' and the SAME full meaning in 't'.
      `;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      const resData = await response.json();
      const generatedText = resData.candidates?.[0]?.content?.parts?.[0]?.text;

      if (generatedText) {
        const newStory = JSON.parse(generatedText);
        newStory.id = `gen_${Date.now()}`;
        newStory.level = genLevel;
        newStory.category = "AI Generated";
        newStory.type = 'story';

        // Update local state AND Firebase
        const updatedData = {
          ...data,
          readingMaterials: [newStory, ...data.readingMaterials]
        };
        updateUserData(updatedData);

        setShowGenerateModal(false);
        setCurrentStory(newStory);
        setGenTopic('');
      }
    } catch (e) {
      console.error("Failed to generate story", e);
      alert("שגיאה ביצירת הסיפור. אנא נסה שוב.");
    } finally {
      setIsGeneratingStory(false);
    }
  };

  const handleGenerateQuiz = async (topic) => {
    if (!topic.trim()) return;
    setIsGeneratingQuiz(true);
    try {
      const apiKey = "";
      const prompt = `
            Create a vocabulary quiz about "${topic}" for English learners.
            Generate 5 questions.
            Return ONLY a valid JSON object with this structure:
            {
                "id": "quiz_${Date.now()}",
                "title": "Quiz: ${topic}",
                "words": [
                    { "id": 1, "en": "Word to translate", "he": "Correct Hebrew Translation", "options": ["Wrong 1", "Correct Hebrew Translation", "Wrong 2", "Wrong 3"] }
                ]
            }
            Shuffle the correct answer in options.
        `;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      const data = await response.json();
      const generatedQuiz = JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text);

      startLesson(generatedQuiz);

    } catch (e) {
      console.error("Quiz gen error", e);
      alert("שגיאה ביצירת החידון");
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const startLesson = (lesson) => {
    setCurrentLesson(lesson);
    setQuizState({ active: true, currentQuestionIndex: 0, score: 0, showResult: false, selectedAnswer: null, isCorrect: null, completed: false });
    setActiveTab('quiz');
  };

  const handleAnswer = (answer) => {
    if (quizState.showResult) return;
    const currentWord = currentLesson.words[quizState.currentQuestionIndex];
    const isCorrect = answer === currentWord.he;
    setQuizState(prev => ({ ...prev, selectedAnswer: answer, isCorrect, showResult: true, score: isCorrect ? prev.score + 1 : prev.score }));
  };

  const nextQuestion = () => {
    if (quizState.currentQuestionIndex + 1 < currentLesson.words.length) {
      setQuizState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1, showResult: false, selectedAnswer: null, isCorrect: null }));
    } else {
      setQuizState(prev => ({ ...prev, completed: true }));
    }
  };

  const finishQuiz = () => {
    // Calculate XP and update Firebase
    const xpEarned = quizState.score * 10;
    const updatedData = {
      ...data,
      user: {
        ...data.user,
        xp: data.user.xp + xpEarned,
        streak: data.user.streak // Logic to increase streak could go here if checking dates
      }
    };
    updateUserData(updatedData);

    setQuizState(prev => ({ ...prev, active: false }));
    // setActiveTab('home'); // Go to home after finish to see XP
    setActiveTab('learn');
  };

  const closeQuiz = () => {
    setQuizState(prev => ({ ...prev, active: false }));
    setActiveTab('learn');
  };

  if (authLoading || (user && !data)) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
        <Loader2 className="animate-spin text-blue-500" size={48} />
        <p className="text-gray-500 animate-pulse">טוען את הפרופיל שלך מהענן...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans text-right transition-colors ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`} dir="rtl">
      {activeTab === 'home' && <HomeView data={data || MOCK_DB} startLesson={startLesson} dailyTip={dailyTip} isTipLoading={isTipLoading} fetchDailyTip={fetchDailyTip} isDarkMode={isDarkMode} />}
      {activeTab === 'learn' &&
        <LearnView
          data={data || MOCK_DB}
          startLesson={startLesson}
          setActiveTab={setActiveTab}
          setShowWritingModal={setShowWritingModal}
          setShowGrammarModal={setShowGrammarModal}
          handleGenerateIdiom={() => setShowIdiomModal(true)}
          handleGenerateQuiz={handleGenerateQuiz}
          isGeneratingQuiz={isGeneratingQuiz}
          isDarkMode={isDarkMode}

        />}
      {activeTab === 'abc' && <AbcView setActiveTab={setActiveTab} isDarkMode={isDarkMode} />}
      {activeTab === 'numbers' && <NumberView setActiveTab={setActiveTab} isDarkMode={isDarkMode} />}
      {activeTab === 'quiz' && <QuizView quizState={quizState} currentLesson={currentLesson} handleAnswer={handleAnswer} nextQuestion={nextQuestion} closeQuiz={closeQuiz} finishQuiz={finishQuiz} isDarkMode={isDarkMode} />}
      {activeTab === 'reading' && (
        <ReadingView
          data={data || MOCK_DB}
          currentStory={currentStory}
          setCurrentStory={setCurrentStory}
          readingType={readingType}
          setReadingType={setReadingType}
          readingLevelFilter={readingLevelFilter}
          setReadingLevelFilter={setReadingLevelFilter}
          readingCategoryFilter={readingCategoryFilter}
          setReadingCategoryFilter={setReadingCategoryFilter}
          isExplaining={isExplaining}
          handleExplainStory={handleExplainStory}
          explanation={explanation}
          setExplanation={setExplanation}
          isGeneratingStory={isGeneratingStory}
          handleGenerateStory={handleGenerateStory}
          showGenerateModal={showGenerateModal}
          setShowGenerateModal={setShowGenerateModal}
          genTopic={genTopic}
          setGenTopic={setGenTopic}
          genLevel={genLevel}
          setGenLevel={setGenLevel}
          isDarkMode={isDarkMode}
        />
      )}
      {activeTab === 'chat' && (
        <ChatView
          chatMessages={chatMessages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          handleSendMessage={handleSendMessage}
          isChatLoading={isChatLoading}
          handleResetChat={handleResetChat}
          setChatMessages={setChatMessages}
          handleTutorInitiate={handleTutorInitiate}
          isDarkMode={isDarkMode}
        />
      )}
      {activeTab === 'profile' && <ProfileView data={data || MOCK_DB} updateUserData={updateUserData} handleGoogleLogin={handleGoogleLogin} auth={auth} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}

      <WritingCoachModal isOpen={showWritingModal} onClose={() => setShowWritingModal(false)} />
      <GrammarLabModal isOpen={showGrammarModal} onClose={() => setShowGrammarModal(false)} />
      <IdiomGeneratorModal isOpen={showIdiomModal} onClose={() => setShowIdiomModal(false)} />

      {activeTab !== 'quiz' && <Navigation activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} />}
    </div>
  );
};

export default App;