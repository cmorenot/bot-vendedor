import BotWhatsapp from '@bot-whatsapp/bot';
import helloFlow from './hello.flow';
import productsFlow from './products.flow';
import orderFlow from './order.flow';
import offerFlow from './offer.flow';
import helpFlow from './help.flow'; 
import infoFlow from './info.flow';
import welcomeFlow  from './welcome.flow';


export default BotWhatsapp.createFlow(
    [
        helloFlow,
        welcomeFlow,
        offerFlow,
        orderFlow,
        productsFlow,
        infoFlow,
        helpFlow,
    ]
)