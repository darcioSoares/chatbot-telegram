const env = require('../.env')
const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const {enter, leave} = Stage
const bot = new Telegraf(env.token)





bot.startPolling()