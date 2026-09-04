import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // استرجاع الوقت المتبقي من localStorage
    const storedTime = localStorage.getItem('timeRemaining');
    if (storedTime) {
      const timeRemaining = JSON.parse(storedTime);
      const currentTime = new Date().getTime();
      const elapsed = currentTime - timeRemaining.timestamp;

      const totalSeconds = timeRemaining.totalSeconds - Math.floor(elapsed / 1000);
      if (totalSeconds > 0) {
        setMinutes(Math.floor(totalSeconds / 60));
        setSeconds(totalSeconds % 60);
      } else {
        setMessage('الوقت انتهى!');
      }
    } else {
      setMinutes(10); // الوقت الأساسي 10 دقائق
      setSeconds(0);
    }
  }, []);

  useEffect(() => {
    const totalSeconds = minutes * 60 + seconds;

    // تخزين الوقت المتبقي في localStorage
    if (totalSeconds > 0) {
      localStorage.setItem(
        'timeRemaining',
        JSON.stringify({ totalSeconds, timestamp: new Date().getTime() })
      );
    } else {
      localStorage.removeItem('timeRemaining');
      setMessage('الوقت انتهى!');
    }

    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  return (
    <div className='text-center'>
      <h2 className='font-bold text-green-500'>
        Code Verify : {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
      </h2>
      {message && <h2 className='font-bold text-red-500'>{message}</h2>}
    </div>
  );
};

export default Timer;
