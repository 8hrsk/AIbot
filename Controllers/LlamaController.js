import axios from "axios"
import Status from "./StatusController.js";
import ResponseController from "./ResponseController.js";

class Llama {
    constructor(instructions) {
        this.instructions = instructions;
        this.status = new Status();
    }

    async sendRequest(message, callback) {
        const response = await axios.post("http://localhost:8080/v1/chat/completions", {
            "model": "gpt-4",
            "messages": [
                {
                    "role": "user",
                    "content": this.instructions + message,
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

        const responseController = new ResponseController(response.data.choices[0].message.content);

        callback(responseController.message());
        console.log(responseController.Instruction());
    }
}

export default Llama