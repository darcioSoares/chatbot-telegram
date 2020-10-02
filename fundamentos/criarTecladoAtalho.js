const env = require('../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

//botoes que disparam acoes

let contagem = 0

const botoes = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('+1', "add 1"),
    Markup.callbackButton('+10', "add 10"),
    Markup.callbackButton('+100', "add 100"),
    Markup.callbackButton('-1', "sub 1"),
    Markup.callbackButton('-10', "sub 10"),
    Markup.callbackButton('-100', "sub 100"),
    Markup.callbackButton('zerar', "reset"),
    Markup.callbackButton('resultado', "result"),
    Markup.callbackButton('teste', "20")
],{columns: 3}))


bot.start(async ctx =>{
    await ctx.reply(`seja bem vindo`)
    await ctx.reply(`A contagem atual esta em ${contagem}`,
    botoes )
})

//estou pegado valor inteiro q vem depois do add 
// + fala q deve ter ao menos 1 numero
bot.action(/add (\d+)/gi, ctx=>{
    contagem += parseInt(ctx.match[1])
    ctx.reply(` contagem é ${contagem}`, botoes)

    console.log(ctx.match)
    
})

bot.action(/sub (\d+)/gi, ctx=>{
    contagem -= parseInt(ctx.match[1])
    ctx.reply(` contagem é ${contagem}`, botoes)
})

bot.action('reset', ctx=>{
    contagem = 0
    ctx.reply(` contagem é ${contagem}`, botoes)
})

bot.action('result', ctx=>{    
    ctx.answerCbQuery(`A contagem atual é ${contagem}`)
})

//
bot.action('20', ctx=>{    
    console.log(ctx.match)
    ctx.reply(` contagem so observo teste`)
})

bot.on('text',ctx=>{
    console.log(ctx)
   let value = ctx.update.message.from.first_name
    ctx.reply("so testando" + value)
})


bot.startPolling()