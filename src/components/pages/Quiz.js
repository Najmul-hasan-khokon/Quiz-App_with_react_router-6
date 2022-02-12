import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { useAuth } from "../../contexts/AuthContext";
import useQuestion from "../../hooks/useQuestion";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";

const initialState = null;
const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });

      return action.value;

    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionId].options[action.optionIndex].checked =
        action.value;
      return questions;

    default:
      return state;
  }
};

export default function Quiz() {
  /**
   * home page er video theke pawa id useQuestion e pass kore quiz releted sokol kichu get korbo.
   * jeheto ektu boro object tai useReducer use korbo. first of all questions gulake niye dispatch funtion er value
   * property er value hisabe diye dibo. then reducer function e action.value er modde questions gula pabo.
   * then action.value ke forEach ba map kore tar option er vitore ekta checked property diye setar value false kore dibo.
   * 
   * by default sob gula checked false thakbe user checked e click korle dispathc function call hobe and sekhan theke
   * kichu kaj kore reducer e pass kore ekta updated value dibe.
   * 
   *tar por r ekta case answers case nibo ebong sekhane ager state take clone kore pelbo then question er id and 
   options er index onusare checked gula ke true kore dibo jokhon user checkBox e click korbe.
   
   ekta question ses hole porer question e jete ekta currentQuestion state nibo and condition diye setcurrentQuestion e
    prevQuestion ta pabo then seta sathe 1 jog kore porer question e jabo.  same vabe priviouse o kaj korbe just - hobe.
    
    progress er percentage ver kore then user jokhon submit korbe , tokhon sekhane databese reference make kore
    user er uid er againist e qna ba updated state take database e post ba update kore dibo.
    
    then tar sathe updated state ta navigate kore result page e diye dibo.
   */
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { id } = useParams();
  const { loading, error, questions } = useQuestion(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { state } = useLocation(); // videos page theke link er props hisabe state pathaici.
  const [qna, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  // when click on checkbox will be true
  const handleAnswerChange = (e, index) => {
    dispatch({
      type: "answer",
      questionId: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  };

  // handle when user clicks the next button to get the next question
  const nextQuestion = () => {
    if (currentQuestion <= questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  // handle when user clicks the prev button to get back to the previous question
  const prevQuestion = () => {
    if (currentQuestion >= 1 && currentQuestion <= questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  // calculate percentage of progress
  const percentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  // after checked all of questions when user click on submit button to go result page.
  const submit = async () => {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    await set(resultRef, {
      [id]: qna,
    });

    //  checkBox e click korar por updated state ke result page e send korlam.
    navigate(`/result/${id}`, { state: { qna } });
  };

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            input={true}
            options={qna[currentQuestion].options}
            handleAnswerChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            percentage={percentage}
            submit={submit}
          />
          <MiniPlayer id={id} videoTitle={state.videoTitle} />
        </>
      )}
    </>
  );
}
