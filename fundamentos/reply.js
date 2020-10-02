const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(async ctx =>{
    let name = ctx.update.message.from
    await ctx.reply(`seja bem vindo ${name.first_name} 😁`)

    await ctx.replyWithHTML(`<a href="https://core.telegram.org/api">teste</a>`)
    // so algumas tags funcionan

    await ctx.replyWithMarkdown('*darcio*')

    await ctx.replyWithPhoto({source: `${__dirname}/image/eu.jpg`}, {caption: "ola que cara lindo"})
})



bot.startPolling();