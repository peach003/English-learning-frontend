import { useState, useEffect } from "react";
import axios from "axios"; // Keep axios if we make an API call

const useWordDefinition = (word) => {
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!word) return;

    const fetchDefinition = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        setDefinition(response.data[0]?.meanings[0]?.definitions[0]?.definition || "Definition not found.");
      } catch (err) {
        setError("Failed to fetch definition.");
      } finally {
        setLoading(false);
      }
    };

    fetchDefinition();
  }, [word]);

  return { definition, loading, error };
};

export default useWordDefinition;
