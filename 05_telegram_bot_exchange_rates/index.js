import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import NodeCache from 'node-cache';
import { currencyButtons } from './components/buttons/index.js';
import { sendExchangeRate } from './components/options/index.js';

const botToken = BOT_TOKEN;
const bot = new TelegramBot(botToken, { polling: true });
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

bot.onText(/\/start/, async (msg) => {
    bot.sendMessage(msg.chat.id, 'Hi. Pick the currency you need 💸\n\n Just click on the appropriate button below 👇', currencyButtons, dataCache())
});

async function dataCache() {
    const bigData = await axios.get('https://api.monobank.ua/bank/currency');
    myCache.set('DATACACHE', bigData.data)
};

bot.on('message', (msg) => {
    switch (msg.text) {
        case 'EUR 💶' : sendExchangeRate(msg, 'EUR', myCache, bot);
        break;
        case 'USD 💵' : sendExchangeRate(msg, 'USD', myCache, bot);
        break;
        }
});

export function updateData() {
    let nIntervId;
    clearInterval(nIntervId);
    nIntervId = null;
    nIntervId = setInterval(() => dataCache(), 300000);
};