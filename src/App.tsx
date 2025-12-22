// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { Book, Trophy, Home, User, Star, ChevronLeft, Check, X, Volume2, Award, Zap, BookOpen, Glasses, Filter, Library, FileText, Briefcase, Coffee, Globe, Cpu, HeartPulse, MessageCircle, Send, Sparkles, Loader2, Plus, RefreshCw, Settings, LogOut, Bell, Edit3, Medal, PenTool, Lightbulb, GraduationCap, Plane, Stethoscope, Microscope, Palette } from 'lucide-react';

// --- Data (Full Database Restored) ---
const MOCK_DB = {
  user: {
    name: "משתמש",
    xp: 1250,
    streak: 5,
    level: 3
  },
  lessons: [
    {
      id: 1,
      title: "יסודות",
      icon: "🌱",
      color: "bg-green-500",
      totalQuestions: 5,
      words: [
        { id: 1, en: "Hello", he: "שלום", options: ["שלום", "תודה", "להתראות", "בוקר"] },
        { id: 2, en: "Thank you", he: "תודה", options: ["סליחה", "בבקשה", "תודה", "כן"] },
        { id: 3, en: "Yes", he: "כן", options: ["לא", "כן", "אולי", "מחר"] },
        { id: 4, en: "No", he: "לא", options: ["כן", "תמיד", "לא", "לפעמים"] },
        { id: 5, en: "Good morning", he: "בוקר טוב", options: ["לילה טוב", "ערב טוב", "בוקר טוב", "יום טוב"] },
      ]
    },
    {
      id: 2,
      title: "אוכל ושתייה",
      icon: "🍎",
      color: "bg-orange-500",
      totalQuestions: 5,
      words: [
        { id: 6, en: "Apple", he: "תפוח", options: ["תפוז", "תפוח", "בננה", "אגס"] },
        { id: 7, en: "Water", he: "מים", options: ["לחם", "יין", "מים", "חלב"] },
        { id: 8, en: "Bread", he: "לחם", options: ["לחם", "חמאה", "גבינה", "ביצה"] },
        { id: 9, en: "Coffee", he: "קפה", options: ["תה", "מיץ", "קפה", "שוקו"] },
        { id: 10, en: "Chicken", he: "עוף", options: ["בקר", "דג", "עוף", "כבש"] },
      ]
    },
    {
      id: 3,
      title: "נסיעות",
      icon: "✈️",
      color: "bg-blue-500",
      totalQuestions: 5,
      words: [
        { id: 11, en: "Hotel", he: "מלון", options: ["בית", "מלון", "מסעדה", "חנות"] },
        { id: 12, en: "Ticket", he: "כרטיס", options: ["דרכון", "מזוודה", "כרטיס", "מפה"] },
      ]
    }
  ],
  readingMaterials: [
    // --- Work Category ---
    {
      id: "p_job_1",
      type: "passage",
      title: "Tell Me About Yourself",
      heTitle: "ספר לי על עצמך",
      level: "בינוני",
      category: "Work",
      content: [
        { w: "In", t: "ב" }, { w: "an", t: " " }, { w: "interview,", t: "ראיון," },
        { w: "this", t: "זו" }, { w: "is", t: "היא" }, { w: "a", t: " " },
        { w: "common", t: "שאלה נפוצה", phraseId: "common_question" },
        { w: "question.", t: "שאלה נפוצה", phraseId: "common_question" },
        { w: "You", t: "אתה" }, { w: "should", t: "צריך" },
        { w: "talk", t: "לדבר על", phraseId: "talk_about" },
        { w: "about", t: "לדבר על", phraseId: "talk_about" },
        { w: "your", t: "שלך" },
        { w: "experience", t: "ניסיון עבודה", phraseId: "work_exp" },
        { w: "and", t: "ו" }, { w: "skills.", t: "כישורים." },
        { w: "Keep", t: "שמור על זה", phraseId: "keep_it" },
        { w: "it", t: "שמור על זה", phraseId: "keep_it" },
        { w: "short", t: "קצר" }, { w: "and", t: "ו" }, { w: "professional.", t: "מקצועי." },
        { w: "I", t: "אני" }, { w: "graduated", t: "סיימתי לימודים" }, { w: "last", t: "שנה שעברה", phraseId: "last_year" }, { w: "year.", t: "שנה שעברה", phraseId: "last_year" },
        { w: "My", t: "שלי" }, { w: "passion", t: "תשוקה" }, { w: "is", t: "היא" }, { w: "building", t: "לבנות" }, { w: "software.", t: "תוכנה." }
      ]
    },
    {
      id: "p_job_2",
      type: "passage",
      title: "Coding Challenge",
      heTitle: "אתגר תכנות",
      level: "מתקדם",
      category: "Work",
      content: [
        { w: "The", t: "ה" }, { w: "interviewer", t: "מראיין" },
        { w: "asked", t: "ביקש ממני", phraseId: "asked_me" },
        { w: "me", t: "ביקש ממני", phraseId: "asked_me" },
        { w: "to", t: "ל" },
        { w: "solve", t: "לפתור בעיה", phraseId: "solve_prob" },
        { w: "a", t: "לפתור בעיה", phraseId: "solve_prob" },
        { w: "problem", t: "לפתור בעיה", phraseId: "solve_prob" },
        { w: "on", t: "על" }, { w: "the", t: "ה" }, { w: "whiteboard.", t: "לוח מחיק." },
        { w: "I", t: "אני" }, { w: "had", t: "הייתי צריך" }, { w: "to", t: "ל" },
        { w: "write", t: "לכתוב פונקציה", phraseId: "write_func" },
        { w: "a", t: "לכתוב פונקציה", phraseId: "write_func" },
        { w: "function", t: "לכתוב פונקציה", phraseId: "write_func" },
        { w: "in", t: "ב" }, { w: "Python.", t: "פייתון." },
        { w: "It", t: "זה" }, { w: "was", t: "היה" }, { w: "hard,", t: "קשה," }, { w: "but", t: "אבל" }, { w: "I", t: "אני" }, { w: "succeeded.", t: "הצלחתי." },
        { w: "I", t: "אני" }, { w: "tested", t: "בדקתי" }, { w: "the", t: "את" }, { w: "code", t: "הקוד" }, { w: "carefully.", t: "בזהירות." }
      ]
    },
    {
      id: "p_job_3",
      type: "passage",
      title: "Salary Expectations",
      heTitle: "ציפיות שכר",
      level: "מתקדם",
      category: "Work",
      content: [
        { w: "When", t: "כאשר" }, { w: "asked", t: "נשאלים" }, { w: "about", t: "לגבי" },
        { w: "salary", t: "ציפיות שכר", phraseId: "salary_exp" },
        { w: "expectations,", t: "ציפיות שכר", phraseId: "salary_exp" },
        { w: "it", t: "זה" }, { w: "is", t: "זה" }, { w: "important", t: "חשוב" }, { w: "to", t: "ל" },
        { w: "do", t: "לעשות מחקר", phraseId: "do_research" },
        { w: "research", t: "לעשות מחקר", phraseId: "do_research" },
        { w: "first.", t: "קודם." },
        { w: "Know", t: "דע" }, { w: "your", t: "שלך" }, { w: "worth", t: "שווי" }, { w: "in", t: "ב" }, { w: "the", t: "ה" }, { w: "market.", t: "שוק." },
        { w: "Also,", t: "כמו כן," }, { w: "consider", t: "שקול" }, { w: "the", t: "את" }, { w: "benefits.", t: "הטבות." },
        { w: "Be", t: "היה" }, { w: "confident", t: "בטוח בעצמך" }, { w: "when", t: "כש" }, { w: "you", t: "אתה" }, { w: "negotiate.", t: "מנהל מו״מ." }
      ]
    },
    {
      id: "p_job_4",
      type: "passage",
      title: "Team Work",
      heTitle: "עבודת צוות",
      level: "בינוני",
      category: "Work",
      content: [
        { w: "Companies", t: "חברות" }, { w: "look", t: "מחפשות", phraseId: "look_for" }, { w: "for", t: "מחפשות", phraseId: "look_for" },
        { w: "team", t: "שחקני קבוצה (אנשי צוות)", phraseId: "team_players" },
        { w: "players.", t: "שחקני קבוצה (אנשי צוות)", phraseId: "team_players" },
        { w: "They", t: "הם" }, { w: "want", t: "רוצים" }, { w: "someone", t: "מישהו" }, { w: "who", t: "ש" }, { w: "can", t: "יכול" },
        { w: "communicate", t: "לתקשר", phraseId: "communicate_well" },
        { w: "well", t: "היטב", phraseId: "communicate_well" },
        { w: "and", t: "ו" }, { w: "help", t: "לעזור" }, { w: "others.", t: "לאחרים." },
        { w: "Sharing", t: "שיתוף ידע", phraseId: "sharing_knowledge" },
        { w: "knowledge", t: "שיתוף ידע", phraseId: "sharing_knowledge" },
        { w: "is", t: "זה" }, { w: "vital.", t: "חיוני." }
      ]
    },
    {
      id: "p_job_5",
      type: "passage",
      title: "Remote Work",
      heTitle: "עבודה מרחוק",
      level: "בינוני",
      category: "Work",
      content: [
        { w: "Many", t: "הרבה" }, { w: "developers", t: "מפתחים" }, { w: "prefer", t: "מעדיפים" },
        { w: "remote", t: "עבודה מרחוק", phraseId: "remote_work" },
        { w: "work.", t: "עבודה מרחוק", phraseId: "remote_work" },
        { w: "It", t: "זה" }, { w: "saves", t: "חוסך" }, { w: "time", t: "זמן" }, { w: "on", t: "על" },
        { w: "commuting", t: "נסיעות לעבודה", phraseId: "commuting" },
        { w: "and", t: "ו" }, { w: "offers", t: "מציע" }, { w: "flexibility.", t: "גמישות." },
        { w: "I", t: "אני" }, { w: "have", t: "יש לי" }, { w: "a", t: "משרד ביתי", phraseId: "home_office" }, { w: "home", t: "משרד ביתי", phraseId: "home_office" }, { w: "office.", t: "משרד ביתי", phraseId: "home_office" },
        { w: "Good", t: "תקשורת טובה", phraseId: "good_comm" }, { w: "communication", t: "תקשורת טובה", phraseId: "good_comm" }, { w: "is", t: "היא" }, { w: "key.", t: "המפתח." }
      ]
    },
    {
      id: "p_job_why",
      type: "passage",
      title: "Why Here?",
      heTitle: "למה כאן?",
      level: "בינוני",
      category: "Work",
      content: [
        { w: "Why", t: "למה" }, { w: "do", t: "האם" }, { w: "you", t: "אתה" },
        { w: "want", t: "רוצה לעבוד", phraseId: "want_work" },
        { w: "to", t: "רוצה לעבוד", phraseId: "want_work" },
        { w: "work", t: "רוצה לעבוד", phraseId: "want_work" },
        { w: "here?", t: "כאן?" },
        { w: "I", t: "אני" }, { w: "admire", t: "מעריץ" }, { w: "your", t: "שלכם" },
        { w: "company's", t: "המשימה של החברה", phraseId: "comp_mission" },
        { w: "mission", t: "המשימה של החברה", phraseId: "comp_mission" },
        { w: "and", t: "ו" }, { w: "values.", t: "ערכים." },
        { w: "I", t: "אני" }, { w: "use", t: "משתמש ב" }, { w: "your", t: "שלכם" }, { w: "app", t: "אפליקציה" }, { w: "daily.", t: "מדי יום." }
      ]
    },
    {
      id: "p_job_weakness",
      type: "passage",
      title: "Greatest Weakness",
      heTitle: "חולשה הכי גדולה",
      level: "בינוני",
      category: "Work",
      content: [
        { w: "What", t: "מה" }, { w: "is", t: "היא" }, { w: "your", t: "שלך" },
        { w: "greatest", t: "החולשה הכי גדולה", phraseId: "great_weak" },
        { w: "weakness?", t: "החולשה הכי גדולה", phraseId: "great_weak" },
        { w: "Sometimes,", t: "לפעמים," }, { w: "I", t: "אני" },
        { w: "focus", t: "מתמקד יותר מדי", phraseId: "focus_too" },
        { w: "too", t: "מתמקד יותר מדי", phraseId: "focus_too" },
        { w: "much", t: "מתמקד יותר מדי", phraseId: "focus_too" },
        { w: "on", t: "על" }, { w: "small", t: "קטנים" }, { w: "details.", t: "פרטים." },
        { w: "However,", t: "למרות זאת," }, { w: "I", t: "אני" }, { w: "am", t: " " }, { w: "working", t: "עובד" }, { w: "on", t: "על" }, { w: "it.", t: "זה." }
      ]
    },
    {
      id: "p_job_conflict",
      type: "passage",
      title: "Handling Conflict",
      heTitle: "התמודדות עם קונפליקט",
      level: "מתקדם",
      category: "Work",
      content: [
        { w: "Tell", t: "ספר" }, { w: "me", t: "לי" }, { w: "about", t: "על" },
        { w: "a", t: " " }, { w: "time", t: "פעם" }, { w: "you", t: "שאתה" },
        { w: "had", t: "היה לך קונפליקט", phraseId: "had_conflict" },
        { w: "a", t: "היה לך קונפליקט", phraseId: "had_conflict" },
        { w: "conflict.", t: "היה לך קונפליקט", phraseId: "had_conflict" },
        { w: "I", t: "אני" }, { w: "listened", t: "הקשבתי" }, { w: "to", t: "ל" },
        { w: "my", t: "הקולגה שלי", phraseId: "my_colleague" },
        { w: "colleague's", t: "הקולגה שלי", phraseId: "my_colleague" },
        { w: "view", t: "דעה/השקפה" },
        { w: "and", t: "ו" }, { w: "we", t: "אנחנו" },
        { w: "found", t: "מצאנו פתרון", phraseId: "found_sol" },
        { w: "a", t: "מצאנו פתרון", phraseId: "found_sol" },
        { w: "solution.", t: "מצאנו פתרון", phraseId: "found_sol" },
        { w: "The", t: "ה" }, { w: "project", t: "פרויקט" }, { w: "was", t: "היה" }, { w: "a", t: "הצלחה", phraseId: "success" }, { w: "success.", t: "הצלחה", phraseId: "success" }
      ]
    },
    {
      id: "p_job_scrum",
      type: "passage",
      title: "Daily Stand-up",
      heTitle: "פגישת צוות יומית",
      level: "מתקדם",
      category: "Work",
      content: [
        { w: "Every", t: "כל" }, { w: "morning,", t: "בוקר," }, { w: "we", t: "אנחנו" },
        { w: "have", t: "עורכים פגישה", phraseId: "have_meet" },
        { w: "a", t: "עורכים פגישה", phraseId: "have_meet" },
        { w: "meeting.", t: "פגישה.", phraseId: "have_meet" },
        { w: "We", t: "אנחנו" },
        { w: "discuss", t: "דנים בהתקדמות", phraseId: "discuss_prog" },
        { w: "our", t: "דנים בהתקדמות", phraseId: "discuss_prog" },
        { w: "progress", t: "דנים בהתקדמות", phraseId: "discuss_prog" },
        { w: "and", t: "ו" },
        { w: "any", t: "כל בעיה", phraseId: "any_issues" },
        { w: "issues.", t: "כל בעיה", phraseId: "any_issues" },
        { w: "The", t: "ה" }, { w: "meeting", t: "פגישה" }, { w: "is", t: "היא" }, { w: "very", t: "מאוד" }, { w: "short.", t: "קצרה." }
      ]
    },
    {
      id: "p_job_goals",
      type: "passage",
      title: "Future Goals",
      heTitle: "מטרות לעתיד",
      level: "מתקדם",
      category: "Work",
      content: [
        { w: "Where", t: "איפה" }, { w: "do", t: "האם" }, { w: "you", t: "אתה" },
        { w: "see", t: "רואה את עצמך", phraseId: "see_yourself" },
        { w: "yourself", t: "רואה את עצמך", phraseId: "see_yourself" },
        { w: "in", t: "בעוד" }, { w: "five", t: "חמש" }, { w: "years?", t: "שנים?" },
        { w: "I", t: "אני" }, { w: "want", t: "רוצה" }, { w: "to", t: "ל" },
        { w: "lead", t: "להוביל צוות", phraseId: "lead_team" },
        { w: "a", t: "להוביל צוות", phraseId: "lead_team" },
        { w: "team", t: "להוביל צוות", phraseId: "lead_team" },
        { w: "of", t: "של" }, { w: "developers.", t: "מפתחים." },
        { w: "I", t: "אני" }, { w: "also", t: "גם" }, { w: "want", t: "רוצה" }, { w: "to", t: "ל" }, { w: "master", t: "לשלוט ב" }, { w: "React.", t: "ריאקט." }
      ]
    },
    {
      id: "p_job_deadline",
      type: "passage",
      title: "Tight Deadline",
      heTitle: "דדליין לחוץ",
      level: "בינוני",
      category: "Work",
      content: [
        { w: "The", t: "ה" }, { w: "project", t: "פרויקט" },
        { w: "deadline", t: "מועד הגשה (דדליין)", phraseId: "deadline" },
        { w: "is", t: "הוא" }, { w: "tomorrow.", t: "מחר." },
        { w: "We", t: "אנחנו" }, { w: "must", t: "חייבים" },
        { w: "work", t: "לעבוד מהר", phraseId: "work_fast" },
        { w: "fast", t: "לעבוד מהר", phraseId: "work_fast" },
        { w: "to", t: "כדי" }, { w: "finish.", t: "לסיים." },
        { w: "We", t: "אנחנו" }, { w: "ordered", t: "הזמנו" }, { w: "pizza", t: "פיצה" }, { w: "and", t: "ו" }, { w: "stayed", t: "נשארנו" }, { w: "late.", t: "מאוחר." }
      ]
    },

    // --- Social Category ---
    {
      id: "p_friends_1",
      type: "passage",
      title: "Weekend Plans",
      heTitle: "תוכניות לסופ\"ש",
      level: "קל",
      category: "Social",
      content: [
        { w: "Hey", t: "היי" }, { w: "Dan,", t: "דן," },
        { w: "what", t: "מה אתה עושה?", phraseId: "what_doing" },
        { w: "are", t: "מה אתה עושה?", phraseId: "what_doing" },
        { w: "you", t: "מה אתה עושה?", phraseId: "what_doing" },
        { w: "doing", t: "מה אתה עושה?", phraseId: "what_doing" },
        { w: "this", t: "הזה" }, { w: "weekend?", t: "סופ\"ש?" },
        { w: "I", t: "אני" }, { w: "am", t: " " },
        { w: "going", t: "הולך לים", phraseId: "going_beach" },
        { w: "to", t: "הולך לים", phraseId: "going_beach" },
        { w: "the", t: "הולך לים", phraseId: "going_beach" },
        { w: "beach.", t: "הולך לים", phraseId: "going_beach" },
        { w: "Do", t: "האם" }, { w: "you", t: "אתה" },
        { w: "want", t: "רוצה לבוא?", phraseId: "want_come" },
        { w: "to", t: "רוצה לבוא?", phraseId: "want_come" },
        { w: "come?", t: "רוצה לבוא?", phraseId: "want_come" },
        { w: "The", t: "מזג האוויר", phraseId: "weather" }, { w: "weather", t: "מזג האוויר", phraseId: "weather" }, { w: "will", t: "יהיה" }, { w: "be", t: "יהיה" }, { w: "sunny.", t: "שמשי." }
      ]
    },
    {
      id: "p_friends_2",
      type: "passage",
      title: "Movie Night",
      heTitle: "ערב סרט",
      level: "קל",
      category: "Social",
      content: [
        { w: "Let's", t: "בוא" },
        { w: "watch", t: "נצפה בסרט", phraseId: "watch_movie" },
        { w: "a", t: "נצפה בסרט", phraseId: "watch_movie" },
        { w: "movie", t: "נצפה בסרט", phraseId: "watch_movie" },
        { w: "tonight.", t: "הערב." },
        { w: "I", t: "אני" }, { w: "have", t: "יש לי" }, { w: "popcorn", t: "פופקורן" }, { w: "and", t: "ו" }, { w: "drinks.", t: "שתייה." },
        { w: "Which", t: "איזה" }, { w: "movie", t: "סרט" }, { w: "do", t: "האם" }, { w: "you", t: "אתה" }, { w: "prefer,", t: "מעדיף," },
        { w: "action", t: "אקשן או קומדיה?", phraseId: "act_or_com" },
        { w: "or", t: "אקשן או קומדיה?", phraseId: "act_or_com" },
        { w: "comedy?", t: "אקשן או קומדיה?", phraseId: "act_or_com" }
      ]
    },
    {
      id: "p_friends_3",
      type: "passage",
      title: "New Phone",
      heTitle: "טלפון חדש",
      level: "בינוני",
      category: "Social",
      content: [
        { w: "Look", t: "תראה" }, { w: "at", t: "את" }, { w: "my", t: "שלי" },
        { w: "new", t: "טלפון חדש", phraseId: "new_phone" },
        { w: "phone!", t: "טלפון חדש", phraseId: "new_phone" },
        { w: "It", t: "יש לו" }, { w: "has", t: "יש לו" },
        { w: "an", t: "מצלמה מדהימה", phraseId: "amazing_cam" },
        { w: "amazing", t: "מצלמה מדהימה", phraseId: "amazing_cam" },
        { w: "camera.", t: "מצלמה מדהימה", phraseId: "amazing_cam" },
        { w: "I", t: "אני" }, { w: "can", t: "יכול" },
        { w: "take", t: "לצלם תמונות", phraseId: "take_photos" },
        { w: "great", t: "נהדרות" },
        { w: "photos", t: "לצלם תמונות", phraseId: "take_photos" },
        { w: "now.", t: "עכשיו." },
        { w: "It", t: "הוא" }, { w: "was", t: "היה" }, { w: "very", t: "מאוד" }, { w: "expensive,", t: "יקר," }, { w: "but", t: "אבל" }, { w: "worth", t: "שווה" }, { w: "it.", t: "את זה." }
      ]
    },
    {
      id: "p_friends_4",
      type: "passage",
      title: "Running Late",
      heTitle: "מאחר",
      level: "בינוני",
      category: "Social",
      content: [
        { w: "Sorry,", t: "מצטער," }, { w: "I", t: "אני" }, { w: "am", t: " " },
        { w: "running", t: "מאחר", phraseId: "running_late" },
        { w: "late.", t: "מאחר", phraseId: "running_late" },
        { w: "The", t: "ה" },
        { w: "traffic", t: "התנועה (פקקים)", phraseId: "traffic" },
        { w: "is", t: "היא" }, { w: "terrible.", t: "נוראית." },
        { w: "Please", t: "בבקשה" },
        { w: "wait", t: "חכה לי", phraseId: "wait_for_me" },
        { w: "for", t: "חכה לי", phraseId: "wait_for_me" },
        { w: "me.", t: "חכה לי", phraseId: "wait_for_me" },
        { w: "I", t: "אני" }, { w: "will", t: "אני (עתיד)" }, { w: "be", t: "אהיה" }, { w: "there", t: "שם" }, { w: "in", t: "בעוד" }, { w: "ten", t: "עשר" }, { w: "minutes.", t: "דקות." }
      ]
    },
    {
      id: "p_social_concert",
      type: "passage",
      title: "Concert Tickets",
      heTitle: "כרטיסים להופעה",
      level: "קל",
      category: "Social",
      content: [
        { w: "I", t: "אני" }, { w: "bought", t: "קניתי" },
        { w: "tickets", t: "כרטיסים להופעה", phraseId: "concert_tix" },
        { w: "to", t: "כרטיסים להופעה", phraseId: "concert_tix" },
        { w: "the", t: "כרטיסים להופעה", phraseId: "concert_tix" },
        { w: "concert.", t: "כרטיסים להופעה", phraseId: "concert_tix" },
        { w: "My", t: "שלי" }, { w: "favorite", t: "אהובה" }, { w: "band", t: "להקה" },
        { w: "is", t: "היא" },
        { w: "playing", t: "מנגנת הערב", phraseId: "playing_tonight" },
        { w: "tonight.", t: "מנגנת הערב", phraseId: "playing_tonight" },
        { w: "The", t: "ה" }, { w: "venue", t: "אולם/מקום" }, { w: "is", t: "הוא" }, { w: "huge.", t: "ענק." },
        { w: "I", t: "אני" }, { w: "am", t: "אני" }, { w: "so", t: "כל כך" }, { w: "excited.", t: "מתרגש." }
      ]
    },
    {
      id: "p_social_pizza",
      type: "passage",
      title: "Ordering Food",
      heTitle: "מזמינים אוכל",
      level: "קל",
      category: "Social",
      content: [
        { w: "I", t: "אני" }, { w: "am", t: " " }, { w: "hungry.", t: "רעב." },
        { w: "Let's", t: "בוא" },
        { w: "order", t: "נזמין פיצה", phraseId: "order_pizza" },
        { w: "pizza.", t: "נזמין פיצה", phraseId: "order_pizza" },
        { w: "I", t: "אני" }, { w: "want", t: "רוצה" },
        { w: "extra", t: "תוספת גבינה", phraseId: "extra_cheese" },
        { w: "cheese", t: "תוספת גבינה", phraseId: "extra_cheese" },
        { w: "on", t: "על" }, { w: "mine.", t: "שלי." },
        { w: "Do", t: "האם" }, { w: "you", t: "אתה" }, { w: "want", t: "רוצה" }, { w: "soda?", t: "שתייה קלה?" },
        { w: "Delivery", t: "משלוח", phraseId: "delivery_time" }, { w: "takes", t: "לוקח", phraseId: "delivery_time" }, { w: "thirty", t: "שלושים", phraseId: "delivery_time" }, { w: "minutes.", t: "דקות.", phraseId: "delivery_time" }
      ]
    },
    {
      id: "p_social_hobbies",
      type: "passage",
      title: "Music Hobbies",
      heTitle: "תחביבי מוזיקה",
      level: "קל",
      category: "Social",
      content: [
        { w: "Do", t: "האם" }, { w: "you", t: "אתה" },
        { w: "play", t: "מנגן על כלי כלשהו?", phraseId: "play_inst" },
        { w: "any", t: "מנגן על כלי כלשהו?", phraseId: "play_inst" },
        { w: "instruments?", t: "מנגן על כלי כלשהו?", phraseId: "play_inst" },
        { w: "Yes,", t: "כן," }, { w: "I", t: "אני" },
        { w: "play", t: "מנגן בגיטרה", phraseId: "play_guitar" },
        { w: "the", t: "מנגן בגיטרה", phraseId: "play_guitar" },
        { w: "guitar.", t: "מנגן בגיטרה", phraseId: "play_guitar" },
        { w: "I", t: "אני" }, { w: "practice", t: "מתאמן" }, { w: "every", t: "כל" }, { w: "day.", t: "יום." },
        { w: "Music", t: "מוזיקה" }, { w: "relaxes", t: "מרגיעה" }, { w: "me.", t: "אותי." }
      ]
    },
    {
      id: "p_social_bad_date",
      type: "passage",
      title: "A Bad Date",
      heTitle: "דייט גרוע",
      level: "בינוני",
      category: "Social",
      content: [
        { w: "I", t: "אני" }, { w: "went", t: "הלכתי" }, { w: "on", t: "ל" },
        { w: "a", t: "דייט נורא", phraseId: "terrible_date" },
        { w: "terrible", t: "דייט נורא", phraseId: "terrible_date" },
        { w: "date.", t: "דייט נורא", phraseId: "terrible_date" },
        { w: "He", t: "הוא" },
        { w: "talked", t: "דיבר רק", phraseId: "talked_only" },
        { w: "only", t: "דיבר רק", phraseId: "talked_only" },
        { w: "about", t: "על" }, { w: "himself", t: "עצמו" },
        { w: "all", t: "כל" }, { w: "night.", t: "הערב." },
        { w: "I", t: "אני" }, { w: "said", t: "אמרתי" }, { w: "I", t: "שאני" }, { w: "was", t: "הייתי" }, { w: "tired.", t: "עייפה." },
        { w: "I", t: "אני" }, { w: "went", t: "הלכתי" }, { w: "home", t: "הביתה" }, { w: "early.", t: "מוקדם." }
      ]
    },
    {
      id: "p_social_moving",
      type: "passage",
      title: "Moving House",
      heTitle: "עוברים דירה",
      level: "בינוני",
      category: "Social",
      content: [
        { w: "I", t: "אני" }, { w: "am", t: " " },
        { w: "moving", t: "עובר ל...", phraseId: "moving_to" },
        { w: "to", t: "עובר ל...", phraseId: "moving_to" },
        { w: "a", t: "דירה חדשה", phraseId: "new_apt" },
        { w: "new", t: "דירה חדשה", phraseId: "new_apt" },
        { w: "apartment.", t: "דירה חדשה", phraseId: "new_apt" },
        { w: "Can", t: "יכול" }, { w: "you", t: "אתה" },
        { w: "help", t: "לעזור לי", phraseId: "help_me" },
        { w: "me", t: "לעזור לי", phraseId: "help_me" },
        { w: "with", t: "עם" }, { w: "the", t: "ה" }, { w: "boxes?", t: "קופסאות?" },
        { w: "The", t: "ה" }, { w: "sofa", t: "ספה" }, { w: "is", t: "היא" }, { w: "very", t: "מאוד" }, { w: "heavy.", t: "כבדה." },
        { w: "I", t: "אני" }, { w: "will", t: "אני (עתיד)" }, { w: "buy", t: "אקנה" }, { w: "you", t: "לך" }, { w: "lunch.", t: "ארוחת צהריים." }
      ]
    },
    {
      id: "p_social_gym",
      type: "passage",
      title: "Gym Buddy",
      heTitle: "שותף לאימון",
      level: "קל",
      category: "Social",
      content: [
        { w: "Do", t: "האם" }, { w: "you", t: "אתה" }, { w: "want", t: "רוצה" }, { w: "to", t: "ל" },
        { w: "go", t: "ללכת לחדר כושר", phraseId: "go_gym" },
        { w: "to", t: "ללכת לחדר כושר", phraseId: "go_gym" },
        { w: "the", t: "ללכת לחדר כושר", phraseId: "go_gym" },
        { w: "gym?", t: "ללכת לחדר כושר", phraseId: "go_gym" },
        { w: "I", t: "אני" }, { w: "need", t: "צריך" }, { w: "to", t: "ל" }, { w: "exercise.", t: "להתעמל." },
        { w: "We", t: "אנחנו" }, { w: "can", t: "יכולים" }, { w: "motivate", t: "להמריץ/לעודד" }, { w: "each", t: "זה את זה", phraseId: "each_other_g" }, { w: "other.", t: "זה את זה", phraseId: "each_other_g" },
        { w: "Let's", t: "בוא" }, { w: "meet", t: "ניפגש" }, { w: "at", t: "ב" }, { w: "six.", t: "שש." }
      ]
    },

    // --- Daily Life Category ---
    {
      id: "p101",
      type: "passage",
      title: "My Morning Routine",
      heTitle: "שגרת הבוקר שלי",
      level: "קל",
      category: "Daily Life",
      content: [
        { w: "Every", t: "כל" }, { w: "day,", t: "יום," },
        { w: "I", t: "אני" },
        { w: "wake", t: "מתעורר (ביטוי)", phraseId: "wake_up_1" },
        { w: "up", t: "מתעורר (ביטוי)", phraseId: "wake_up_1" },
        { w: "at", t: "ב" },
        { w: "seven", t: "השעה שבע", phraseId: "seven_oclock_1" },
        { w: "o'clock.", t: "השעה שבע", phraseId: "seven_oclock_1" },
        { w: "The", t: "ה" }, { w: "sun", t: "שמש" }, { w: "is", t: "היא/ישנה" }, { w: "usually", t: "בדרך כלל" }, { w: "bright.", t: "זורחת/בהירה." },
        { w: "I", t: "אני" }, { w: "eat", t: "אוכל" },
        { w: "breakfast", t: "ארוחת בוקר" },
        { w: "with", t: "עם" },
        { w: "my", t: "המשפחה שלי", phraseId: "my_family_1" },
        { w: "family.", t: "המשפחה שלי", phraseId: "my_family_1" },
        { w: "Then,", t: "אז," }, { w: "I", t: "אני" }, { w: "get", t: "מתלבש", phraseId: "get_dressed" }, { w: "dressed", t: "מתלבש", phraseId: "get_dressed" }, { w: "quickly.", t: "מהר." },
        { w: "My", t: "שלי" }, { w: "bus", t: "אוטובוס" }, { w: "arrives", t: "מגיע" }, { w: "at", t: "ב" }, { w: "eight.", t: "שמונה." }
      ]
    },
    {
      id: "p102",
      type: "passage",
      title: "The Little Dog",
      heTitle: "הכלב הקטן",
      level: "קל",
      category: "Animals",
      content: [
        { w: "This", t: "זה" }, { w: "is", t: "הוא/הינו" }, { w: "Max.", t: "מקס." },
        { w: "Max", t: "מקס" }, { w: "is", t: "הוא/הינו" },
        { w: "a", t: "כלב קטן", phraseId: "small_dog" },
        { w: "small", t: "כלב קטן", phraseId: "small_dog" },
        { w: "dog.", t: "כלב קטן", phraseId: "small_dog" },
        { w: "He", t: "הוא" }, { w: "likes", t: "אוהב" }, { w: "to", t: "ל" }, { w: "play", t: "לשחק" }, { w: "in", t: "ב" }, { w: "the", t: "ה" }, { w: "park.", t: "פארק." },
        { w: "He", t: "הוא" }, { w: "barks", t: "נובח על", phraseId: "barks_at" }, { w: "at", t: "נובח על", phraseId: "barks_at" }, { w: "the", t: "ה" }, { w: "mailman.", t: "דוור." },
        { w: "We", t: "אנחנו" }, { w: "walk", t: "מטיילים איתו", phraseId: "walk_him" }, { w: "him", t: "מטיילים איתו", phraseId: "walk_him" }, { w: "twice", t: "פעמיים" }, { w: "a", t: "ב" }, { w: "day.", t: "יום." }
      ]
    },
    {
      id: "p103",
      type: "passage",
      title: "My Blue Bike",
      heTitle: "האופניים הכחולים שלי",
      level: "קל",
      category: "Hobbies",
      content: [
        { w: "I", t: "אני" }, { w: "have", t: "יש לי" },
        { w: "a", t: "אופניים כחולים", phraseId: "blue_bike" },
        { w: "blue", t: "אופניים כחולים", phraseId: "blue_bike" },
        { w: "bike.", t: "אופניים כחולים", phraseId: "blue_bike" },
        { w: "I", t: "אני" },
        { w: "ride", t: "רוכב עליהם", phraseId: "ride_it" },
        { w: "it", t: "רוכב עליהם", phraseId: "ride_it" },
        { w: "in", t: "ב" }, { w: "the", t: "ה" }, { w: "park", t: "פארק" },
        { w: "after", t: "אחרי בית ספר", phraseId: "after_school" },
        { w: "school.", t: "אחרי בית ספר", phraseId: "after_school" },
        { w: "I", t: "אני" }, { w: "always", t: "תמיד" }, { w: "wear", t: "חובש" }, { w: "a", t: "קסדה", phraseId: "helmet" }, { w: "helmet.", t: "קסדה", phraseId: "helmet" },
        { w: "Safety", t: "בטיחות" }, { w: "is", t: "היא" }, { w: "important.", t: "חשובה." }
      ]
    },
    {
      id: "p_daily_doctor",
      type: "passage",
      title: "At the Doctor",
      heTitle: "אצל הרופא",
      level: "בינוני",
      category: "Daily Life",
      content: [
        { w: "I", t: "אני" }, { w: "have", t: "יש לי" },
        { w: "a", t: "כאב ראש", phraseId: "headache" },
        { w: "headache.", t: "כאב ראש", phraseId: "headache" },
        { w: "The", t: "ה" }, { w: "doctor", t: "רופא" },
        { w: "gave", t: "נתן לי", phraseId: "gave_me" },
        { w: "me", t: "נתן לי", phraseId: "gave_me" },
        { w: "medicine.", t: "תרופה." },
        { w: "I", t: "אני" }, { w: "feel", t: "מרגיש" }, { w: "better", t: "יותר טוב" }, { w: "now.", t: "עכשיו." },
        { w: "I", t: "אני" }, { w: "must", t: "חייב" }, { w: "rest", t: "לנוח" }, { w: "for", t: "במשך" }, { w: "two", t: "יומיים", phraseId: "two_days" }, { w: "days.", t: "יומיים", phraseId: "two_days" },
        { w: "I", t: "אני" }, { w: "hope", t: "מקווה" }, { w: "to", t: "ל" }, { w: "recover", t: "להחלים" }, { w: "soon.", t: "בקרוב." }
      ]
    },
    {
      id: "p_daily_lost",
      type: "passage",
      title: "Asking Directions",
      heTitle: "שואלים כיוונים",
      level: "קל",
      category: "Daily Life",
      content: [
        { w: "Excuse", t: "סליחה", phraseId: "excuse_me" },
        { w: "me,", t: "סליחה", phraseId: "excuse_me" },
        { w: "where", t: "איפה" }, { w: "is", t: "נמצאת" }, { w: "the", t: "ה" }, { w: "station?", t: "תחנה?" },
        { w: "Go", t: "לך" },
        { w: "straight", t: "ישר", phraseId: "go_straight" },
        { w: "and", t: "ו" },
        { w: "turn", t: "פנה שמאלה", phraseId: "turn_left" },
        { w: "left.", t: "פנה שמאלה", phraseId: "turn_left" },
        { w: "It", t: "זה" }, { w: "is", t: "נמצא" }, { w: "near", t: "ליד" }, { w: "the", t: "ה" }, { w: "bank.", t: "בנק." },
        { w: "You", t: "אתה" }, { w: "will", t: " " }, { w: "see", t: "תראה" }, { w: "a", t: "בניין אדום", phraseId: "red_build" }, { w: "red", t: "בניין אדום", phraseId: "red_build" }, { w: "building.", t: "בניין אדום", phraseId: "red_build" }
      ]
    },
    {
      id: "p_daily_clothes",
      type: "passage",
      title: "Buying a Shirt",
      heTitle: "קונים חולצה",
      level: "קל",
      category: "Daily Life",
      content: [
        { w: "This", t: "הזו" }, { w: "shirt", t: "חולצה" }, { w: "is", t: "היא" },
        { w: "too", t: "קטנה מדי", phraseId: "too_small" },
        { w: "small.", t: "קטנה מדי", phraseId: "too_small" },
        { w: "Do", t: "האם" }, { w: "you", t: "לכם" }, { w: "have", t: "יש" },
        { w: "a", t: "מידה גדולה יותר", phraseId: "bigger_size" },
        { w: "bigger", t: "מידה גדולה יותר", phraseId: "bigger_size" },
        { w: "size?", t: "מידה גדולה יותר", phraseId: "bigger_size" },
        { w: "The", t: "ה" }, { w: "blue", t: "כחולה" }, { w: "one", t: "אחת (חולצה)" }, { w: "is", t: "היא" }, { w: "nice.", t: "נחמדה." },
        { w: "Can", t: "אפשר" }, { w: "I", t: "אני" }, { w: "try", t: "למדוד אותה", phraseId: "try_it" }, { w: "it", t: "למדוד אותה", phraseId: "try_it" }, { w: "on?", t: "למדוד אותה", phraseId: "try_it" }
      ]
    },
    {
      id: "p_daily_weather",
      type: "passage",
      title: "Rainy Day",
      heTitle: "יום גשום",
      level: "קל",
      category: "Daily Life",
      content: [
        { w: "It", t: "זה" }, { w: "is", t: "הוא" },
        { w: "raining", t: "יורד גשם", phraseId: "raining" },
        { w: "outside.", t: "בחוץ." },
        { w: "Don't", t: "אל" }, { w: "forget", t: "תשכח" }, { w: "to", t: "ל" },
        { w: "take", t: "לקחת מטריה", phraseId: "take_umbrella" },
        { w: "an", t: "לקחת מטריה", phraseId: "take_umbrella" },
        { w: "umbrella.", t: "לקחת מטריה", phraseId: "take_umbrella" },
        { w: "Wear", t: "תלבש" }, { w: "your", t: "שלך" }, { w: "boots.", t: "מגפיים." },
        { w: "It", t: "זה" }, { w: "is", t: "הוא" }, { w: "cold", t: "קר" }, { w: "too.", t: "גם." }
      ]
    },
    {
      id: "p_daily_2",
      type: "passage",
      title: "Grocery Shopping",
      heTitle: "קניות בסופר",
      level: "קל",
      category: "Daily Life",
      content: [
        { w: "I", t: "אני" }, { w: "need", t: "צריך" }, { w: "to", t: "ל" }, { w: "buy", t: "לקנות" },
        { w: "milk", t: "חלב" }, { w: "and", t: "ו" }, { w: "eggs.", t: "ביצים." },
        { w: "The", t: "ה" }, { w: "supermarket", t: "סופרמרקט" }, { w: "is", t: "הוא" }, { w: "near", t: "קרוב ל..." }, { w: "my", t: "שלי" }, { w: "house.", t: "בית." },
        { w: "I", t: "אני" }, { w: "will", t: "אני (עתיד)" }, { w: "pay", t: "אשלם", phraseId: "pay_with" }, { w: "with", t: "עם/ב", phraseId: "pay_with" },
        { w: "cash.", t: "מזומן." },
        { w: "I", t: "אני" }, { w: "also", t: "גם" }, { w: "need", t: "צריך" }, { w: "bread.", t: "לחם." },
        { w: "The", t: "ה" }, { w: "line", t: "תור" }, { w: "is", t: "הוא" }, { w: "very", t: "מאוד" }, { w: "long.", t: "ארוך." }
      ]
    },
    {
      id: "p_daily_3",
      type: "passage",
      title: "Cooking Dinner",
      heTitle: "מכין ארוחת ערב",
      level: "בינוני",
      category: "Daily Life",
      content: [
        { w: "Tonight", t: "הערב" }, { w: "I", t: "אני" }, { w: "am", t: " " },
        { w: "cooking", t: "מבשל", phraseId: "cooking" },
        { w: "pasta.", t: "פסטה." },
        { w: "I", t: "אני" }, { w: "boil", t: "מרתיח את המים", phraseId: "boil_water" },
        { w: "the", t: "מרתיח את המים", phraseId: "boil_water" },
        { w: "water", t: "מרתיח את המים", phraseId: "boil_water" },
        { w: "and", t: "ו" }, { w: "chop", t: "קוצץ את הירקות", phraseId: "chop_veg" },
        { w: "the", t: "קוצץ את הירקות", phraseId: "chop_veg" },
        { w: "vegetables.", t: "קוצץ את הירקות", phraseId: "chop_veg" },
        { w: "I", t: "אני" }, { w: "add", t: "מוסיף" }, { w: "salt", t: "מלח" }, { w: "and", t: "ו" }, { w: "pepper.", t: "פלפל." },
        { w: "The", t: "ה" }, { w: "sauce", t: "רוטב" }, { w: "tastes", t: "יש לו טעם" }, { w: "amazing.", t: "מדהים." }
      ]
    },
    {
      id: "p_sci_1",
      type: "passage",
      title: "Black Holes",
      heTitle: "חורים שחורים",
      level: "מתקדם",
      category: "Science",
      content: [
        { w: "A", t: " " }, { w: "black", t: "חור שחור", phraseId: "black_hole" }, { w: "hole", t: "חור שחור", phraseId: "black_hole" },
        { w: "is", t: "הוא" }, { w: "a", t: " " },
        { w: "region", t: "אזור בחלל", phraseId: "region_space" },
        { w: "in", t: "אזור בחלל", phraseId: "region_space" },
        { w: "space", t: "אזור בחלל", phraseId: "region_space" },
        { w: "where", t: "איפה ש..." }, { w: "gravity", t: "כוח המשיכה" }, { w: "is", t: "הוא" },
        { w: "very", t: "מאוד חזק", phraseId: "very_strong" },
        { w: "strong.", t: "מאוד חזק", phraseId: "very_strong" },
        { w: "Nothing", t: "שום דבר" }, { w: "can", t: "יכול" }, { w: "escape", t: "לברוח" }, { w: "from", t: "מ..." }, { w: "it.", t: "ממנו." },
        { w: "They", t: "הם" }, { w: "are", t: "הינם" }, { w: "invisible.", t: "בלתי נראים." },
        { w: "Time", t: "זמן" }, { w: "slows", t: "מאט", phraseId: "slows_down" }, { w: "down", t: "מאט", phraseId: "slows_down" }, { w: "near", t: "ליד" }, { w: "them.", t: "הם." }
      ]
    },

    // --- Stories ---
    {
      id: "s101",
      type: "story",
      title: "The Magic Forest",
      heTitle: "היער הקסום",
      level: "קל",
      category: "Fantasy",
      content: [
        { w: "Once", t: "פעם אחת", phraseId: "once_upon" }, { w: "upon", t: "פעם אחת", phraseId: "once_upon" }, { w: "a", t: "פעם אחת", phraseId: "once_upon" }, { w: "time,", t: "זמן," },
        { w: "there", t: "היה" }, { w: "was", t: "היה" },
        { w: "a", t: "ילד קטן", phraseId: "little_boy" },
        { w: "little", t: "ילד קטן", phraseId: "little_boy" },
        { w: "boy", t: "ילד קטן", phraseId: "little_boy" },
        { w: "named", t: "בשם" }, { w: "Tom.", t: "תום." },
        { w: "He", t: "הוא" }, { w: "lived", t: "גר" }, { w: "near", t: "ליד" },
        { w: "a", t: "יער גדול", phraseId: "big_forest" },
        { w: "big", t: "יער גדול", phraseId: "big_forest" },
        { w: "forest.", t: "יער גדול", phraseId: "big_forest" },
        { w: "One", t: "יום אחד", phraseId: "one_day_s" }, { w: "day,", t: "יום אחד", phraseId: "one_day_s" },
        { w: "Tom", t: "תום" }, { w: "found", t: "מצא" },
        { w: "a", t: "מפתח זהב", phraseId: "gold_key" },
        { w: "gold", t: "מפתח זהב", phraseId: "gold_key" },
        { w: "key.", t: "מפתח זהב", phraseId: "gold_key" },
        { w: "He", t: "הוא" }, { w: "opened", t: "פתח" },
        { w: "a", t: "דלת סודית", phraseId: "secret_door" },
        { w: "secret", t: "דלת סודית", phraseId: "secret_door" },
        { w: "door", t: "דלת סודית", phraseId: "secret_door" },
        { w: "in", t: "ב" }, { w: "a", t: "עץ." }, { w: "tree.", t: "עץ." },
        { w: "Inside,", t: "בפנים," }, { w: "he", t: "הוא" }, { w: "saw", t: "ראה" }, { w: "fairies.", t: "פיות." },
        { w: "The", t: "ה" }, { w: "fairies", t: "פיות" }, { w: "gave", t: "נתנו" }, { w: "him", t: "לו" }, { w: "magic", t: "אבקת קסמים", phraseId: "magic_dust" }, { w: "dust.", t: "אבקת קסמים", phraseId: "magic_dust" },
        { w: "He", t: "הוא" }, { w: "could", t: "יכול היה" }, { w: "fly", t: "לעוף" }, { w: "now.", t: "עכשיו." }
      ]
    },
    {
      id: "s_job_1",
      type: "story",
      title: "My First Tech Interview",
      heTitle: "ראיון הטכנולוגיה הראשון שלי",
      level: "מתקדם",
      category: "Work",
      content: [
        { w: "I", t: "אני" }, { w: "was", t: "הייתי" },
        { w: "nervous", t: "לחוץ לגבי...", phraseId: "nervous_about" },
        { w: "about", t: "לחוץ לגבי...", phraseId: "nervous_about" },
        { w: "my", t: "שלי" },
        { w: "job", t: "ראיון עבודה", phraseId: "job_interview" },
        { w: "interview", t: "ראיון עבודה", phraseId: "job_interview" },
        { w: "at", t: "ב" }, { w: "Google.", t: "גוגל." },
        { w: "I", t: "אני" },
        { w: "prepared", t: "התכוננתי", phraseId: "prepared_for" },
        { w: "for", t: "התכוננתי", phraseId: "prepared_for" },
        { w: "weeks.", t: "שבועות." },
        { w: "The", t: "ה" }, { w: "interviewer", t: "מראיין" }, { w: "was", t: "היה" }, { w: "nice.", t: "נחמד." },
        { w: "He", t: "הוא" },
        { w: "asked", t: "שאל אותי על", phraseId: "asked_about" },
        { w: "me", t: "שאל אותי על", phraseId: "asked_about" },
        { w: "about", t: "שאל אותי על", phraseId: "asked_about" },
        { w: "my", t: "שלי" },
        { w: "previous", t: "פרויקטים קודמים", phraseId: "prev_projects" },
        { w: "projects.", t: "פרויקטים קודמים", phraseId: "prev_projects" },
        { w: "Then,", t: "אז," }, { w: "we", t: "אנחנו" },
        { w: "talked", t: "דיברנו על", phraseId: "talked_about" },
        { w: "about", t: "דיברנו על", phraseId: "talked_about" },
        { w: "React", t: "ריאקט" }, { w: "and", t: "ו" }, { w: "JavaScript.", t: "ג'אווה סקריפט." },
        { w: "I", t: "אני" }, { w: "asked", t: "שאלתי" }, { w: "about", t: "על" }, { w: "the", t: "ה" }, { w: "team", t: "תרבות צוות", phraseId: "team_culture" }, { w: "culture.", t: "תרבות צוות", phraseId: "team_culture" },
        { w: "They", t: "הם" }, { w: "seemed", t: "נראו" }, { w: "very", t: "מאוד" }, { w: "friendly.", t: "חברותיים." },
        { w: "In", t: "ב" }, { w: "the", t: "ה" }, { w: "end,", t: "סוף," },
        { w: "I", t: "אני" },
        { w: "felt", t: "הרגשתי בטוח בעצמי", phraseId: "felt_confident" },
        { w: "confident.", t: "הרגשתי בטוח בעצמי", phraseId: "felt_confident" }
      ]
    },
    {
      id: "s_job_2",
      type: "story",
      title: "The Production Bug",
      heTitle: "הבאג בפרודקשן",
      level: "מתקדם",
      category: "Work",
      content: [
        { w: "It", t: "זה" }, { w: "was", t: "היה" }, { w: "Friday", t: "יום שישי" }, { w: "afternoon.", t: "אחר הצהריים." },
        { w: "Suddenly,", t: "פתאום," }, { w: "the", t: "ה" }, { w: "server", t: "שרת" },
        { w: "crashed.", t: "קרס." },
        { w: "My", t: "שלי" }, { w: "boss", t: "בוס" }, { w: "was", t: "היה" }, { w: "worried.", t: "מודאג." },
        { w: "I", t: "אני" }, { w: "checked", t: "בדקתי את ה..." }, { w: "the", t: "ה" }, { w: "logs", t: "לוגים (יומני רישום)" },
        { w: "and", t: "ו" },
        { w: "found", t: "מצאתי את השגיאה", phraseId: "found_error" },
        { w: "the", t: "מצאתי את השגיאה", phraseId: "found_error" },
        { w: "error.", t: "מצאתי את השגיאה", phraseId: "found_error" },
        { w: "I", t: "אני" },
        { w: "fixed", t: "תיקנתי את זה", phraseId: "fixed_it" },
        { w: "it", t: "תיקנתי את זה", phraseId: "fixed_it" },
        { w: "quickly", t: "במהירות" }, { w: "and", t: "ו" },
        { w: "deployed", t: "העליתי גרסה (Deploy)", phraseId: "deployed" },
        { w: "the", t: "ה" }, { w: "code.", t: "קוד." },
        { w: "Everyone", t: "כולם" }, { w: "was", t: "היו" }, { w: "happy.", t: "שמחים." }
      ]
    },
    {
      id: "s_friends_1",
      type: "story",
      title: "Coffee with Sarah",
      heTitle: "קפה עם שרה",
      level: "בינוני",
      category: "Social",
      content: [
        { w: "Yesterday,", t: "אתמול," }, { w: "I", t: "אני" },
        { w: "met", t: "פגשתי את", phraseId: "met_sarah" },
        { w: "Sarah", t: "פגשתי את", phraseId: "met_sarah" },
        { w: "at", t: "ב" }, { w: "a", t: "בית קפה", phraseId: "cafe" }, { w: "cafe.", t: "בית קפה", phraseId: "cafe" },
        { w: "We", t: "אנחנו" },
        { w: "haven't", t: "לא התראינו", phraseId: "havent_seen" },
        { w: "seen", t: "לא התראינו", phraseId: "havent_seen" },
        { w: "each", t: "אחד את השנייה", phraseId: "each_other" },
        { w: "other", t: "אחד את השנייה", phraseId: "each_other" },
        { w: "for", t: "במשך" },
        { w: "a", t: "הרבה זמן", phraseId: "long_time" },
        { w: "long", t: "הרבה זמן", phraseId: "long_time" },
        { w: "time.", t: "הרבה זמן", phraseId: "long_time" },
        { w: "She", t: "היא" },
        { w: "told", t: "סיפרה לי", phraseId: "told_me" },
        { w: "me", t: "סיפרה לי", phraseId: "told_me" },
        { w: "about", t: "על" }, { w: "her", t: "שלה" },
        { w: "new", t: "עבודה חדשה", phraseId: "new_job" },
        { w: "job.", t: "עבודה חדשה", phraseId: "new_job" },
        { w: "We", t: "אנחנו" },
        { w: "laughed", t: "צחקנו הרבה", phraseId: "laughed_lot" },
        { w: "a", t: "צחקנו הרבה", phraseId: "laughed_lot" },
        { w: "lot.", t: "צחקנו הרבה", phraseId: "laughed_lot" },
        { w: "We", t: "אנחנו" }, { w: "planned", t: "תכננו" }, { w: "to", t: "ל" }, { w: "meet", t: "להיפגש" }, { w: "again.", t: "שוב." },
        { w: "It", t: "זה" }, { w: "was", t: "היה" },
        { w: "great", t: "נהדר", phraseId: "great_catchup" },
        { w: "to", t: "להתעדכן", phraseId: "great_catchup" },
        { w: "catch", t: "להתעדכן", phraseId: "great_catchup" },
        { w: "up.", t: "להתעדכן", phraseId: "great_catchup" }
      ]
    },
    {
      id: "s_friends_2",
      type: "story",
      title: "The Birthday Surprise",
      heTitle: "הפתעת יום ההולדת",
      level: "קל",
      category: "Social",
      content: [
        { w: "It", t: "זה" }, { w: "was", t: "היה" }, { w: "Dan's", t: "של דן" }, { w: "birthday.", t: "יום הולדת." },
        { w: "His", t: "שלו" }, { w: "friends", t: "חברים" }, { w: "planned", t: "תכננו" },
        { w: "a", t: "מסיבה", phraseId: "party" }, { w: "party.", t: "מסיבה", phraseId: "party" },
        { w: "They", t: "הם" }, { w: "bought", t: "קנו" }, { w: "a", t: "עוגה", phraseId: "cake" }, { w: "cake", t: "עוגה", phraseId: "cake" },
        { w: "and", t: "ו" }, { w: "hid", t: "התחבאו" }, { w: "in", t: "ב" }, { w: "his", t: "שלו" }, { w: "house.", t: "בית." },
        { w: "When", t: "כש" }, { w: "he", t: "הוא" }, { w: "opened", t: "פתח" }, { w: "the", t: "את ה" }, { w: "door,", t: "דלת," },
        { w: "everyone", t: "כולם" }, { w: "shouted,", t: "צעקו," },
        { w: "Surprise!", t: "הפתעה!" }
      ]
    },
    {
      id: "s201",
      type: "story",
      title: "Planning a Trip",
      heTitle: "מתכננים טיול",
      level: "בינוני",
      category: "Travel",
      content: [
        { w: "Next", t: "הבא" }, { w: "month,", t: "חודש," }, { w: "my", t: "שלי" }, { w: "friends", t: "חברים" }, { w: "and", t: "ו" }, { w: "I", t: "אני" },
        { w: "are", t: "מתכננים (הווה מתמשך)", phraseId: "are_planning" },
        { w: "planning", t: "מתכננים (הווה מתמשך)", phraseId: "are_planning" },
        { w: "a", t: "טיול ל...", phraseId: "trip_to" },
        { w: "trip", t: "טיול ל...", phraseId: "trip_to" },
        { w: "to", t: "טיול ל...", phraseId: "trip_to" },
        { w: "London.", t: "לונדון." },
        { w: "We", t: "אנחנו" }, { w: "want", t: "רוצים" }, { w: "to", t: "ל" }, { w: "see", t: "לראות" },
        { w: "Big", t: "ביג בן", phraseId: "big_ben" },
        { w: "Ben", t: "ביג בן", phraseId: "big_ben" },
        { w: "and", t: "ו" }, { w: "visit", t: "לבקר" }, { w: "many", t: "הרבה" }, { w: "museums.", t: "מוזיאונים." },
        { w: "We", t: "אנחנו" }, { w: "also", t: "גם" }, { w: "booked", t: "הזמנו" }, { w: "a", t: "מלון", phraseId: "hotel" }, { w: "hotel.", t: "מלון", phraseId: "hotel" },
        { w: "It", t: "הוא" }, { w: "is", t: "נמצא" }, { w: "near", t: "ליד" }, { w: "the", t: "ה" }, { w: "city", t: "מרכז העיר", phraseId: "city_center" }, { w: "center.", t: "מרכז העיר", phraseId: "city_center" },
        { w: "Yesterday,", t: "אתמול," }, { w: "we", t: "אנחנו" },
        { w: "bought", t: "קנינו את הכרטיסים", phraseId: "bought_tickets" },
        { w: "the", t: "קנינו את הכרטיסים", phraseId: "bought_tickets" },
        { w: "tickets", t: "קנינו את הכרטיסים", phraseId: "bought_tickets" },
        { w: "online.", t: "באינטרנט." }
      ]
    },
    {
      id: "s301",
      type: "story",
      title: "The Future of Space",
      heTitle: "עתיד החלל",
      level: "מתקדם",
      category: "Science",
      content: [
        { w: "Humans", t: "בני אדם" }, { w: "have", t: "כבר (פועל עזר)" }, { w: "always", t: "תמיד" },
        { w: "been", t: "היו מוקסמים", phraseId: "been_fascinated" },
        { w: "fascinated", t: "היו מוקסמים", phraseId: "been_fascinated" },
        { w: "by", t: "על ידי" }, { w: "the", t: "ה" }, { w: "stars.", t: "כוכבים." },
        { w: "In", t: "ב" }, { w: "the", t: "ה" },
        { w: "last", t: "מאה האחרונה", phraseId: "last_century" },
        { w: "century,", t: "מאה האחרונה", phraseId: "last_century" },
        { w: "we", t: "אנחנו" }, { w: "have", t: "כבר" },
        { w: "made", t: "עשינו התקדמות", phraseId: "made_progress" },
        { w: "great", t: "עצומה", phraseId: "great" },
        { w: "progress", t: "עשינו התקדמות", phraseId: "made_progress" },
        { w: "in", t: "ב" },
        { w: "space", t: "חקר החלל", phraseId: "space_exploration" },
        { w: "exploration.", t: "חקר החלל", phraseId: "space_exploration" },
        { w: "Scientists", t: "מדענים" }, { w: "believe", t: "מאמינים" }, { w: "that", t: "ש" },
        { w: "one", t: "יום אחד", phraseId: "one_day" },
        { w: "day,", t: "יום אחד", phraseId: "one_day" },
        { w: "people", t: "אנשים" }, { w: "might", t: "עלולים/עשויים" },
        { w: "live", t: "לחיות על מאדים", phraseId: "live_on_mars" },
        { w: "on", t: "לחיות על מאדים", phraseId: "live_on_mars" },
        { w: "Mars.", t: "לחיות על מאדים", phraseId: "live_on_mars" },
        { w: "Terraforming", t: "הארצה (הפיכה ראוי למגורים)" }, { w: "might", t: "עשויה" }, { w: "be", t: "להיות" }, { w: "possible.", t: "אפשרית." },
        { w: "It", t: "זה" }, { w: "will", t: "יקח" }, { w: "take", t: "יקח" }, { w: "many", t: "הרבה" }, { w: "years.", t: "שנים." }
      ]
    },
    {
      id: "s_social_trip",
      type: "story",
      title: "Weekend Getaway",
      heTitle: "חופשת סוף שבוע",
      level: "בינוני",
      category: "Social",
      content: [
        { w: "My", t: "שלי" }, { w: "friends", t: "חברים" }, { w: "and", t: "ו" }, { w: "I", t: "אני" },
        { w: "are", t: "נוהגים (נוסעים)", phraseId: "driving" },
        { w: "driving", t: "נוהגים (נוסעים)", phraseId: "driving" },
        { w: "to", t: "ל" }, { w: "the", t: "ה" }, { w: "north.", t: "צפון." },
        { w: "We", t: "אנחנו" },
        { w: "rented", t: "שכרנו בקתה", phraseId: "rented_cabin" },
        { w: "a", t: "שכרנו בקתה", phraseId: "rented_cabin" },
        { w: "cabin", t: "שכרנו בקתה", phraseId: "rented_cabin" },
        { w: "in", t: "ב" }, { w: "the", t: "ה" }, { w: "woods.", t: "יער." },
        { w: "We", t: "אנחנו" }, { w: "plan", t: "מתכננים" }, { w: "to", t: "ל" },
        { w: "hike", t: "לטייל ברגל", phraseId: "hike" },
        { w: "and", t: "ו" }, { w: "relax.", t: "להירגע." },
        { w: "We", t: "אנחנו" }, { w: "will", t: "נבשל" }, { w: "cook", t: "נבשל" }, { w: "outside.", t: "בחוץ." },
        { w: "The", t: "ה" }, { w: "stars", t: "כוכבים" }, { w: "are", t: "הם" }, { w: "beautiful", t: "יפים" }, { w: "there.", t: "שם." },
        { w: "I", t: "אני" }, { w: "brought", t: "הבאתי" }, { w: "my", t: "שלי" }, { w: "camera.", t: "מצלמה." }
      ]
    },
    {
      id: "s_daily_english",
      type: "story",
      title: "Learning English",
      heTitle: "לומד אנגלית",
      level: "קל",
      category: "Daily Life",
      content: [
        { w: "I", t: "אני" },
        { w: "practice", t: "מתרגל אנגלית", phraseId: "practice_eng" },
        { w: "English", t: "מתרגל אנגלית", phraseId: "practice_eng" },
        { w: "every", t: "כל" }, { w: "day.", t: "יום." },
        { w: "It", t: "זה" }, { w: "helps", t: "עוזר" }, { w: "me", t: "לי" },
        { w: "improve", t: "להשתפר", phraseId: "improve" },
        { w: "fast.", t: "מהר." },
        { w: "I", t: "אני" }, { w: "read", t: "קורא" }, { w: "books", t: "ספרים" }, { w: "and", t: "ו" },
        { w: "listen", t: "מקשיב ל", phraseId: "listen_to" },
        { w: "to", t: "מקשיב ל", phraseId: "listen_to" },
        { w: "music.", t: "מוזיקה." },
        { w: "I", t: "אני" }, { w: "watch", t: "צופה ב" }, { w: "movies", t: "סרטים" }, { w: "with", t: "עם" }, { w: "subtitles.", t: "כתוביות." },
        { w: "I", t: "אני" }, { w: "speak", t: "מדבר" }, { w: "with", t: "עם" }, { w: "tourists.", t: "תיירים." },
        { w: "It", t: "זה" }, { w: "gets", t: "נהיה" }, { w: "easier", t: "קל יותר" }, { w: "every", t: "כל" }, { w: "day.", t: "יום." }
      ]
    }
  ]
};

