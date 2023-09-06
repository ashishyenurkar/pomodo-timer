import React, { useState, useEffect } from 'react';
import './PomodoroTimer.css'; 
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';

const PomodoroTimer = () => {
  const [isWorking, setIsWorking] = useState(true);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // Step 1: Add pause state

  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    if (!isPaused) { // Step 3: Check if the timer is not paused
      if (minutes === 0 && seconds === 0) {
        setIsWorking(!isWorking);
        setMinutes(isWorking ? 5 : 25);
      } else {
        timer = setInterval(() => {
          if (seconds === 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            setSeconds(seconds - 1);
          }
        }, 1000);
      }
    }

    return () => clearInterval(timer);
  }, [minutes, seconds, isWorking, isPaused]); // Update dependencies

  const resetTimer = () => {
    setIsWorking(true);
    setMinutes(25);
    setSeconds(0);
  };

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  const handleLogout = async () => {
    const auth = getAuth(); // Get the auth object
    try {
      await signOut(auth); // Use the signOut method from Firebase Authentication
      localStorage.removeItem('logintoken');
      localStorage.removeItem('loginuser');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  const togglePause = () => {
    setIsPaused(!isPaused); // Step 2: Toggle the pause state
  };

  return (
    <div className="timer-container">
      <h1>{isWorking ? 'Work Timer' : 'Break Timer'}</h1>
      <p className="timer">
        {formatTime(minutes)}:{formatTime(seconds)}
      </p>
      <button className="timer-button" onClick={resetTimer}>
        Reset
      </button>
      <button className='timer-button' onClick={togglePause}>
        {isPaused ? 'Resume' : 'Pause'} {/* Toggle button text based on pause state */}
      </button>
      <button className='logout' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default PomodoroTimer;
