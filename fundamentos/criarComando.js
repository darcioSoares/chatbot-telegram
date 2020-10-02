const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.command('ajuda',ctx =>{
    ctx.reply('\n /op1'
    + '\n/op2')
})

bot.hears('/aj', ctx=> ctx.reply(" testando ajuda"))

bot.hears(/op(1|2|3)/i, ctx =>ctx.reply("op1 op2"))

bot.startPolling()