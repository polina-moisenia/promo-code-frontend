import { HubConnectionBuilder } from "@microsoft/signalr";

export const createConnection = (url) => {
  const connection = new HubConnectionBuilder()
    .withUrl(url)
    .withAutomaticReconnect()
    .build();

  connection.start()
    .then(() => console.log("SignalR connection established"))
    .catch((err) => console.error("SignalR connection error:", err));

  return connection;
};

export const stopConnection = (connection) => {
  connection.stop()
    .then(() => console.log("SignalR connection stopped"))
    .catch((err) => console.error("Error stopping SignalR connection:", err));
};