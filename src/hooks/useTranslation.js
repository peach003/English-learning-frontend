// src/hooks/useTranslation.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useTranslation = (text, sourceLang, targetLang) => {
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!text) return;

    const translate = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`
        );
        setTranslation(response.data.responseData.translatedText);
      } catch (err) {
        setError("Translation failed");
      } finally {
        setLoading(false);
      }
    };

    translate();
  }, [text, sourceLang, targetLang]);

  return { translation, loading, error };
};

export default useTranslation;