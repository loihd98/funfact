import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();
  const [funfacts, setFunfacts] = useState<string[]>([]);
  const [funfact, setFunfact] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the language from localStorage or default to English
    const storedLanguage = localStorage.getItem("i18nextLng") || "en";
    i18n.changeLanguage(storedLanguage);

    const updatedFunfacts = Array.from({ length: 8 }, (_, i) =>
      t(`funFacts.fact${i + 1}`)
    );
    setFunfacts(updatedFunfacts);
    setFunfact(updatedFunfacts[0] || null); // Set the first fun fact as default
  }, [i18n.language, t]);

  const handleClick = () => {
    const randomFact = funfacts[Math.floor(Math.random() * funfacts.length)];
    setFunfact(randomFact);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("i18nextLng", selectedLanguage); // Store the selected language in localStorage
  };

  return (
    <div className="w-full h-screen flex items-center justify-center p-3 lg:p4 flex-col gap-[64px] lg:gap-[120px]">
      <span className="font-bold text-4xl lg:text-6xl">{t("title")}</span>
      <p className="h-[300px] text-center flex justify-center items-center text-3xl  lg:text-4xl ">
        {funfact}
      </p>
      <button
        onClick={handleClick}
        className="px-4 cursor-pointer py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded transform transition-transform duration-300 hover:scale-105 hover:from-purple-600 hover:to-blue-600 active:scale-95"
      >
        {t("btn_text")}
      </button>
      <select
        onChange={handleLanguageChange}
        value={localStorage.getItem("i18nextLng") || "en"} // Use value instead of defaultValue to reflect changes dynamically
        className="fixed top-4 right-4 px-2 py-1 border rounded bg-gradient-to-r from-green-400 to-blue-500 text-white cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:from-green-500 hover:to-blue-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="en" className="text-black">EN</option>
        <option value="ja" className="text-black">JA</option>
        <option value="vi" className="text-black">VI</option>
        {/* Add more languages as needed */}
      </select>
    </div>
  );
}

export default App;
