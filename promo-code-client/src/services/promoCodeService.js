import { HubConnectionBuilder } from "@microsoft/signalr";
import { SIGNALR_HUB_URL } from "../config";

let connection;

export const initializePromoCodeService = async (onGenerationResult, onPromoCodeReceived) => {
  connection = new HubConnectionBuilder()
    .withUrl(SIGNALR_HUB_URL)
    .withAutomaticReconnect()
    .build();

  await connection.start();

  connection.on("GenerationResult", (result) => {
    onGenerationResult(result);
  });

  connection.on("ReceivePromoCode", (code) => {
    onPromoCodeReceived(code);
  });
};

export const generatePromoCodes = async (count, length) => {
  if (connection) {
    await connection.invoke("GeneratePromoCodes", count, length);
  } else {
    throw new Error("Connection is not established.");
  }
};
