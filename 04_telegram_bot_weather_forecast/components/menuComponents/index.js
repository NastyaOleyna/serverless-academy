import { buttonForCity, buttonsInterval, unitsButton } from "../buttons/index.js";

export async function onStart(bot, msg) {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, 'Hello. This is a Telegram Bot to keep track for weather forecast 🏖', buttonForCity);
};

export async function onHelp(bot, msg) {
    const chatId = msg.chat.id;
    const text = "This is a Telegram Bot which could help you to keep track for weather forecast in Kyiv.\n" +
        "Here you can ask me to send you weather forecast at special interval.\n\n" +
        "So you could get weather forecast every 3 or every 6 hours.\n" +
        "Choose your interval 👇"
    await bot.sendMessage(chatId, text, buttonsInterval);
};

export async function onStop(bot, msg, nIntervId) {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, "I've stopped sending you weather forecast 🤐 If you want to see what is the weather in Kyiv right now just enter /start");
    clearInterval(nIntervId);
};

export async function onChangeInterval(bot, msg) {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, 'Here you can change how often you would like to get weather forecast 👇', buttonsInterval);
};
export async function onChangeUnit(bot,msg){
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, 'What kind of units would be more comfortable for you?', unitsButton);
};

