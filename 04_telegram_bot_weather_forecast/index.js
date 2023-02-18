import TelegramBot from 'node-telegram-bot-api';
import { onStart, onHelp, onStop, onChangeInterval, onChangeUnit } from './components/menuComponents/index.js';
import axios from 'axios';
import { buttonsInterval, buttonsIntervalsMessages, unitsButton } from './components/buttons/index.js';
import { configureIntervals, configureUnits, sendWeatherWithInterval } from './components/callbackQuery/index.js';

const botToken = process.env.BOT_TOKEN; 
const apiToken = process.env.API_TOKEN;
const bot = new TelegramBot(botToken, { polling: true });

let nIntervId;
export let dataWeather = [];
let index = 0;
let units = 'metric';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

bot.onText(/\/start/, async (msg) => {
    onStart(bot, msg);
});

bot.onText(/\/help/, async (msg) => {
    onHelp(bot, msg);
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
bot.onText(/\/weathernow/, async (msg) => {
    sendWeather(bot, msg, units);
});

bot.on('callback_query', async (callbackQuery) => {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    const chatId = msg.chat.id;
    switch (action) {
        case 'now':
            sendWeather(bot, msg, units);
            break;
        case 'interval3':
            sendWeatherWithInterval(msg, units, 3, bot)
            break;
        case 'interval6':
            sendWeatherWithInterval(msg, units, 6, bot);
            break;
        case '3':
            configureIntervals(3, msg, bot);
            break;
        case '6':
            configureIntervals(6, msg, bot);
            break;
        case 'rejection':
            bot.sendMessage(chatId, 'Ok. See you later 👋');
            break;
        case 'city':
            await bot.sendMessage(chatId, 'What kind of units would be more comfortable for you?', unitsButton);
            break;
        case 'metric':
            units = 'metric';
            configureUnits(msg, bot, nIntervId);
            break;
        case 'imperial':
            units = 'imperial';
            configureUnits(msg, bot, nIntervId);
            break;
    }
});

export async function getWeather(unit) {
    const data = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?appid=${apiToken}&lat=50.4501&lon=30.523333&units=${unit}`)
    dataWeather = data.data.list
};

export function sendWeatherAtIntervals(t, step, msg) {
    index = index + step
    if (!dataWeather[index]) {
        getWeather(units);
        index = 0;
    };
    clearInterval(nIntervId);
    nIntervId = null;
    nIntervId = setInterval(() => sendWeather(msg, index, units), t);
};
export async function sendWeather(bot, msg, unitName) {
    const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=50.4501&lon=30.523333&appid=${apiToken}&units=${unitName}`)
    let unitTemp = unitName === 'metric' ? '°C' : '℉';
    let unitSpeed = unitName === 'metric' ? 'km/h' : 'mph';
    let main = data.data.main;
    const chatId = msg.chat.id;
    const weatherText =
        `🌡️ Temperature: ${main.temp} ${unitTemp}\n` +
        `🤔 Feels like: ${main.feels_like} ${unitTemp}\n` +
        `🥶 Min temperature: ${main.temp_min} ${unitTemp}\n` +
        `🥵 Max temperature: ${main.temp_max} ${unitTemp}\n` +
        `😬 Pressure: ${main.pressure}\n` +
        `🧖‍♀️ Humidity: ${main.humidity}%\n` +
        `🌦 Sky: ${data.data.weather[0].main}\n` +
        `☁️ Clouds: ${data.data.clouds.all}\n` +
        `💨 Wind speed: ${data.data.wind.speed} ${unitSpeed}\n` +
        `👀 Visibility: ${data.data.visibility}`;
    await bot.sendMessage(chatId, weatherText);
};