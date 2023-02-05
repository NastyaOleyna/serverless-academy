const TelegramBot = require('node-telegram-bot-api');
const { program } = require('commander');
const fs = require('fs')

const token = '6048568427:AAEQpWB5xnLo6-Ik0DPUr7-K6Jf8f6Htp4g';
const bot = new TelegramBot(token, { polling: true });


const chatId = fs.readFileSync('databaseID.txt', 'utf-8', (e, data) => {
    if (e) throw e
    return data;
});

if(!chatId){
    console.log('Hello. Please type "/start" in chat with Telegram Bot to start the app');
    bot.on('message', (msg) => {
        const chatId = msg.from.id
        if (msg.text === '/start') {
            fs.writeFileSync('databaseID.txt', `${chatId}`, (e) => { if (e) throw e })
            
            setTimeout(() => {
                process.exit(0);
            }, 1000)
        }
    })
}



program
    .command('send-message')
    .argument('<message>')
    .description('Send message to Telegram Bot')
    .action(async (msg) => {
        await bot.sendMessage(chatId, msg);
        process.exit();
    })

program
    .command('send-photo')
    .argument('<photo>')
    .description('Send photo to Telegram Bot. Just drag and drop it in console')
    .action(async (msg) => {
        await bot.sendPhoto(chatId, msg)
        process.exit();
    })

if (process.argv.length >= 3) {
    program.parse();
}
