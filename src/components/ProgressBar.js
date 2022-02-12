import { useRef, useState } from "react";
import classes from "../styles/ProgressBar.module.css";
import Button from "./Button";

export default function ProgressBar({ next, prev, percentage, submit }) {
  /**
   * mouseOver korle toggleTooltip fucntion ta call hobe and condition check korbe by default
   * tooptip jeheoto false ache tai else e chole jabe sokol kaj kore then setTooltip er value ke true kore dibe.
   *
   * then jokhon mouseOut hobe tokhon toggleTooltip fucntion abar call hobe and ekhon jeheto
   * tooptip er value true ache tai if block e dukbe then tooltip ke display none kore abar
   * setTooptip er value ta false kore dibo.
   *
   *
   *  4ta question complete hole submit function call hobe otherwise next function call hobe.
   */
  const [tooltip, setTooltip] = useState(false);
  const tooltipRef = useRef();

  // toogleTooltip  function
  function toggleTooltip() {
    if (tooltip) {
      tooltipRef.current.style.display = "none";
      setTooltip(false);
    } else {
      tooltipRef.current.style.left = `calc(${percentage}% - 65px)`;
      tooltipRef.current.style.display = "block";
      setTooltip(true);
    }
  }

  return (
    <div className={classes.progressBar}>
      <div className={classes.backButton} onClick={prev}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>

      <div className={classes.rangeArea}>
        <div className={classes.tooltip} ref={tooltipRef}>
          {`${percentage}`}% Complete!
        </div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            style={{ width: `${percentage}%` }} // percentage er width
            onMouseOver={toggleTooltip}
            onMouseOut={toggleTooltip}
          ></div>
        </div>
      </div>

      {/* <Link to="/result"> */}
      <Button
        className={classes.next}
        onClick={percentage === 100 ? submit : next}
      >
        <span>{percentage === 100 ? "Submit" : "Next Question"}</span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
      {/* </Link> */}
    </div>
  );
}
