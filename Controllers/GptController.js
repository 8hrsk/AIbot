import OpenAI from "openai";
import Status from "./StatusController.js";

class GptHandler {
    constructor(API_TOKEN) {
        this.client = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com",
            apiKey: API_TOKEN
          });
    }

    async sendRequest(message, callback) {
        const status = new Status();
        const response = await this.client.chat.completions.create({
            messages: [
              { role:"user", content: message }
            ],
            model: "gpt-4o",
            temperature: 1,
            max_tokens: 4096,
            top_p: 1
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

export default GptHandler