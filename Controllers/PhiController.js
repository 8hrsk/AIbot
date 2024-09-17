import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import Status from "./StatusController.js";

class PhiHandler {
    constructor(API_TOKEN) {
        this.client = new ModelClient(
            "https://models.inference.ai.azure.com",
            new AzureKeyCredential(API_TOKEN)
          );
    }

    async sendRequest(message, callback) {
        const status = new Status();
        status.success();

        const response = await this.client.path("/chat/completions").post({
            body: {
                messages: [
                    { role: "user", content: message }
                ],
                model: "Phi-3.5-mini-instruct",
                temperature: 0,
                max_tokens: 4096,
                top_p: 1
            }
          }).catch((error) => {
            status.fail();
            console.log('NSFW or rate limit')
          });
        
          if (status.getStatus() === false) {
            callback('Bad request. Maybe, your prompt contains NSFW content or bot is being rate limited. Please, try again later');
            return;
          }

          callback(response.choices[0].message.content);
    }
}

export default PhiHandler