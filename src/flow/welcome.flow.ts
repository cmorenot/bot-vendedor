import BotWhatsapp from '@bot-whatsapp/bot';
import { ChatCompletionMessageParam } from 'openai/resources';
import { run, runDeterminate, runDeterminateJSON, runGenerateConfirmFlow} from 'src/services/openai';
import productsFlow from './products.flow';
import offerFlow from './offer.flow';
import orderFlow from './order.flow';
import infoFlow from './info.flow';
import helpFlow from './help.flow';
import { generateTimer } from 'src/util/generateTimer';


const contieneTexto = (cadena:string, texto:string) =>{
    return cadena.includes(texto);
}



export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.WELCOME)
    .addAction(async (ctx, { flowDynamic, state, gotoFlow }) => {
        try {
            const history = (state.getMyState()?.history ?? []) as ChatCompletionMessageParam[] //crea el historial vacio o obtiene el historial
            const ai = await runDeterminateJSON(history)
            console.log('QUE QUIERE JSONNNN:', ai.toLocaleLowerCase())

            const confirnmCompr = await runGenerateConfirmFlow(ai);
            console.log(['CONFIRMACION:'], confirnmCompr)

            // if (confirnmCompr) return gotoFlow(orderFlow);
            
            //await addToSecondSheet(doc, 'asd', 'dasd', 'dasdasd')
            
            
            // if (ai.toLocaleLowerCase().includes('false')) {
            //     return
            // }
            

            // if (ai.toLocaleLowerCase().includes('true')) {
            //     return gotoFlow(orderFlow)
            // }


            
        } catch (err) {
            console.log('[ERROR:]', err)
            return
        }
    })
    .addAction(async (ctx, { flowDynamic, state }) => {
        try {
            const newHistory = (state.getMyState()?.history ?? []) as ChatCompletionMessageParam[] //crea el historial vacio o obtiene el historial
            const name = ctx?.pushName ?? ''

            console.log('[HYSTORY]:', newHistory)
            //tipar la variable history[role, content] y annadir el mensaje del user
            newHistory.push({
                role: 'user',
                content: ctx.body,
            })

            const largeResponse = await run(name, newHistory)//respuesta larga

            const chunks = largeResponse.split(/(?<!\d)\.\s+/g);

            for (const chunk of chunks) {
                await flowDynamic([{ body: chunk.trim(), delay: generateTimer(150, 250) }])
            }

            //tipar la variable history[role, content] y annadir el mensaje del ia
            newHistory.push({
                role: 'assistant',
                content: largeResponse,
            })
            

            await state.update({ history: newHistory })
            



        } catch (err) {
            console.log(err)
        }

    })
