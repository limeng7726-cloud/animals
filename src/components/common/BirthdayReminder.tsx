import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Gift, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSound } from '../../hooks/useSound';
import { Animal } from '../../types';

interface BirthdayReminderProps {
  animal: Animal;
}

const BirthdayReminder: React.FC<BirthdayReminderProps> = ({ animal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [daysUntil, setDaysUntil] = useState<number | null>(null);
  const [isToday, setIsToday] = useState(false);
  const playSound = useSound();

  useEffect(() => {
    if (!animal.birthday) return;

    const today = new Date();
    const currentYear = today.getFullYear();
    const [birthYear, birthMonth, birthDay] = animal.birthday.split('-').map(Number);
    
    // Create date object for this year's birthday
    const thisYearBirthday = new Date(currentYear, birthMonth - 1, birthDay);
    
    // Reset hours to compare just dates
    today.setHours(0, 0, 0, 0);
    thisYearBirthday.setHours(0, 0, 0, 0);

    // If birthday has passed this year, look at next year
    let nextBirthday = thisYearBirthday;
    if (today > thisYearBirthday) {
      nextBirthday = new Date(currentYear + 1, birthMonth - 1, birthDay);
    }

    const diffTime = nextBirthday.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setDaysUntil(diffDays);
    
    // Check if today is birthday
    if (diffDays === 0) {
      setIsToday(true);
      setIsVisible(true);
      // Play celebration sound and confetti if it's today
      setTimeout(() => {
        playSound('success');
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF69B4', '#FFD700', '#FF4500', '#FFFFFF']
        });
      }, 1000);
    } else {
       setIsToday(false);
    }
  }, [animal.birthday, playSound]);

  if (!animal.birthday) return null;

  const today = new Date();
  const dateString = today.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

  return (
    <>
      {/* Birthday Countdown / Today Display */}
      <div className="fixed top-24 right-4 z-40 hidden md:flex flex-col gap-2 items-end">
        {/* Date Display */}
        <motion.div
           initial={{ x: 100, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ delay: 0.2 }}
           className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-stone-100 text-stone-600 text-sm font-bold flex items-center"
        >
          <Calendar size={14} className="mr-2 text-orange-500" />
          {dateString}
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`p-4 rounded-2xl shadow-lg border backdrop-blur-sm flex items-center gap-3 ${
            isToday 
              ? 'bg-orange-500/90 border-orange-400 text-white' 
              : 'bg-white/90 border-orange-100 text-stone-700'
          }`}
        >
          <div className={`p-2 rounded-full ${isToday ? 'bg-white/20' : 'bg-orange-100 text-orange-500'}`}>
            {isToday ? <Gift size={20} className="animate-bounce" /> : <Calendar size={20} />}
          </div>
          <div>
            <div className="text-xs font-bold opacity-80 uppercase tracking-wider">
              {animal.name}的生日
            </div>
            <div className="font-bold text-lg leading-none">
              {isToday ? (
                <span>今天生日快乐！🎂</span>
              ) : (
                <span>还有 <span className="text-xl">{daysUntil}</span> 天</span>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Birthday Popup Modal (Only on the day) */}
      <AnimatePresence>
        {isVisible && isToday && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden"
            >
              {/* Decorative Background */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-orange-100 to-white -z-10"></div>
              
              <button 
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={20} className="text-stone-500" />
              </button>

              <motion.div 
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="w-24 h-24 mx-auto bg-white rounded-full p-1 shadow-lg mb-4"
              >
                <img 
                  src={animal.avatar_url} 
                  alt={animal.name} 
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>

              <h2 className="text-3xl font-bold font-handwriting text-orange-600 mb-2">
                今天是{animal.name}的生日！
              </h2>
              <p className="text-stone-600 mb-6">
                让我们一起为它送上最美好的祝福吧！<br/>
                愿它永远健康快乐，罐罐吃不完！
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    confetti({
                        particleCount: 100,
                        spread: 60,
                        origin: { y: 0.7 }
                    });
                    playSound('success');
                  }}
                  className="px-6 py-2 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-colors flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0"
                >
                  <Gift size={18} className="mr-2" /> 再次撒花
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="px-6 py-2 bg-stone-100 text-stone-600 rounded-full font-bold hover:bg-stone-200 transition-colors"
                >
                  我知道啦
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BirthdayReminder;
