import React, {useEffect, useState} from 'react';
 
import {formatTime} from "./TimeFormat";

const Timer = ({updateTime}) => {
  const [seconds, setSeconds] =  useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer)
    };
  }, [])

  useEffect(() => {
    updateTime(seconds);
  })

  return (
    <div className="timer">
      <p>{formatTime(seconds)}</p>
    </div>
  )
}

export default Timer;