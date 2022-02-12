import { Fragment } from "react";
import classes from "../styles/Answers.module.css";
import Checkbox from "./Checkbox";

export default function Answers({ options = [], handleAnswerChange, input }) {
  /**
   *    quiz theke qna er options r  result er question theke answers er options asbe.
   *    qna er gulate checked true kora thakbe r answers er gulate correct true kora thakbe
   *    2ta ke compare kore result show korbe.
   */

  return (
    <div className={classes.answers}>
      {options.map((option, index) => (
        <Fragment key={index}>
          {input ? ( // quiz page e thakle input true thakbe r tokhon checkBox first ta kaj korbe.
            // result page e asle input false thakbe r tokhon 2nd ta kaj korbe.
            // input er value ta props hisabe true , false hardcort kore dichi.
            <Checkbox
              key={index}
              className={classes.answer}
              text={option.title}
              value={index}
              checked={option.checked}
              onChange={(e) => handleAnswerChange(e, index)}
            />
          ) : (
            <Checkbox
              key={index}
              className={`${classes.answer} ${
                // nested ternery use hoice.
                option.correct
                  ? classes.correct
                  : option.checked
                  ? classes.wrong
                  : null
              }`}
              text={option.title}
              defaultChecked={option.checked}
              disabled // checkbox always disable thakbe result page e.
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
