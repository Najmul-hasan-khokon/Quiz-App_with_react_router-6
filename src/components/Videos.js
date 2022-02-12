import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import useVideoList from "../hooks/useVideoList";
import Video from "./Video";

export default function Videos() {
  const [page, setPage] = useState(1);
  const { loading, error, hasMore, videos } = useVideoList(page);

  return (
    <div>
      {loading && videos.length < 1 && <div>Loading....</div>}
      {!loading && videos.length === 0 && <div>No data found! </div>}
      {error && <div>There was an error!</div>}

      {videos.length > 0 && (
        <InfiniteScroll
          dataLength={videos.length} // pura data length bolte hobe.
          next={() => setPage(page + 6)} // 6ta kore video load hobe.
          hasMore={hasMore} // false mane video load howa ses.
          loader={<div style={{ color: "red" }}>Loading...</div>}
        >
          {videos.map((video) =>
            // noq 0 er theke boro hole link dibo othewise dibo na.
            video.noq > 0 ? (
              <Link
                to={`/quiz/${video.youtubeID}`}
                state={{ videoTitle: video.title }} // state props to quiz page
                key={video.youtubeID}
              >
                <Video
                  noq={video.noq}
                  title={video.title}
                  youtubeId={video.youtubeID}
                />
              </Link>
            ) : (
              <Video
                key={video.youtubeID}
                noq={video.noq}
                title={video.title}
                youtubeId={video.youtubeID}
              />
            )
          )}
        </InfiniteScroll>
      )}
    </div>
  );
}

// <div className={classes.videos}>
//     {videos.length > 0 && (
//       videos.map((video) =>

//           video.noq > 0 ? (
//             <Link
//               to={`/quiz/${video.youtubeID}`}
//               state={{ videoTitle: video.title }}
//               key={video.youtubeID}
//             >
//               <Video
//                 noq={video.noq}
//                 title={video.title}
//                 youtubeId={video.youtubeID}
//               />
//             </Link>
//           ) : (
//             <Video
//               key={video.youtubeID}
//               noq={video.noq}
//               title={video.title}
//               youtubeId={video.youtubeID}
//             />
//           )
//         )
//     )}

// </div>
