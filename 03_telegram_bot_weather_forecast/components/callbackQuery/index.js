import { sendWeatherAtIntervals, sendWeather, getWeather, dataWeather } from "../../index.js";
import { buttonsInterval, buttonsIntervalsMessages } from "../buttons/index.js";

export async function configureIntervals(h, msg, bot) {
    const chatId = msg.chat.id;
    let step = h === 3 ? 1 : 2;
    let time = h === 3 ? 10800000 : 21600000;
    let text = `You will get info every ${h} hours ✌️`
    await sendWeatherAtIntervals(time, step, msg);
    await bot.sendMessage(chatId, text);
};

export async function configureUnits(msg, bot, nIntervId) {
    clearInterval(nIntervId);
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, 'Please choose what format you want to see the weather in:', buttonsInterval);
};

export async function sendWeatherWithInterval(msg, unitName, interval, bot) {
    await getWeather(msg, unitName)
    const chatId = msg.chat.id;
    let unitTemp = unitName === 'metric' ? '°C' : '℉';
    const parseData = dataWeather.reduce((acc, el, i) => {
        const date = new Date(el.dt * 1000);
        const day = (new Date(el.dt * 1000)).toString().match(/\w.{7}\d{1,2}/)[0];
        const time = String(date.getHours()).padStart(2, "0") + ':' + String(date.getMinutes()).padStart(2, "0");
        const temperature = el.main.temp;
        const feelsLike = el.main.feels_like;
        const weather = el.weather[0].main;
        if (!acc[day]) { acc[day] = [] };
        if (interval === 6 && i % 2 === 1) { return acc };
        acc[day].push(`*${time}*, temperature: ${temperature}${unitTemp}, feels like: ${feelsLike}${unitTemp}, weather: ${weather}`);
        return acc;
    }, {});
    let weatherText = '';
    Object.entries(parseData).forEach(([date, info]) => {
        weatherText += `*${date}*\n${info.join('\n')}\n\n`;
    });
    await bot.sendMessage(chatId, weatherText, { parse_mode: 'Markdown' })
    await bot.sendMessage(chatId, 'Would you like to get updates about weather every 3 or 6 hours?', buttonsIntervalsMessages)
};
