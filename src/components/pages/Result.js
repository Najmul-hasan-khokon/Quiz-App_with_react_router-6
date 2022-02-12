import _ from "lodash";
import { useLocation, useParams } from "react-router-dom";
import useAnswers from "../../hooks/useAnswers";
import Analysis from "../Analysis";
import Summary from "../Summary";

export default function Result() {
  /**
   * check korar pore useNavigate theke jeta age pass korcilam sei updated state ke recieve korlam.
   *
   * qna er vitore cheked true kora ache r answers e correct true kora ache.
   *
   * answers and qna ke compare kore score update korci.
   */
  const { id } = useParams();
  const { state } = useLocation();
  const { qna } = state;
  const { loading, error, answers } = useAnswers(id); // ager id onusare answers node e hit korbo.

  // total score function
  function calculateScore() {
    let score = 0;

    answers.forEach((question, index1) => {
      let correctIndexes = [],
        checkedIndexes = [];

      question.options.forEach((option, index2) => {
        // option.correct gula jei index e ache sei index ta just correctIndexes e push kore dibo.
        if (option.correct) {
          correctIndexes.push(index2);
        }

        /** answers er index diye qna er index er sathe mathc kore then checked gula true hole
         checkedIndexes er modde answer er index push kore . then option er checked true kore dichi. */
        if (qna[index1].options[index2].checked) {
          checkedIndexes.push(index2);
          option.checked = true; // answer er vitore checked gula true kore dichi.
        }
      });

      if (_.isEqual(correctIndexes, checkedIndexes)) {
        // 2ta array soman hole score count hobe.
        // 2ta array compare korte lodash er function use korte pari.
        score = score + 5;
      }
    });

    return score;
  }

  const userScore = calculateScore();

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}
      {answers && answers.length > 0 && (
        <>
          <Summary score={userScore} noq={answers.length} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
}
