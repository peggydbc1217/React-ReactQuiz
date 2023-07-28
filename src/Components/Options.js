import { useQuiz } from "../Context/QuizContext";

function Options() {
  const { questions, answer, index, dispatch } = useQuiz();
  const hasAnswered = answer !== null;
  const question = questions[index];

  const isAnswer = function (i) {
    return i === answer ? "answer" : "";
  };

  const isCorrect = function (i) {
    if (hasAnswered) {
      return i === question.correctOption ? "correct" : "wrong";
    }
  };

  function handleIsCorrect(i) {
    dispatch({
      type: `${question.correctOption === i ? "Correct" : "Wrong"}`,
      payload: i,
    });
  }

  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${isAnswer(i)} ${isCorrect(i)}`}
          key={option}
          onClick={() => handleIsCorrect(i)}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