const ACHIEVEMENTS = [
  { id: 1, title: "צעד ראשון", desc: "סיימת את השיעור הראשון", icon: "🚀", unlocked: true },
  { id: 2, title: "אש בעיניים", desc: "הגעת לרצף של 3 ימים", icon: "🔥", unlocked: true },
  { id: 3, title: "תולעת ספרים", desc: "קראת 5 סיפורים", icon: "🐛", unlocked: false },
  { id: 4, title: "פוליגלוט", desc: "למדת 100 מילים חדשות", icon: "🗣️", unlocked: false },
];

const CHAT_SCENARIOS = [
  { id: 'tutor', title: 'מורה פרטי', icon: <GraduationCap size={16} />, prompt: "You are a helpful and patient English tutor." },
  { id: 'barista', title: 'בית קפה', icon: <Coffee size={16} />, prompt: "Act as a barista in a coffee shop in London. I am a customer. Ask me what I want to order." },
  { id: 'interview', title: 'ראיון עבודה', icon: <Briefcase size={16} />, prompt: "Act as a hiring manager interviewing me for a job. Ask me professional questions." },
  { id: 'airport', title: 'שדה תעופה', icon: <Plane size={16} />, prompt: "Act as an immigration officer at an airport. Ask me for my passport and purpose of visit." },
  { id: 'doctor', title: 'רופא', icon: <Stethoscope size={16} />, prompt: "Act as a doctor. I am a patient coming for a checkup. Ask me about my symptoms." }
];

