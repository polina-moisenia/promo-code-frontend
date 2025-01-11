import { HubConnectionBuilder } from "@microsoft/signalr";

const backendUrl = process.env.REACT_APP_PROMO_CODE_SERVICE_URL;
let connection;

export const initializePromoCodeService = async (onGenerationResult, onPromoCodeReceived) => {
  connection = new HubConnectionBuilder()
    .withUrl(backendUrl)
    .withAutomaticReconnect()
    .build();

  try {
    await connection.start();
    console.log("Connected to SignalR hub!");

    connection.on("GenerationResult", (result) => {
      onGenerationResult(result);
    });

    connection.on("ReceivePromoCode", (code) => {
      onPromoCodeReceived(code);
    });
  } catch (error) {
    console.error("Error connecting to SignalR hub:", error);
    throw error;
  }
};

export const generatePromoCodes = async () => {
  if (connection) {
    const request = {
      count: 5, // TODO: update
      length: 8, // TODO: update
    };

    try {
      await connection.invoke("GeneratePromoCodes", request.count, request.length);
    } catch (error) {
      console.error("Error invoking GeneratePromoCodes:", error);
      throw error;
    }
  } else {
    console.error("Connection is not established.");
  }
};
