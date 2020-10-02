const env = require('../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

let lista = []

const botoes = ()=> Extra.markup(
    Markup.inlineKeyboard(
        lista.map(item => Markup.callbackButton(item,`delete ${item}`)),
        {columns: 3}
    )
)

bot.start(async ctx => {
    let name = ctx.update.message.from.first_name
    await ctx.reply(`seja bem vindo ${name}`)
    await ctx.reply(`escreva os itens que voce deseja adicionar....`)
    await ctx.reply(`Caso deseje excluir algun item, click em cima dele`)
})

bot.on('text', ctx => {
    lista.push(ctx.update.message.text)
    ctx.reply(`${ctx.update.message.text} adicionado`, botoes())
})

bot.action(/delete (.+)/, ctx=>{
    lista = lista.filter(item =>  item!== ctx.match[1])
    ctx.reply(`${ctx.match[1]} deletado`, botoes())
})

bot.startPolling()