// --- Helper Components ---

const TargetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const ClickableWord = ({ word, translation, isActive, isHighlighted, onClick, onMouseEnter, onMouseLeave }: { word: string; translation: string; isActive: boolean; isHighlighted: boolean; onClick: () => void; onMouseEnter: () => void; onMouseLeave: () => void }) => {
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
          : 'hover:bg-gray-100 text-gray-700'
          }`}
      >
        {word}
      </span>
    </span>
  );
};

// --- View Components ---

const Navigation = ({ activeTab, setActiveTab }) => (
  <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 pb-safe flex justify-around items-center h-16 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
    <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center p-2 transition-colors ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'}`}><Home size={24} /><span className="text-xs mt-1 font-medium">בית</span></button>
    <button onClick={() => setActiveTab('learn')} className={`flex flex-col items-center p-2 transition-colors ${activeTab === 'learn' || activeTab === 'abc' ? 'text-blue-600' : 'text-gray-400'}`}><Book size={24} /><span className="text-xs mt-1 font-medium">לימוד</span></button>
    <button onClick={() => { setActiveTab('reading'); }} className={`flex flex-col items-center p-2 transition-colors ${activeTab === 'reading' ? 'text-blue-600' : 'text-gray-400'}`}><BookOpen size={24} /><span className="text-xs mt-1 font-medium">קריאה</span></button>
    <button onClick={() => setActiveTab('chat')} className={`flex flex-col items-center p-2 transition-colors ${activeTab === 'chat' ? 'text-blue-600' : 'text-gray-400'}`}><MessageCircle size={24} /><span className="text-xs mt-1 font-medium">צ'אט AI</span></button>
    <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center p-2 transition-colors ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}><User size={24} /><span className="text-xs mt-1 font-medium">פרופיל</span></button>
  </div>
);

