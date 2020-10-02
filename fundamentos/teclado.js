const env = require('../.env')
const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

const tecladoCarne = Markup.keyboard([
    ["🐖 porco","🐮 vaca"],
    ["🐔 galina", "🐥 pinto"],
    ["🐟 peixe", "🐢 tartaruga"]
]).resize().extra()
// resize vai fazer teclado oculpar a tela inteira conversa
// extra vai renderizar teclado

bot.start(async ctx=>{
    let name = ctx.update.message.from.first_name
    await ctx.reply(`seja bem vindo ${name}`)
    await ctx.reply(`escolha uma bebida?`,
    Markup.keyboard(["suco","cha"]).resize()
    .oneTime().extra()
    )
})

bot.hears(['suco','cha'],async ctx=>{
    await ctx.reply("boa bebida!")
    await ctx.reply('qual a sua comida preferira ?',
    tecladoCarne )
})

bot.hears(["🐮 vaca","🐢 tartaruga"], ctx=>{
    ctx.reply("vaca ou tartaruga muito bom")
})

bot.on('text', ctx =>ctx.reply("legal"))

bot.startPolling()