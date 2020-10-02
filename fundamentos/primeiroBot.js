const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)


//poderia passar next()
bot.start(ctx =>{
    let from = ctx.update.message.from
    ctx.reply(`seja bem vindo,${from.first_name}`)
})

bot.on('text',async (ctx, next)=>{
    await ctx.reply("Texte 1")
    next()
})

bot.on('text', (ctx)=>{
    ctx.reply("Texte 2")
})




bot.startPolling()