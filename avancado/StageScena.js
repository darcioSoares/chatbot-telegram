const env = require('../.env')
const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const {enter, leave} = Stage
const bot = new Telegraf(env.token)


bot.start(ctx =>{
    const name = ctx.update.message.from.first_name
    ctx.reply(` Seja bem vindo ${name}`)
    ctx.reply(`Entre com /echo ou /soma para iniciar`)    
})

// criando uma sessao 
// entrando na sena echo esses sao os comandos bot ira realizar
const echoScene = new Scene('echo')
echoScene.enter(ctx => ctx.reply(`Entrando em echo Scene`))
echoScene.leave(ctx=>ctx.reply(`Saindo de echo Scene`))
echoScene.command('sair', leave())
echoScene.on('text',ctx =>ctx.reply(ctx.message.text))
echoScene.on('message', ctx=>ctx.reply("Apenas texto"))

//echoScene.command('sair', leave())

//// criando sena soma

let sum = 0

const sumScene = new Scene('sum')
sumScene.enter(ctx => ctx.reply(`Entando em sum scene`))
sumScene.leave(ctx=>ctx.reply(`Saindo de sum Scene`))


// esse middleware se aplicara quando entrar na sena sum
sumScene.use(async (ctx, next)=>{
    await ctx.reply(`Voce esta em sum, escreva numeros`)
    await ctx.reply(`Outros comandos: /zerar /sair`)

    next()
})

sumScene.command('zerar', ctx =>{
    sum = 0
    ctx.reply(`Valor: ${sum}`)
})

sumScene.command('sair', leave())

sumScene.hears(/(\d+)/, ctx =>{
    sum += parseInt(ctx.match[1])
    ctx.reply(`Valor esta em ${sum}`)
})

sumScene.on('message', ctx=>ctx.reply(`Apenas numeros, por favor`))

//stage = palco para acontecer as senas
const stage = new Stage([echoScene,sumScene])
bot.use(session())
bot.use(stage.middleware())

//para que ocora o uso das senas precisa da sessao e do palco
// bot.use(session()) 
// bot.use(stage.middleware())

// criando comandos para entrar nas senas
bot.command('soma', enter('sum'))
bot.command('echo',enter('echo'))

//caso ele não entre nas senas 
bot.on('message', ctx=>{
    ctx.reply('Para entrar nas senas dig /soma or /echo')
})

bot.startPolling()