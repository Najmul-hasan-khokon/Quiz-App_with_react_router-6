import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

const useAnswers = (videoId) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchAnswers() {
      // database releted work
      const db = getDatabase();
      const answerRef = ref(db, `answers/${videoId}/questions`);

      const answerQuery = query(answerRef, orderByKey());

      try {
        setError(false); //
        setLoading(true); //
        // request firebase database
        const snapshot = await get(answerQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setAnswers((prevAnswers) => {
            return [...prevAnswers, ...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        setLoading(false);
        setError(true); // "there was an answer error"
      }
    }
    fetchAnswers();
  }, [videoId]);

  return {
    loading,
    error,
    answers,
  };
};

export default useAnswers;
