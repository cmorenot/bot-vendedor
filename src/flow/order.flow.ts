import BotWhatsapp from '@bot-whatsapp/bot';
import { ChatCompletionMessageParam } from 'openai/resources';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { getDay } from 'date-fns';


const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file',
];

const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9Jfsh9XKyXQyC\n/t7oXMUczd9HMmAvaXxi4Gf51HEylf5CHLZ7XLEOenuGNaO2oZI3drTwpjeeARMT\nAmtQJrp0LHlxBvdVTRFsjQ8ioZ39OlFA7wJXAQWM7iHeOGTwJYhWrJHrR+bRw1X1\nm1SgCSb2E48On0Jq6EDeSrM5N4gBGmVug2TgBOfQzZVoRNg/9O+54WZwp7Vlu/Ei\n7Fodx+UDYmoTam6h5RYk74k6IILY1ZRLYA1crOkndnKQ4LYLwwkogi5ifDsBRWf7\nYmjgAhI8o5rbTyXYmRC1z+JIvRCZ0IdP8VkFlJzVMdr8n7gimFSTGUjvuTH8AnIe\nK6yIOs2rAgMBAAECggEADFWYuHswB+Tndvdgg9iLhg2qx2gdO5pDtpLu/4H/VmQk\n7hy/OEYwHu3qdjMIl6qWRVr5Vk67MROIMeTQ01Y4hxuLWSKHfcmGdFoH0vilESlS\nDnZHjx2Nm3C/8U94zZbfpX9KuK65+j3PB4gh5ERp2lbQ17bs9tm/Dn/ii2hNTH0A\n9jTXA2yPJE0Y72tz44OVPBJ2N40ovwtPbDuudhL021yvKQkwnGwW5T56c3KH2kM3\nPQ7U1JNtzMOPgjImtm0Y25QCC4IPudg9Jy1YiOwIYNk+ZvC7qSEeXnx7gE1mwQaJ\nrDLu0yu2J0pf5ONWq3sF+A4ima71Jg780PH7K4onkQKBgQD1zsrJGgQKyqLrvm7c\nUH0QgDkRjSFXXaJhmFHYTinDFcnBKmw5OsTcG49sDEGdDVFnbBN0rTos5D//b1n6\noAcNxvVoJLFrMSExDBOiH/6NFo0ne6Knj6juTnWubIBEilSrnpQEg6aaXTPYYlcY\na/Fyy3vFmFoIaxtXkFfX7MD2+QKBgQDE/cI9UAXIBuQf0YwlkbGcwUX0pVglMVQt\nMK9PsBq2WHLUnX7wR44/RJ2mvOrHt3wtp5ECyW4UmyWUwBtGHl9llhd9SkPwYp+N\naHBmAz/X1xmXKflKjttHWMkAZcwyzmm++coXGiC6G3jq3ajAsLM2+aq7ZnQZHK9s\nLyKN7pmewwKBgQCzI7wiB3W+r6NAj46XvYkHx4rPwbz0wOagnbO4Im7JIE3jGxm4\nM55YkzVZFy2SWaxj5R3gwIZPRSFm9S3sO0gowEEFXwh2CF4aMqT0WMDY7gB9L9uA\npnAFDOUy8xwf13iRgoZ5K8D1astn/XNf9vsGIEnZ3Yhv7i8FB8sdMAwJcQKBgB9f\nHkDvboxFdK0QjRYqlrOVIBPvBROfQH2V5EV3kTl66oarslyHuMKgpc65BVbbBL6s\nke50r8A+WQTQd0d6bMzb00/TtPAidLBrcoL8f31bNysYtyfFimxZWmFi1Ns+fh64\n3xNAyPd6io400LwnJ9NYfXUsws6A//rlosYhuntLAoGBAIcgsKZeW30g+Kv7dLbU\n2eBrdqX5peSEAjlzOkYkTox9nALNNo0pS3i2/stqOQ76Q5a/5Z+15y7N570+BANV\ngPJCWfWr7Vaar4O6DbH3F31cmh5csDpPID3Bk25ee9Og0RQsdIstsoP9MT9YPnPP\ntK8DMgmNnJA38TzDIVNlaEe3\n-----END PRIVATE KEY-----\n";

const client_email = "google-sheet-data-bw@proyecto-boot-409803.iam.gserviceaccount.com";

const id_doc = "19zV2wPhhKAOAWUOitifoTWSW1vgt1mp_0WeCmFl9AkM";


const jwt = new JWT({
    email: client_email,
    // email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: private_key,
    // key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: SCOPES,
});


const doc = new GoogleSpreadsheet(id_doc, jwt);


async function salvar(doc, fecha, whatsapp, descripcion) {
    await this.doc.loadInfo();
    const sheet = this.doc.sheetsByIndex[1]; // the first sheet

    const newOrder = await sheet.addRow({
        fecha: fecha,
        whatsapp: whatsapp,
        descripcion: descripcion,
      });

  };


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)


.addAction(async (ctx, {flowDynamic, state, gotoFlow }) => {
    try {
        const history = (state.getMyState()?.history ?? []) as ChatCompletionMessageParam[]
        await flowDynamic('Ok, voy a pedirte unos datos para agendar')
        await flowDynamic('¿Cual es tu nombre?')
        const doc = new GoogleSpreadsheet(id_doc, jwt);
        await salvar(doc, 'asd', 'asdasd', 'asd')
        
        history.push({
            role: 'user',
            content: ctx.body,
        })
        history.push({
            role: 'assistant',
            content: 'Ok, voy a pedirte unos datos para agendar, ¿Cual es tu nombre? ',
        })


        console.log('CTXXXX', ctx.body)
        console.log('HISTORY:', history)
        // const ai = await runDeterminate(history)

    } catch (err) {
        console.log('[ERROR:]', err)
        return
    }
})

