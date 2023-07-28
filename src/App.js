import Header from "./Components/Header";
import StartScreen from "./Components/StartScreen";
import Main from "./Components/UI/Main";
import Footer from "./Components/UI/Footer";
import Questions from "./Components/Questions";
import Error from "./Components/Error";
import Loader from "./Components/UI/Loader";
import NextButton from "./Components/UI/NextButton";
import Progress from "./Components/Progress";
import FinishScreen from "./Components/FinishScreen";
import Timer from "./Components/Timer";
import { useQuiz } from "./Context/QuizContext";

function App() {
  const { status } = useQuiz();

  return (
    <>
      <div className="app">
        <Header></Header>

        <Main>
          {status === "loading" && <Loader></Loader>}
          {status === "ready" && <StartScreen></StartScreen>}
          {status === "active" && (
            <>
              <Progress></Progress>
              <Questions></Questions>
              <Footer>
                <Timer></Timer>
                <NextButton></NextButton>
              </Footer>
            </>
          )}
          {status === "error" && <Error></Error>}
          {status === "finished" && <FinishScreen></FinishScreen>}
        </Main>
      </div>
    </>
  );
}

export default App;
