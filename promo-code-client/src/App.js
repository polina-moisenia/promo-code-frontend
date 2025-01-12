import React from "react";
import PromoCodeGenerator from "./components/PromoCodeGenerator";
import PromoCodeActivator from "./components/PromoCodeActivator";
import "./styles/components.css";

const App = () => {
  return (
    <div className="app-container">
      <div className="promo-code-section">
        <PromoCodeGenerator />
      </div>
      <div className="promo-code-activator">
        <PromoCodeActivator />
      </div>
    </div>
  );
};

export default App;
