import 'dotenv/config';
import BotHandler from "./BotHandler.js";
import GptHandler from './Controllers/GptController.js';
import PhiHandler from './Controllers/PhiController.js';
import Llama from './Controllers/LlamaController.js';

const phiClient = new PhiHandler(process.env.GITHUB_TOKEN);
const gptClient = new GptHandler(process.env.GITHUB_TOKEN);
const llamaClient = new Llama();
const bot = new BotHandler(process.env.TELEGRAM_TOKEN, llamaClient);