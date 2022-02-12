import { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import classes from "../styles/MiniPlayer.module.css";

export default function MiniPlayer({ id, videoTitle }) {
  /**
   * react e dom niye kaj korle sorasori dom e hat na diye setar ekta ref make kore setar modde ekta current object
   * pabo then . diye setar modde onek kichu remove ba add korte parbo.
   *
   * ekta toggle ache progress e mouseOver ba mouseOut korle toggleMiniPlayer call hobe then user mouse IN ba Out kina
   * seta check korar jono ekta state nilam . sei state e value er upore defend kore ref take update korlam.
   *
   * video id er againist e ekta video play korbo. react player pakege install korle
   * ReactPlayer namok ekta component pabo then sekhane tar onek gula props ache segula pass kore diye
   * setar full control nite parbo.
   */

  const [status, setStatus] = useState(false);
  const buttonRef = useRef(); // eta diye dom releted kaj kora hoy.
  const videoUrl = `https://www.youtube.com/watch?v=${id}`;

  function toggleMiniPlayer() {
    if (!status) {
      // status true na hole ei block e dukbe.
      buttonRef.current.classList.remove(classes.floatingBtn);
      setStatus(true);
    } else {
      buttonRef.current.classList.add(classes.floatingBtn);
      setStatus(false);
    }
  }

  return (
    <div
      className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      ref={buttonRef}
      onClick={toggleMiniPlayer}
    >
      <span className={`material-icons-outlined ${classes.open}`}>
        play_circle_filled
      </span>
      <span className={`material-icons-outlined ${classes.close}`}>close</span>
      <ReactPlayer
        // className={classes.img}
        url={videoUrl}
        width="300px"
        height="168px"
        playing={status}
        controls
      />
      {/* <img src={`https://www.youtube.com/watch?v=${id}`} alt="Alt Tag" /> */}
      {/* <p>#23 React Hooks Bangla - React useReducer hook Bangla</p> */}
      <p>{videoTitle}</p>
    </div>
  );
}
