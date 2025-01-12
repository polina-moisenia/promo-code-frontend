import { HubConnectionBuilder } from "@microsoft/signalr";

export class PromoCodeGenerationService {
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

    async generatePromoCodes(count, length, onResult, onCode) {
        await this.connect();

        this.connection.on("GenerationResult", (result) => {
            onResult(result);
        });

        this.connection.on("ReceivePromoCode", (code) => {
            onCode(code);
        });

        try {
            await this.connection.invoke("GeneratePromoCodes", count, length);
        } catch (error) {
            console.error("Failed to invoke GeneratePromoCodes:", error);
            throw new Error("Failed to generate promo codes.");
        }
    }

}
