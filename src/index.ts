import BotWhatsapp from '@bot-whatsapp/bot';
import database from './database';
import provider from './provider';
import flow from './flow';
import "dotenv/config"


const main = async() =>{
 await BotWhatsapp.createBot({
    database: database,
    flow: flow,
    provider: provider,
 })
}

main()