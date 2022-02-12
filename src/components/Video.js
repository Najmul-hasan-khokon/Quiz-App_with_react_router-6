import classes from "../styles/Video.module.css";

export default function Video({ noq, title, youtubeId }) {
  // youtube thumbnail api diye database theke image niye asci.

  return (
    <div className={classes.video}>
      <img
        src={`http://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
        alt="Video Title"
      />
      <p>{title}</p>
      <div className={classes.qmeta}>
        <p>{noq} Questions</p>
        <p>Total Points : {noq * 5}</p>
      </div>
    </div>
  );
}
