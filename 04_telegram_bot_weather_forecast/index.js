import * as dotenv from 'dotenv'
import TelegramBot from 'node-telegram-bot-api';
import { onStart, onHelp, onStop, onChangeInterval, onChangeUnit } from './components/menuComponents/index.js';
import axios from 'axios';
import { buttonsInterval, unitsButton } from './components/buttons/index.js';
import { configureIntervals, configureUnits } from './components/callbackQuery/index.js';

const botToken = '5957881656:AAGKMLNv09SbZPYx0BsDPClACG62_V0iwu0';
const apiToken = '750f30cbd9d1e566082ae8e3b5c21c0f';
const bot = new TelegramBot(botToken, { polling: true });

let nIntervId;
let dataWeather = [];
let index = 0;
let units = '';


bot.onText(/\/start/, async (msg) => {
    onStart(bot, msg);
});

bot.onText(/\/help/, async (msg) => {
    onHelp(bot, msg)
});

bot.onText(/\/stop/, async (msg) => {
    onStop(bot, msg, nIntervId);
});

bot.onText(/\/changeinterval/, async (msg) => {
    onChangeInterval(bot, msg);
});
bot.onText(/\/changeunit/, async (msg) => {
    onChangeUnit(bot, msg);
});

bot.on('callback_query', async (callbackQuery) => {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    const chatId = msg.chat.id;
    let text = '';
    switch (action) {
        case '3':
            configureIntervals(3, msg, bot);
            break;
        case '6':
            configureIntervals(6, msg, bot);
            break;
        case 'city':
            await bot.sendMessage(chatId, 'What kind of units would be more comfortable for you?', unitsButton);
            break;
        case 'metric':
            units = 'metric';
            configureUnits(msg, index, 'metric', bot, nIntervId);
            break;
        case 'imperial':
            units = 'imperial';
            configureUnits(msg, index, 'imperial', bot, nIntervId);
            break;
    }

});

export async function getWeather(unit) {
    const data = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?appid=${apiToken}&lat=50.4501&lon=30.523333&units=${unit}`)
    dataWeather = data.data.list
}

export async function sendWeather(msg, index, unitName) {
    let unitTemp = unitName === 'metric' ? '°C' : '℉';
    let unitSpeed = unitName === 'metric' ? 'km/h' : 'mph';
    let main = dataWeather[index].main;
    const chatId = msg.chat.id;
    const weatherText =
        `🌡️ Temperature: ${main.temp} ${unitTemp}\n` +
        `🤔 Feels like: ${main.feels_like} ${unitTemp}\n` +
        `🥶 Min temperature: ${main.temp_min} ${unitTemp}\n` +
        `🥵 Max temperature: ${main.temp_max} ${unitTemp}\n` +
        `😬 Pressure: ${main.pressure}\n` +
        `🌊 Sea level: ${main.sea_level}\n` +
        `⛰️ Ground level: ${main.grnd_level}\n` +
        `🧖‍♀️ Humidity: ${main.humidity}%\n` +
        `🌦 Sky: ${dataWeather[index].weather[0].main}\n` +
        `☁️ Clouds: ${dataWeather[index].clouds.all}\n` +
        `💨 Wind speed: ${dataWeather[index].wind.speed} ${unitSpeed}\n` +
        `👀 Visibility: ${dataWeather[index].visibility}`;
    bot.sendMessage(chatId, weatherText);
};

export function sendWeatherWithIntervals(t, step, msg) {
    index = index + step
    if (!dataWeather[index]) {
        getWeather(units);
        index = 0;
    }
    clearInterval(nIntervId);
    nIntervId = null;
    nIntervId = setInterval(() => sendWeather(msg, index, units), t);
}