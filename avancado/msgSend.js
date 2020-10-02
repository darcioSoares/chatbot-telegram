const env = require('../.env')
const Telegram = require('telegraf/telegram')
const axios = require('axios')
const Markup = require('telegraf/markup')

// envio de msg assicronoas

const enviarMsg = msg =>{
    axios.get(`${env.apiUrl}/sendMessage?chat_id=${env.userId}&text=${encodeURI(msg)}`)
    .catch(e=> console.log(e))
}

enviarMsg('enviando teste assicrono novamente')

const teclado = Markup.keyboard([
    ["ok","Cancelar"]
]).resize().oneTime().extra()

const telegram = new Telegram(env.token)
telegram.sendMessage(env.userId,"Essa esou instanciando telegram", teclado)

//

setInterval(() => {
    enviarMsg("msg pelo interval")
},5000);