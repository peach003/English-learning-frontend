import { useState, useEffect } from "react";
import axios from "axios";

const APP_ID = "3a347ce2"; // 你的 Oxford API ID
const APP_KEY = "3b75dbee2ab018dd3dd1c9814e1bc81f"; // 你的 Oxford API Key
const BASE_URL = "https://od-api-sandbox.oxforddictionaries.com/api/v2";
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"; // 临时 CORS 代理

const useOxfordDictionary = (word, sourceLang = "en", targetLang = "zh") => {
  const [definition, setDefinition] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!word) return;
    const lowerCaseWord = word.toLowerCase();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 获取单词定义
        const definitionResponse = await axios.get(`${CORS_PROXY}${BASE_URL}/entries/en-us/${lowerCaseWord}`, {
          headers: {
            "app_id": APP_ID,
            "app_key": APP_KEY,
          },
        });

        const fetchedDefinition =
          definitionResponse.data.results[0]?.lexicalEntries[0]?.entries[0]?.senses[0]?.definitions[0] ||
          "未找到定义";
        setDefinition(fetchedDefinition);

        // 获取单词翻译
        const translationResponse = await axios.get(`${CORS_PROXY}${BASE_URL}/translations/en/zh/${lowerCaseWord}`, {
          headers: {
            "app_id": APP_ID,
            "app_key": APP_KEY,
          },
        });

        const fetchedTranslation =
          translationResponse.data.results[0]?.lexicalEntries[0]?.entries[0]?.senses[0]?.translations[0]?.text ||
          "未找到翻译";
        setTranslation(fetchedTranslation);
      } catch (err) {
        setError("获取数据失败，请检查单词拼写或 API 限制");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [word, sourceLang, targetLang]);

  return { definition, translation, loading, error };
};

export default useOxfordDictionary;
