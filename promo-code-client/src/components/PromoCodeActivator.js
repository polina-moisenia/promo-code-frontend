import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { createConnection } from "../services/signalRService";

const PromoCodeActivator = () => {
  const [promoCode, setPromoCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const conn = createConnection(process.env.REACT_APP_PROMO_CODE_USAGE_URL);
    setConnection(conn);

    return () => {
      conn.stop();
    };
  }, []);

  const handleUseCode = async () => {
    if (!connection) return;

    try {
      const success = await connection.invoke("UsePromoCode", promoCode);
      if (success) {
        setResult(`Promo code ${promoCode} used successfully`);
        setError(null);
        setPromoCode("");
      } else {
        setError("Invalid promo code");
        setResult(null);
      }
    } catch (err) {
      console.error("Error invoking UsePromoCode:", err);
      setError("Error: Unable to process the promo code");
      setResult(null);
    }
  };

  return (
    <div>
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
