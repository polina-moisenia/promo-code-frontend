import React, { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import PromoCodeList from "./PromoCodeList";
import { PromoCodeGenerationService } from "../services/promoCodeGenerationService";

const PromoCodeGenerator = () => {
  const [count, setCount] = useState(5);
  const [length, setLength] = useState(8);
  const [promoCodes, setPromoCodes] = useState([]);
  const [error, setError] = useState(null);
  const [generationResult, setGenerationResult] = useState(null);

  const service = new PromoCodeGenerationService(process.env.REACT_APP_PROMO_CODE_GENERATION_URL);

  const handleGenerate = async () => {
    setError(null);
    setPromoCodes([]);
    setGenerationResult(null);

    try {
      await service.generatePromoCodes(
        count,
        length,
        (result) => {
          setGenerationResult(result);
          if (!result) {
            setError("Failed to generate promo codes.");
          }
        },
        (code) => {
          setPromoCodes((prev) => [...prev, code]);
        }
      );
    } catch (err) {
      setError(err.message);
      setGenerationResult(false);
    }
  };

  return (
    <div className="promo-code-section">
      <div className="input-container">
        <InputField
          type="number"
          value={count}
          onChange={setCount}
          placeholder="Number of codes"
          label="Number of promo codes to generate"
        />
        <InputField
          type="number"
          value={length}
          onChange={setLength}
          placeholder="Code length"
          label="Length of each promo code"
        />
        <Button onClick={handleGenerate}>Generate</Button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {generationResult === true && promoCodes.length > 0 && <PromoCodeList promoCodes={promoCodes} />}
      {generationResult === null && promoCodes.length === 0 && !error && (
        <p className="placeholder-text">No promo codes generated yet. Start by clicking "Generate".</p>
      )}
    </div>
  );
};

export default PromoCodeGenerator;
