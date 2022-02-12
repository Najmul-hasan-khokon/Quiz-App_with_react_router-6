import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

const useQuestion = (youtubeId) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      // database releted works
      const db = getDatabase();
      const questionsRef = ref(db, `quiz/${youtubeId}/questions`);
      const questionsQuery = query(questionsRef, orderByKey());

      try {
        setLoading(true);
        setError(false);
        // request to firebase for getting questions
        const snapshot = await get(questionsQuery);
        setLoading(false);

        if (snapshot.exists()) {
          setQuestions((prevQuestions) => {
            return [...prevQuestions, ...Object.values(snapshot.val())];
          });
        }
      } catch (error) {
        // console.log(error);
        setError(true);
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [youtubeId]);

  return {
    loading,
    error,
    questions,
  };
};

export default useQuestion;
