import { useState, useEffect, useRef } from "react";

const Timer = (props) => {
  const [timerComplete, setTimerComplete] = useState(false);
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef(null);

  const startTimer = (time) => {
    const countdownDate = new Date(time).getTime();

    interval.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        setTimerComplete(true);
        clearInterval(interval.current);
      } else {
        //update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);

    // console.log(interval);
  };

  const stopTimer = () => {
    // console.log("in stop: ", interval.current);
    clearInterval(interval.current);
  };

  useEffect(() => {
    stopTimer();

    startTimer(props);
    return () => {
      clearInterval(interval.current);
    };
  }, [props]);

  return { timerDays, timerHours, timerMinutes, timerSeconds, timerComplete };
};

export default Timer;
