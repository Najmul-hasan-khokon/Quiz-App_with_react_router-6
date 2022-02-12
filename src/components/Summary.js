import { useMemo } from "react";
import successImage from "../assets/images/success.png";
import useFetch from "../hooks/useFetch";
import classes from "../styles/Summary.module.css";

export default function Summary({ score, noq }) {
  /**
   * getKeyword er vitorer jinis gula jate bar bar reRender na hoy , se jonno useMemo() use korci.
   * getKeyword jodi function hoto tahole bar bar call hoto tai sokol kichu useMemo te use kore ja return korbe
   * sob ekbar e getKeyword variable e peye jabo. and eta ekbar call hobe.
   *
   * ei rokom choto khato function er jonno useMemo dorkar nai karon etaro kichu const ache.
   *
   * then sekhane kichu score and noq diye kichu calculation kore return er value ta
   * pexels er api er query peramiter e diye dichi.
   *
   * usePetch call korar somoy url, method and headers diye dibo. headers hisabe authorization e api key dibo.
   *
   * custom hook er maddome sokol kaj taj kore then ekta loading, error and result state return korbe jekhane value pabo
   * then sei result e jodi value thake tahole seta dekhabo. na thakle default ekta image ache seta dekhabo.
   */

  const getKeyword = useMemo(() => {
    //console.log("summery"); // 4 bar call hobe function ta. etake optimization korte hole useMemo use korbo.
    if ((score / (noq * 5)) * 100 < 50) {
      // 0 < 50
      return "faileds";
    } else if ((score / (noq * 5)) * 100 < 75) {
      // 50 < 100
      return "good";
    } else if ((score / (noq * 5)) * 100 < 100) {
      // 75 < 100
      return "very good";
    } else {
      // 100
      return "excellent";
    }
  }, [score, noq]);

  const { loading, error, result } = useFetch(
    `https://api.pexels.com/v1/search?query=${getKeyword}&per_page=1`,
    "GET",
    {
      Authorization: "563492ad6f917000010000017c3229e5ae204594a01c29e7ecc95b67",
    }
  );

  // result?      kichu photos jodi na dey se jonno ekta ke optional korlam
  const image = result ? result?.photos[0].src.medium : successImage;

  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        <p className={classes.score}>
          Your score is <br /> {score} out of {noq * 5}
        </p>
      </div>

      {loading && <div>Loading your badge...</div>}
      {error && <div className={classes.badge}>An error occured!</div>}
      {!loading && !error && (
        <div className={classes.badge}>
          <img src={image} alt="Success" />
        </div>
      )}
    </div>
  );
}
