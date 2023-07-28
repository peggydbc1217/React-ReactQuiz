import { useEffect } from "react";
import { useQuiz } from "../Context/QuizContext";

function Timer() {
  const { secondsRemaining, dispatch } = useQuiz();
  const min = Math.floor(secondsRemaining / 60);
  const sec = secondsRemaining % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <div className="timer">
      {min < 10 && "0"}
      {min} :{sec < 10 && "0"}
      {sec}
    </div>
  );
}

export default Timer;
