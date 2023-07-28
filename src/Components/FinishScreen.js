import { useQuiz } from "../Context/QuizContext";

function FinishScreen() {
  const { points, maxPossiblePoints, dispatch, highscore } = useQuiz();
  let precentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (precentage === 100) emoji = "🥳";
  else if (precentage >= 80) emoji = "😀";
  else if (precentage >= 60) emoji = "😐";
  else if (precentage >= 40) emoji = "😕";
  else if (precentage >= 0 && precentage < 40) emoji = "😕";
  else if (precentage === 0) emoji = "😭";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(precentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </>
  );
}

export default FinishScreen;
