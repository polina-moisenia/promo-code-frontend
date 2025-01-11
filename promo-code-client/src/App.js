import React, { useState, useEffect } from "react";
import GenerateButton from "./components/GenerateButton";
import Header from "./components/Header";
import PromoCodeList from "./components/PromoCodeList";
import "./styles/components.css";
import { initializePromoCodeService, generatePromoCodes } from "./services/promoCodeService";

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
            setError(null); // Clear any previous error
          },
          (code) => {
            setPromoCodes((prevCodes) => [...prevCodes, code]);
          }
        );
      } catch (err) {
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
