const env = require('../.env')
const schedule = require('node-schedule')
const telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const Telegram = require('telegraf/telegram')

const telegram = new Telegram(env.token)
const bot = new telegraf(env.token)

let contador = 1

const botoes = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('cancelar', 'cancel')
]))

const notificar = () =>{
    telegram.sendMessage(env.userId, `Essa e uma msg agendada ${contador++}`,botoes)
}
//const notificacao = new schedule.scheduleJob('*/1 * * * *',notificar)

bot.action('cancel',ctx =>{
    notificacao.cancel()
    ctx.reply("Ok envios canceladas")
})


//


const alerta = ()=>{
    telegram.sendMessage(env.userId,'msg para 15:39')
}

const enviar = new schedule.scheduleJob({hour: 15, minute: 53},alerta)


bot.startPolling()


//Cron-style Scheduling

// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)



// RecurrenceRule properties
// second (0-59)
// minute (0-59)
// hour (0-23)
// date (1-31)
// month (0-11)
// year
// dayOfWeek (0-6) Starting with Sunday