import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();
  const [funfacts, setFunfacts] = useState<string[]>([]);
  const [funfact, setFunfact] = useState<string | null>(null);

  const getStoredLanguage = () => localStorage.getItem("i18nextLng") || "ja";

  const updateFunFacts = () => {
    const funFactKeys = Array.from({ length: 8 }, (_, i) => `funFacts.fact${i + 1}`);
    return funFactKeys.map((key) => t(key));
  };

  useEffect(() => {
    const storedLanguage = getStoredLanguage();
    i18n.changeLanguage(storedLanguage);

    const updatedFunfacts = updateFunFacts();
    setFunfacts(updatedFunfacts);
    setFunfact(updatedFunfacts[0] || null);
  }, [i18n]);

  const handleClick = () => {
    if (funfacts.length > 0) {
      const randomFact = funfacts[Math.floor(Math.random() * funfacts.length)];
      setFunfact(randomFact);
    }
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("i18nextLng", selectedLanguage);

    const updatedFunfacts = updateFunFacts();
    setFunfacts(updatedFunfacts);
    setFunfact(updatedFunfacts[0] || null);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-3 lg:p-4 gap-16 lg:gap-32">
      <h1 className="font-bold text-4xl lg:text-6xl">{t("title")}</h1>
      <p className="h-[300px] text-center flex justify-center items-center text-3xl lg:text-4xl">
        {funfact || t("noFunFact")}
      </p>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded transition-transform duration-300 hover:scale-105 hover:from-purple-600 hover:to-blue-600 active:scale-95"
      >
        {t("btn_text")}
      </button>
      <select
        onChange={handleLanguageChange}
        value={getStoredLanguage()}
        className="fixed top-4 right-4 px-2 py-1 border rounded bg-gradient-to-r from-green-400 to-blue-500 text-white cursor-pointer transition-transform duration-300 hover:scale-105 hover:from-green-500 hover:to-blue-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {["ja", "vi", "en"].map((lang) => (
          <option key={lang} value={lang} className="text-black">
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
