import React, { useState, useEffect } from "react";
import { initializePromoCodeService, generatePromoCodes } from "./services/promoCodeService";
import PromoCodeList from "./components/PromoCodeList";
import GenerateButton from "./components/GenerateButton";
import Header from "./components/Header";
import "./styles/components.css";

const App = () => {
  const [promoCodes, setPromoCodes] = useState([]);
  const [generationResult, setGenerationResult] = useState(null); // null = no request yet
  const [error, setError] = useState(null);

  useEffect(() => {
    const setupSignalR = async () => {
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
      } catch (err) {
        setError("The promo code service is currently unavailable.");
      }
    };

    setupSignalR();
  }, []);

  const handleGenerate = async () => {
    setPromoCodes([]);
    setGenerationResult(null);
    setError(null);

    try {
      await generatePromoCodes(5, 8);
    } catch (err) {
      setError("Failed to generate promo codes. Please try again later.");
    }
  };

  return (
    <div className="app-container">
      <Header />
      <GenerateButton onGenerate={handleGenerate} />
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
