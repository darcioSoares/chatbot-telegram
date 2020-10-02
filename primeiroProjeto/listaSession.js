const env = require('../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const session = require('telegraf/session')
const bot = new Telegraf(env.token)



const gerarBotoes = lista => Extra.markup(
    Markup.inlineKeyboard(
        lista.map(item => Markup.callbackButton(item, `delete ${item}`)),
        {columns:3}
    )
)

bot.use(session())

bot.start(async ctx => {
    let name = ctx.update.message.from.first_name
    await ctx.reply(`seja bem vindo ${name}`)
    await ctx.reply(`escreva os itens para add a lista....`)
    await ctx.reply(`Caso deseje excluir, click encima do nome`)
    ctx.session.lista = []
})

bot.on('text', async ctx =>{
    const msg = await ctx.update.message.text
    await ctx.session.lista.push(msg)
    await ctx.reply(`${msg} add com sucesso`,gerarBotoes(ctx.session.lista))    
})

bot.action(/delete (.+)/, ctx => {
    ctx.session.lista = ctx.session.lista.filter(item => item !== ctx.match[1])
    ctx.reply(`${ctx.match[1]} deletado com sucesso`, gerarBotoes(ctx.session.lista))
})

bot.startPolling()