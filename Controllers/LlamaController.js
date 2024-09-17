import axios from "axios"
import Status from "./StatusController.js";

class Llama {
    constructor() {
        this.status = new Status();
    }

    async sendRequest(message, callback) {
        const response = await axios.post("http://localhost:8080/v1/chat/completions", {
            "model": "gpt-4",
            "messages": [
                {
                    "role": "user",
                    "content": message,
                    "temperature": 0.1
                }
            ]
        }).catch((error) => {
            this.status.fail();
            console.log('NSFW or rate limit')
        });

        if (this.status.getStatus() === false) {
            callback("Bad request.\n\nServer responded with an error.")
        }

        callback(response.data.choices[0].message.content);
    }
}

export default Llama