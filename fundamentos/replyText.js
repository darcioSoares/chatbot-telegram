const env = require('../.env')
const Telegraf = require('telegraf')
const moment = require('moment')
const bot = new Telegraf(env.token)



bot.hears('pizza', ctx => ctx.reply(" 🍕 opa"))
bot.hears(['pao','frango'], ctx =>ctx.reply("pao ou frango"))
bot.hears('🐷', ctx=>ctx.reply("bacon  🐷"))

bot.hears(/burguer/i, ctx=>ctx.reply("🍔"))
bot.hears([/salada/i, /temaki/i], ctx=>ctx.reply("salada e temaki"))

bot.hears(/teste/i, ctx =>{ctx.reply("teste")
    console.log(ctx)
})

bot.startPolling()