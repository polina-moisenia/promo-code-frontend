import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { createConnection } from "../services/signalRService";

const PromoCodeGenerator = () => {
  const [count, setCount] = useState(10);
  const [length, setLength] = useState(8);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const conn = createConnection(process.env.REACT_APP_PROMO_CODE_GENERATION_URL);
    setConnection(conn);

    return () => {
      conn.stop();
    };
  }, []);

  const handleGenerate = async () => {
    if (!connection) {
      setError("Connection not established");
      return;
    }

    if (!count || !length || count <= 0 || length <= 0) {
      setError("Both fields must have positive numbers");
      return;
    }

    try {
      const success = await connection.invoke("GeneratePromoCodes", count, length);
      if (success) {
        setResult("Generation succeeded");
        setError(null);
      } else {
        setError("Failed to generate promo codes");
        setResult(null);
      }
    } catch (err) {
      setError("Error: Unable to generate promo codes");
      setResult(null);
    }
  };

  return (
    <div>
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
      {result && <p className="result-message">{result}</p>}
    </div>
  );
};

export default PromoCodeGenerator;
