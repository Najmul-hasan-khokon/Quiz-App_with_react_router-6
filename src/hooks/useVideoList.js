import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
import { useEffect, useState } from "react/cjs/react.development";

const useVideoList = (page) => {
  /**
   * jeheto databse niye kaj eta ekta side effect tai useEffect() use korbo.
   * then jeheto database e request ekta asynchornous task tai async function likhbo tar vitore
   * getDatabase diye database refference make korbo .
   * ref er modde 2ta peramiter ney first peramiter e pura database reference dibo and second peramiter e
   *   pura database er ekta specipic node e hit korbo. then
   * query() korbo first peramiter e reference dibo and second peramiter e kivabe data gula pete cai seta bole
   * dibo like orderByKey() orthat ami key er maddome data pete cai. then startAt(1) koto number video theke start
   * korbe number ta string hote hobe and limitoFirst(8) koyta dekhabe.
   *
   * then jeheto error asar sombabona ache tai try catch block use korbo.
   * snapshot.val() er vitore amra data pabo.
   * snapshot.exists() true , false return kore . true hole tar mane data chole asce.
   * then ekta state e to data rakte hobe tai setVideos() er vitore prevVideos pabo then retrun er vitore
   * array akare pabo [...prevVideos, ...object.values(snapshot.val())]
   */

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true); // video r ache kina seta track korar jonno.

  useEffect(() => {
    async function fetchVideos() {
      // database releted word
      const db = getDatabase();
      const videosRef = ref(db, "videos");
      const videoQuery = query(
        videosRef,
        orderByKey(),
        startAt("" + page), // string value dite hobe startAt e.
        limitToFirst(6)
      );

      try {
        setError(false);
        setLoading(true);
        // request to firebase for getting videos
        const snapshot = await get(videoQuery);
        setLoading(false);

        if (snapshot.exists()) {
          // copy the values immutably
          setVideos((prevVideos) => {
            return [...prevVideos, ...Object.values(snapshot.val())];
          });
        } else {
          setHasMore(false); // sokol videos load howa ses hole setHasMore false korbe.
        }
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    }

    fetchVideos();
  }, [page]); // page er value jokhon change hobe tokhon useEffect() reRender hobe.

  return { loading, error, videos, hasMore };
};

export default useVideoList;
