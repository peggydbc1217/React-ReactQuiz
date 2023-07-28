import { useContext, createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useFetchQuestions } from "../hooks/useFetchQuestions";
import { useQuery } from "@tanstack/react-query";

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // 'ready, loading, error, active, finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 0,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: SECS_PER_QUESTION * state.questions.length,
      };
    case "dataReceived":
      return { ...state, status: "ready", questions: payload };
    case "dataFailed":
      return { ...state, status: "error", error: payload };
    case "Correct":
      return {
        ...state,
        answer: payload,
        points: state.points + state.questions[state.index].points,
      };
    case "Wrong":
      return { ...state, answer: payload };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        highscore: state.highscore,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
        highscore:
          state.secondsRemaining === 0
            ? Math.max(state.points, state.highscore)
            : state.highscore,
      };
    default:
      throw new Error("no matching action type");
  }
};

function QuizProvider({ children }) {
  const [
    { status, questions, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, val) => acc + val.points, 0);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get("http://localhost:8000/questions");
  //       dispatch({ type: "dataReceived", payload: response.data });
  //     } catch (error) {
  //       dispatch({ type: "dataFailed" });
  //     }
  //   }

  //   fetchData();
  // }, []);

  //用react-query
  const { isLoading } = useFetchQuestions(dispatch);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const content = useContext(QuizContext);
  if (!content) throw new Error("useQuiz must be used within a QuizProvider");

  return content;
}

export { QuizProvider, useQuiz };