const HomeView = ({ data, startLesson, dailyTip, isTipLoading, fetchDailyTip }) => (
  <div className="p-6 space-y-6 pb-24 animate-fade-in">
    <header className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">היי, {data.user.name} 👋</h1>
        <p className="text-gray-500">בוא נמשיך ללמוד!</p>
      </div>
      <div className="flex items-center space-x-2 space-x-reverse bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
        <Zap className="text-orange-500 fill-current" size={18} />
        <span className="text-orange-700 font-bold">{data.user.streak} ימים</span>
      </div>
    </header>

    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
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

    <div className="space-y-3">
      <h2 className="text-lg font-bold text-gray-800">מומלץ עבורך</h2>
      <div onClick={() => startLesson(data.lessons[1])} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4 space-x-reverse active:scale-95 transition-transform cursor-pointer">
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">🍎</div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">אוכל ושתייה</h3>
          <p className="text-sm text-gray-500">5 מילים חדשות • 3 דקות</p>
        </div>
        <ChevronLeft className="text-gray-300 rotate-180" />
      </div>
    </div>

    <div className="space-y-3">
      <h2 className="text-lg font-bold text-gray-800">סטטיסטיקה</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center py-6">
          <Award className="text-yellow-500 mb-2" size={32} />
          <span className="text-2xl font-bold text-gray-800">{data.user.xp}</span>
          <span className="text-xs text-gray-400">XP צבור</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center py-6">
          <Star className="text-purple-500 mb-2" size={32} />
          <span className="text-2xl font-bold text-gray-800">{data.user.level}</span>
          <span className="text-xs text-gray-400">רמה נוכחית</span>
        </div>
      </div>
    </div>
  </div>
);

