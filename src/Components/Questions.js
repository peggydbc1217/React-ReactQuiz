import Options from "./Options";
import { useQuiz } from "../Context/QuizContext";
function Questions() {
  const { questions, index } = useQuiz();
  const question = questions[index];

  return (
    <div>
      <h4>{question.question}</h4>
      <Options></Options>
    </div>
  );
}

export default Questions;
