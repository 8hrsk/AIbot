import 'dotenv/config';
import BotHandler from "./BotHandler.js";
import Llama from './Controllers/LlamaController.js';
import Reader from './Reader.js';

const reader = new Reader();
const instructions = reader.read();

const llamaClient = new Llama('');
const bot = new BotHandler(process.env.TELEGRAM_TOKEN, llamaClient);