const LearnView = ({ data, startLesson, setActiveTab, setShowWritingModal, handleGenerateQuiz, isGeneratingQuiz, setShowGrammarModal, handleGenerateIdiom }) => {
  const [quizTopic, setQuizTopic] = useState('');

  return (
    <div className="p-6 pb-24">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">מסלול הלימוד</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div onClick={() => setActiveTab('abc')} className="bg-gradient-to-br from-purple-500 to-indigo-600 p-4 rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform text-white h-32">
          <div className="text-4xl mb-2">🔤</div>
          <span className="font-bold text-sm">לוח אותיות</span>
        </div>
        <div onClick={() => setShowWritingModal(true)} className="bg-gradient-to-br from-blue-500 to-cyan-600 p-4 rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform text-white h-32">
          <div className="text-4xl mb-2">✍️</div>
          <span className="font-bold text-sm">מאמן כתיבה (AI)</span>
        </div>
        <div onClick={() => setShowGrammarModal(true)} className="bg-gradient-to-br from-teal-400 to-emerald-600 p-4 rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform text-white h-32">
          <div className="text-4xl mb-2">🔬</div>
          <span className="font-bold text-sm">מעבדת דקדוק (AI)</span>
        </div>
        <div onClick={handleGenerateIdiom} className="bg-gradient-to-br from-pink-500 to-rose-600 p-4 rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform text-white h-32">
          <div className="text-4xl mb-2">🎨</div>
          <span className="font-bold text-sm">ניב בהפתעה (AI)</span>
        </div>
      </div>

      {/* AI Quiz Generator */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center">
          <Sparkles className="text-yellow-500 ml-2" size={18} />
          חידון AI מהיר
        </h3>
        <div className="flex items-center space-x-2 space-x-reverse">
          <input
            type="text"
            value={quizTopic}
            onChange={(e) => setQuizTopic(e.target.value)}
            placeholder="נושא (למשל: ספורט, מוזיקה...)"
            className="flex-1 p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleGenerateQuiz(quizTopic)}
            disabled={isGeneratingQuiz || !quizTopic.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50 flex items-center"
          >
            {isGeneratingQuiz ? <Loader2 className="animate-spin" size={18} /> : 'צור'}
          </button>
        </div>
      </div>

      <div className="space-y-6 relative">
        <div className="absolute top-4 bottom-4 right-[2.2rem] w-1 bg-gray-100 -z-10 rounded-full"></div>
        {data.lessons.map((lesson) => (
          <div key={lesson.id} className="flex items-center group">
            <div onClick={() => startLesson(lesson)} className={`w-20 h-20 rounded-full border-b-4 flex items-center justify-center text-3xl cursor-pointer transition-transform active:translate-y-1 active:border-b-0 shadow-sm z-10 ${lesson.id === 1 ? 'bg-green-500 border-green-700 text-white' : lesson.id === 2 ? 'bg-orange-500 border-orange-700 text-white' : 'bg-gray-200 border-gray-300 grayscale opacity-80'}`}>
              {lesson.icon}
            </div>
            <div className="mr-6 bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex-1 relative">
              <div className="absolute top-1/2 -right-2 w-4 h-4 bg-white border-t border-l border-gray-100 transform rotate-45 -translate-y-1/2"></div>
              <h3 className="font-bold text-gray-800">{lesson.title}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Star size={14} className="ml-1 text-yellow-400 fill-current" />
                {lesson.id <= 2 ? 'פתוח ללמידה' : 'נעול'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AbcView = ({ setActiveTab }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [viewMode, setViewMode] = useState('both');

  const playSound = (letter) => {
    window.speechSynthesis.cancel();
    const textToSpeak = letter === 'Z' ? 'Zed' : letter;
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
    <div className="p-6 pb-24 h-full bg-gray-50 flex flex-col">
      <div className="flex flex-col space-y-4 mb-6 sticky top-0 bg-gray-50 z-10 py-2">
        <div className="flex items-center space-x-4 space-x-reverse">
          <button onClick={() => setActiveTab('learn')} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-gray-600 rotate-180" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">אותיות (ABC)</h1>
        </div>
        <div className="bg-gray-200 p-1 rounded-xl flex self-center shadow-inner">
          <button onClick={() => setViewMode('upper')} className={`px-4 py-1.5 text-sm rounded-lg transition-all ${viewMode === 'upper' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-gray-500 hover:text-gray-700'}`}>גדולות</button>
          <button onClick={() => setViewMode('both')} className={`px-4 py-1.5 text-sm rounded-lg transition-all ${viewMode === 'both' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-gray-500 hover:text-gray-700'}`}>שניהם</button>
          <button onClick={() => setViewMode('lower')} className={`px-4 py-1.5 text-sm rounded-lg transition-all ${viewMode === 'lower' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-gray-500 hover:text-gray-700'}`}>קטנות</button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-3 overflow-y-auto pb-20 px-1" dir="ltr">
        {letters.map((letter) => (
          <button key={letter} onClick={() => playSound(letter)} className="bg-white aspect-square rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center active:scale-90 transition-all hover:border-blue-400 hover:shadow-md group">
            <span className="text-2xl font-bold text-gray-700 group-hover:text-blue-600">{getLetterText(letter)}</span>
            <Volume2 size={12} className="text-gray-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
          </button>
        ))}
      </div>
    </div>
  );
};

const QuizView = ({ quizState, currentLesson, handleAnswer, nextQuestion, closeQuiz }) => {
  const speakWord = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  if (quizState.completed) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white">
        <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <Trophy size={64} className="text-yellow-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">כל הכבוד!</h2>
        <p className="text-gray-500 mb-8">סיימת את השיעור בהצלחה</p>
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="bg-green-50 p-4 rounded-xl text-center">
            <span className="block text-2xl font-bold text-green-600">{quizState.score}/{currentLesson.words.length}</span>
            <span className="text-sm text-green-800">תשובות נכונות</span>
          </div>
          <div className="bg-orange-50 p-4 rounded-xl text-center">
            <span className="block text-2xl font-bold text-orange-600">+50</span>
            <span className="text-sm text-orange-800">XP</span>
          </div>
        </div>
        <button onClick={closeQuiz} className="w-full py-4 bg-blue-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-200 active:bg-blue-600 transition-colors">
          חזרה לתפריט
        </button>
      </div>
    );
  }

  const currentWord = currentLesson.words[quizState.currentQuestionIndex];
  const progress = ((quizState.currentQuestionIndex) / currentLesson.words.length) * 100;

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-white p-4 flex items-center space-x-4 space-x-reverse shadow-sm">
        <button onClick={closeQuiz} className="text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <div className="flex-1 flex flex-col p-6 max-w-lg mx-auto w-full">
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h2 className="text-lg text-gray-500 mb-4">מה הפירוש של:</h2>
          <div className="flex items-center justify-center space-x-3 space-x-reverse mb-8">
            <h1 className="text-4xl font-bold text-gray-800 border-b-2 border-dashed border-gray-300 pb-2">{currentWord.en}</h1>
            <button onClick={() => speakWord(currentWord.en)} className="p-2 bg-blue-100 rounded-full text-blue-500 hover:bg-blue-200 transition-colors active:scale-95">
              <Volume2 size={24} />
            </button>
          </div>
          <div className="w-full space-y-3">
            {currentWord.options.map((option, idx) => {
              const isSelected = quizState.selectedAnswer === option;
              let buttonStyle = "bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50";
              if (quizState.showResult) {
                if (option === currentWord.he) buttonStyle = "bg-green-100 border-green-500 text-green-700";
                else if (isSelected) buttonStyle = "bg-red-100 border-red-500 text-red-700";
                else buttonStyle = "opacity-50 border-gray-100";
              } else if (isSelected) {
                buttonStyle = "bg-blue-50 border-blue-500 text-blue-700";
              }
              return (
                <button key={idx} disabled={quizState.showResult} onClick={() => handleAnswer(option)} className={`w-full p-4 rounded-xl text-lg font-medium transition-all ${buttonStyle} shadow-sm`}>
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className={`p-6 border-t ${!quizState.showResult ? 'bg-white border-gray-200' : quizState.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
        {!quizState.showResult ? (
          <button disabled={true} className="w-full py-4 bg-gray-200 text-gray-400 rounded-xl font-bold text-lg cursor-not-allowed">
            בדוק תשובה
          </button>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${quizState.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {quizState.isCorrect ? <Check size={28} /> : <X size={28} />}
              </div>
              <div>
                <h3 className={`font-bold text-lg ${quizState.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {quizState.isCorrect ? 'מצוין!' : 'לא נורא'}
                </h3>
                {!quizState.isCorrect && <p className="text-sm text-red-600">התשובה הנכונה היא: {currentWord.he}</p>}
              </div>
            </div>
            <button onClick={nextQuestion} className={`px-8 py-3 rounded-xl font-bold text-white shadow-md transition-transform active:scale-95 ${quizState.isCorrect ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
              המשך
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ChatView = ({ chatMessages, chatInput, setChatInput, handleSendMessage, isChatLoading, handleResetChat, setChatMessages }) => {
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
    <div className="flex flex-col h-full bg-gray-50 pb-20">
      <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800 flex items-center">
              <MessageCircle className="ml-2 text-blue-500" />
              מורה פרטי (AI)
            </h1>
            <p className="text-xs text-gray-500">תרגל אנגלית בשיחה חופשית</p>
          </div>
          <button onClick={handleResetChat} className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors" title="שיחה חדשה">
            <RefreshCw size={20} />
          </button>
        </div>

        {/* Scenarios */}
        <div className="flex space-x-2 space-x-reverse overflow-x-auto pb-2 scrollbar-hide">
          {CHAT_SCENARIOS.map(scen => (
            <button
              key={scen.id}
              onClick={() => handleScenarioSelect(scen)}
              className="flex items-center space-x-1 space-x-reverse px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100 hover:bg-blue-100 whitespace-nowrap"
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
            <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isChatLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-2">
              <Loader2 className="animate-spin text-blue-500" size={16} />
              <span className="text-xs text-gray-400">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2 space-x-reverse">
          <input
            type="text"
            dir="ltr"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
          />
          <button
            onClick={handleSendMessage}
            disabled={isChatLoading || !chatInput.trim()}
            className="p-3 bg-blue-500 text-white rounded-full disabled:opacity-50 hover:bg-blue-600 transition-colors"
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
  setExplanation
}) => {
  const [activeWordIndex, setActiveWordIndex] = useState(null);
  const [hoveredWordIndex, setHoveredWordIndex] = useState(null);

  useEffect(() => {
    setActiveWordIndex(null);
    setHoveredWordIndex(null);
    setExplanation(null);
  }, [currentStory, setExplanation]);

  const levels = ['הכל', 'קל', 'בינוני', 'מתקדם'];
  const categories = ['הכל', ...new Set(data.readingMaterials.map(item => item.category))];

  const filteredStories = data.readingMaterials.filter(item => {
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
      <div className="h-full flex flex-col bg-gray-50 pb-24" onClick={() => setActiveWordIndex(null)}>
        <div className="bg-white p-4 shadow-sm flex items-center space-x-4 space-x-reverse sticky top-0 z-10" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setCurrentStory(null)} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft size={24} className="text-gray-600 rotate-180" />
          </button>
          <div className="flex-1">
            <h2 className="font-bold text-lg text-gray-800">{currentStory.title}</h2>
            <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-500">
              <span>{currentStory.heTitle}</span>
              <span>•</span>
              <span>{currentStory.category}</span>
            </div>
          </div>
          <button onClick={handleExplainStory} disabled={isExplaining} className="flex items-center space-x-1 space-x-reverse bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-purple-200 transition-colors">
            {isExplaining ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
            <span>הסבר לי</span>
          </button>
        </div>
        <div className="p-6 max-w-2xl mx-auto w-full space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 min-h-[300px]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-center mb-6">
              <Glasses size={32} className="text-blue-500 opacity-20" />
            </div>
            <p className="text-2xl leading-relaxed text-center font-medium text-gray-700" style={{ direction: 'ltr' }}>
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
                />
              ))}
            </p>
          </div>
          {explanation && (
            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 animate-fade-in">
              <h3 className="text-purple-800 font-bold mb-2 flex items-center">
                <Sparkles size={16} className="ml-2" />
                הסבר וניתוח (Gemini AI)
              </h3>
              <div className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
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
          <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <Sparkles size={20} className="ml-2 text-purple-600" />
                צור סיפור עם AI
              </h3>
              <button onClick={() => setShowGenerateModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">על מה הסיפור?</label>
                <input
                  type="text"
                  value={genTopic}
                  onChange={(e) => setGenTopic(e.target.value)}
                  placeholder="לדוגמה: דרקון שאהב פיצה..."
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">רמת קושי</label>
                <div className="flex space-x-2 space-x-reverse">
                  {['קל', 'בינוני', 'מתקדם'].map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => setGenLevel(lvl)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border ${genLevel === lvl ? 'bg-purple-100 border-purple-500 text-purple-700' : 'bg-white border-gray-200 text-gray-600'}`}
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
        <h1 className="text-2xl font-bold text-gray-800">ספרייה</h1>
        <button
          onClick={() => setShowGenerateModal(true)}
          className="flex items-center space-x-1 space-x-reverse bg-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-purple-700 shadow-md transition-colors"
        >
          <Plus size={16} />
          <span>צור סיפור</span>
        </button>
      </div>

      <div className="bg-gray-200 p-1 rounded-xl flex mb-6">
        <button onClick={() => setReadingType('passage')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center space-x-2 space-x-reverse ${readingType === 'passage' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
          <FileText size={16} />
          <span>קטעים קצרים</span>
        </button>
        <button onClick={() => setReadingType('story')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center space-x-2 space-x-reverse ${readingType === 'story' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
          <Library size={16} />
          <span>סיפורים</span>
        </button>
      </div>

      <div className="flex space-x-2 space-x-reverse mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {levels.map(level => (
          <button key={level} onClick={() => setReadingLevelFilter(level)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${readingLevelFilter === level ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
            {level}
          </button>
        ))}
      </div>

      <div className="flex space-x-2 space-x-reverse mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button key={cat} onClick={() => setReadingCategoryFilter(cat)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border flex items-center space-x-2 space-x-reverse ${readingCategoryFilter === cat ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'}`}>
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
            className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm active:scale-[0.98] transition-all cursor-pointer flex items-center justify-between group hover:border-blue-300"
          >
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-colors ${story.level === 'קל' ? 'bg-green-100 text-green-600 group-hover:bg-green-200' : story.level === 'בינוני' ? 'bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200' : 'bg-red-100 text-red-600 group-hover:bg-red-200'}`}>
                {story.type === 'passage' ? <FileText size={20} /> : <BookOpen size={20} />}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">{story.title}</h3>
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
              <span className={`text-xs px-2 py-1 rounded-full font-medium mb-1 ${story.level === 'קל' ? 'bg-green-50 text-green-700' : story.level === 'בינוני' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'}`}>
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

const ProfileView = ({ data }) => {
  return (
    <div className="p-6 pb-24 h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold text-gray-800">הפרופיל שלי</h1>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <Settings size={24} />
        </button>
      </div>

      {/* User Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-500 to-blue-400 z-0"></div>
        <div className="w-24 h-24 bg-white rounded-full p-1 z-10 mb-3 shadow-md relative">
          <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <User size={40} className="text-gray-400" />
          </div>
          <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full shadow-sm hover:bg-blue-600">
            <Edit3 size={14} />
          </button>
        </div>
        <h2 className="text-xl font-bold text-gray-800 z-10">{data.user.name}</h2>
        <p className="text-gray-500 text-sm z-10">רמה {data.user.level} • תלמיד מתמיד</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center">
          <div className="p-2 bg-orange-100 text-orange-600 rounded-full mb-2">
            <Zap size={20} />
          </div>
          <span className="font-bold text-lg text-gray-800">{data.user.streak}</span>
          <span className="text-xs text-gray-500">ימי רצף</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center">
          <div className="p-2 bg-yellow-100 text-yellow-600 rounded-full mb-2">
            <Award size={20} />
          </div>
          <span className="font-bold text-lg text-gray-800">{data.user.xp}</span>
          <span className="text-xs text-gray-500">נקודות XP</span>
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-8">
        <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
          <Medal size={20} className="ml-2 text-purple-500" />
          הישגים
        </h3>
        <div className="space-y-3">
          {ACHIEVEMENTS.map(ach => (
            <div key={ach.id} className={`flex items-center p-3 rounded-xl border ${ach.unlocked ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100 opacity-60'}`}>
              <div className="text-2xl ml-4">{ach.icon}</div>
              <div className="flex-1">
                <h4 className={`font-bold text-sm ${ach.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>{ach.title}</h4>
                <p className="text-xs text-gray-400">{ach.desc}</p>
              </div>
              {ach.unlocked && <Check size={16} className="text-green-500" />}
            </div>
          ))}
        </div>
      </div>

      {/* Menu Options */}
      <div className="space-y-2">
        <button className="w-full bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between text-gray-700 active:scale-[0.99] transition-transform">
          <div className="flex items-center">
            <Bell size={20} className="ml-3 text-gray-400" />
            <span>התראות</span>
          </div>
          <div className="w-10 h-6 bg-blue-500 rounded-full relative">
            <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </button>
        <button className="w-full bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between text-gray-700 active:scale-[0.99] transition-transform">
          <div className="flex items-center">
            <Volume2 size={20} className="ml-3 text-gray-400" />
            <span>אפקטים קוליים</span>
          </div>
          <div className="w-10 h-6 bg-blue-500 rounded-full relative">
            <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </button>
        <button className="w-full bg-white p-4 rounded-xl border border-gray-200 flex items-center text-red-500 active:scale-[0.99] transition-transform mt-4">
          <LogOut size={20} className="ml-3" />
          <span>התנתק</span>
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
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
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
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
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
  const [data, setData] = useState(MOCK_DB);
  const [activeTab, setActiveTab] = useState('home');
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentStory, setCurrentStory] = useState(null);

  const [readingType, setReadingType] = useState('passage');
  const [readingLevelFilter, setReadingLevelFilter] = useState('הכל');
  const [readingCategoryFilter, setReadingCategoryFilter] = useState('הכל');

  // Chat State
  const [chatMessages, setChatMessages] = useState([
    { role: 'model', text: 'Hello! I am your AI English tutor. How are you today?' }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatInput, setChatInput] = useState('');

  // Story Explanation State
  const [isExplaining, setIsExplaining] = useState(false);
  const [explanation, setExplanation] = useState(null);

  // Story Generation State
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [genTopic, setGenTopic] = useState('');
  const [genLevel, setGenLevel] = useState('קל');

  // Daily Tip State
  const [dailyTip, setDailyTip] = useState("Did you know? 'I am' is the shortest complete sentence in the English language.");
  const [isTipLoading, setIsTipLoading] = useState(false);

  // Modals State
  const [showWritingModal, setShowWritingModal] = useState(false);
  const [showGrammarModal, setShowGrammarModal] = useState(false);
  const [showIdiomModal, setShowIdiomModal] = useState(false);

  // Quiz Generation State
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

        setData(prev => ({
          ...prev,
          readingMaterials: [newStory, ...prev.readingMaterials]
        }));

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

      // Start the generated lesson immediately
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

  const closeQuiz = () => {
    setQuizState(prev => ({ ...prev, active: false }));
    setActiveTab('learn');
  };

  return (
    <div className="bg-gray-50 min-h-screen min-w-screen font-sans text-right" dir="rtl">
      {activeTab === 'home' && <HomeView data={data} startLesson={startLesson} dailyTip={dailyTip} isTipLoading={isTipLoading} fetchDailyTip={fetchDailyTip} />}
      {activeTab === 'learn' &&
        <LearnView
          data={data}
          startLesson={startLesson}
          setActiveTab={setActiveTab}
          setShowWritingModal={setShowWritingModal}
          setShowGrammarModal={setShowGrammarModal}
          handleGenerateIdiom={() => setShowIdiomModal(true)}
          handleGenerateQuiz={handleGenerateQuiz}
          isGeneratingQuiz={isGeneratingQuiz}
        />}
      {activeTab === 'abc' && <AbcView setActiveTab={setActiveTab} />}
      {activeTab === 'quiz' && <QuizView quizState={quizState} currentLesson={currentLesson} handleAnswer={handleAnswer} nextQuestion={nextQuestion} closeQuiz={closeQuiz} />}
      {activeTab === 'reading' && (
        <ReadingView
          data={data}
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
        />
      )}
      {activeTab === 'profile' && <ProfileView data={data} />}

      <WritingCoachModal isOpen={showWritingModal} onClose={() => setShowWritingModal(false)} />
      <GrammarLabModal isOpen={showGrammarModal} onClose={() => setShowGrammarModal(false)} />
      <IdiomGeneratorModal isOpen={showIdiomModal} onClose={() => setShowIdiomModal(false)} />

      {activeTab !== 'quiz' && <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  );
};

export default App;