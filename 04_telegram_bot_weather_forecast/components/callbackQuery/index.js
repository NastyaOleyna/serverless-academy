import { sendWeatherWithIntervals, sendWeather, getWeather } from "../../index.js";
import { buttonsInterval } from "../buttons/index.js";

export async function configureIntervals(h, msg, bot) {
    const chatId = msg.chat.id;
    let step = h === 3 ? 1 : 2;
    let time = h === 3 ? 10800000 : 21600000;
    let text = `You will get info every ${h} hours ✌️`
    await sendWeatherWithIntervals(time, step, msg);
    await bot.sendMessage(chatId, text);
};

export async function configureUnits(msg, index, unitName,bot, nIntervId) {
    clearInterval(nIntervId);
    const chatId = msg.chat.id;
    await getWeather(unitName);
    await sendWeather(msg, index, unitName);
    await bot.sendMessage(chatId, 'Please choose how often you would like to get info about weather:', buttonsInterval);
}