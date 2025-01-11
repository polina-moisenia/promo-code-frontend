import React, { useState, useEffect } from "react";
import GenerateButton from "./components/GenerateButton";
import Header from "./components/Header";
import PromoCodeList from "./components/PromoCodeList";
import "./styles/components.css";
import { initializePromoCodeService, generatePromoCodes } from "./services/promoCodeService";

const App = () => {
  const [promoCodes, setPromoCodes] = useState([]);
  const [error, setError] = useState(null);
  const [generationResult, setGenerationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const setupSignalR = async () => {
      setIsLoading(true);

      try {
        await initializePromoCodeService(
          (result) => {
            setGenerationResult(result);
            setError(null);
          },
          (code) => {
            setPromoCodes((prevCodes) => [...prevCodes, code]);
          }
        );
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError("Failed to connect to the promo code service.");
      }
    };

    setupSignalR();
  }, []);

  const handleGenerate = async () => {
    setPromoCodes([]);
    setGenerationResult(null);
    setError(null);

    try {
      await generatePromoCodes();
    } catch (err) {
      setError("Failed to generate promo codes. Please try again later.");
    }
  };

  return (
    <div className="app-container">
      <Header />
      <GenerateButton isActive={!isLoading} onGenerate={handleGenerate} />
      {error ? (
        <p className="error-message">{error}</p>
      ) : generationResult ? (
        <PromoCodeList promoCodes={promoCodes} />
      ) : (
        <p>Promo codes will appear here.</p>
      )}
    </div>
  );
};

export default App;
