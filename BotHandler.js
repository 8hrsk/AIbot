import { Telegraf } from 'telegraf'

class BotHandler {
    constructor(API_TOKEN, gptClient) {
        this.bot = new Telegraf(API_TOKEN);
        this.gptClient = gptClient

        this.bot.on('message', message => this.handle(message));

        this.bot.launch();
    }

    handle(message) {
        const chatType = message.update.message.chat.type
        const messageText = message.update.message.text
        const chatId = message.update.message.chat.id

        if (chatType === 'private') {
            this.gptClient.sendRequest(messageText, (response) => {
                this.sendMessage(chatId, response);
                console.log(`${chatType}: ${messageText} -> ${response}`, chatId);
            });
            return;
        }

        if (messageText.includes('@eighthoursbot')) {
            this.gptClient.sendRequest(messageText, (response) => {
                this.sendMessage(chatId, response);
                console.log(`${chatType}: ${messageText} -> ${response}`, chatId);
            });
        }

        return;
    }

    sendMessage(chatId, message) {
        this.bot.telegram.sendMessage(chatId, message);
    }
}

export default BotHandler