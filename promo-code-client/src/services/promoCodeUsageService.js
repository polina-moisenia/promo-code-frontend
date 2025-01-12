import { HubConnectionBuilder } from "@microsoft/signalr";

export class PromoCodeUsageService {
  constructor(url) {
    this.connection = new HubConnectionBuilder()
      .withUrl(url)
      .withAutomaticReconnect()
      .build();
  }

  async connect() {
    if (this.connection.state !== "Connected") {
      await this.connection.start();
    }
  }

  async usePromoCode(code) {
    await this.connect();

    try {
      const result = await this.connection.invoke("UseCode", code);
      return result;
    } catch (error) {
      throw new Error("Failed to use promo code. Try again later.");
    }
  }
}
