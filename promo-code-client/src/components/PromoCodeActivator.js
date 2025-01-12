import React, { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { PromoCodeUsageService } from "../services/promoCodeUsageService";

const PromoCodeActivator = () => {
  const [promoCode, setPromoCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const service = new PromoCodeUsageService(process.env.REACT_APP_PROMO_CODE_USAGE_URL);

  const handleUseCode = async () => {
    setError(null);
    setResult(null);

    try {
      const success = await service.usePromoCode(promoCode);
      if (success) {
        setResult("Promo code used successfully!");
      } else {
        setError("Promo code has already been used or is invalid.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="promo-code-activator">
      <div className="input-container">
        <InputField
          type="text"
          value={promoCode}
          onChange={setPromoCode}
          placeholder="Enter promo code"
        />
        <Button onClick={handleUseCode}>Activate</Button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {result && <p className="result-message">{result}</p>}
    </div>
  );
};

export default PromoCodeActivator;
