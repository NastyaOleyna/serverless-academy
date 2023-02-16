import { updateData } from "../../index.js";


export async function sendExchangeRate (msg, curr, cache, bot) {
    const chatId = msg.chat.id;
    const currency = curr === 'USD' ? 840 : 978;
    const dataCache = cache.data.DATACACHE.v;
    const [filteredCache] = dataCache.filter(el => el.currencyCodeA === currency && el.currencyCodeB === 980)
    await bot.sendMessage(chatId, `💰 Buy: ${filteredCache.rateBuy} UAH \n\n 🏦 Sell: ${filteredCache.rateSell} UAH`)
    updateData();
}