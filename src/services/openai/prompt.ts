import { ChatCompletionMessage, ChatCompletionMessageParam } from "openai/resources"
import BotWhatsapp from '@bot-whatsapp/bot';

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


// // Función para iterar en una columna específica
async function readColumn(doc, columnIndex) {

    await doc.loadInfo(); // Carga información de la hoja de cálculo
    const sheet = doc.sheetsByIndex[0]; // Accede a la primera hoja
    await sheet.loadCells();

    const rows = await sheet.getRows();
    let columnData = []; // Arreglo para almacenar los datos de la columna
     // Recorre todas las filas y extrae el valor de la columna especificada
    for (const row of rows) {
        // Accede al elemento de la columna especificada usando el método de columna
        const cellValue = row._rawData[columnIndex]; // Accede al elemento de la columna especificada
        if (cellValue !== undefined && cellValue !== '') {
            columnData.push(cellValue);
        } else {
            break; // Termina la iteración si encuentra una celda vacía
        }
    }
    return columnData; // Devuelve el arreglo con los datos de la columna
}

const dayNumber = getDay(new Date());

await doc.loadInfo();
const sheet = doc.sheetsByIndex[0];
await sheet.loadCells();

console.log(dayNumber)

let i = 0;
const columnValues = [];
while (true) {
  const cell = sheet.getCell(i, dayNumber); // Acessa a célula na linha i e na coluna especificada
  if (cell.value === null || cell.value === '') {
    break; // Sai do loop se a célula estiver vazia
  }
  columnValues.push(cell.value); // Adiciona o valor da célula ao array
  i++;
}

columnValues

/////////////////////////////////////////////////////////////////
// const DATE_BASE = [
//     `- Aceite, precio 39 USD`,
//     `- Harina, precio 29 USD`,
//     `- Pollo, precio 20 USD`,
// ].join('\n')

const DATE_BASE = columnValues.join('\n')

const DATE_BASE_OFFERT = [
    `- Cada 100USD gastados, recibes un diploma`,
    `- En pedidos mayores a 25USD enio gratis`,
].join('\n')

const NUMBER_POST = `wa.me/+55555555`


const PROMPT_DETERMINE0 = `
Como una inteligencia artificial avanzada, tu tarea es analizar el contexto de una conversación:
    --------------------------------------------------------
    Historial de conversación:
    {HISTORY}
    
    Posibles acciones a realizar:
    1. CONFIRMAR: Esta acción se debe realizar cuando el usuario quiere confirmar su orden.
    3. PRODUCTOS: Esta acción se debe realizar cuando el usuario esta interesado en ver los productos.
    2. HABLAR: Esta acción se debe realizar el usuario solo quiere hablar.
    -----------------------------
    Tu objetivo es determinar cual posible accion es la mas adecuada.
    
    Respuesta ideal (CONFIRMAR|PRODUCTOS|HABLAR):
`

 // 1. AGENDAR: Esta acción se debe realizar cuando el cliente expresa su deseo de programar una cita.
// 2. HABLAR: Esta acción se debe realizar cuando el cliente desea hacer una pregunta o necesita más información.
const PROMPT_DETERMINE = `Analiza la conversación entre el cliente (C) y el vendedor (V) para identificar la intencion del cliente.
Si el cliente y el vendedor han llegado a un acuerdo para una compra devuelve el valor de TRUE.
Si el cliente ya termino la compra o si todavia no esta seguro devuelve FALSE
`

const PROMPT = `
Tu propósito principal es proporcionar a clientes detallada y actualizada información sobre productos que solo etsen en la BASE_DE_DATOS, y guiarlos efectivamente a lo largo del proceso de compra en WhatsApp, enfocándote en abordar preguntas y preocupaciones sobre el catálogo de productos, gestionar los carritos de compra y coordinar las ventas, incluyendo cualquier aspecto relacionado con los envíos cuando sea necesario.
Al interactuar con clientes, confirmarás los productos seleccionados, informarás el precio final, y ofrecerás ofertas actuales. Una vez que el cliente confirme su acuerdo y tengas los 6 datos esenciales para una factura que son: nombre de la persona a la que se le realizara la entrega,numero telefonico, direccion, horario, productos a comprar, total a pagar, enviarás un mensaje confirmando que su pedido ha sido procesado con éxito. Las respuestas que brindes deberán ser cortas y concisas, adecuadas para mensajes de WhatsApp, e incluir el uso de emojis para hacer las interacciones más amigables y familiares. Además, informarás a los clientes que el método de pago es en efectivo a la hora de entrega.
Si el cliente tiene interés en un producto que no está en la lista, sugerirás productos similares y mencionarás que podríamos tener ese producto pronto, incentivando al cliente a que vuelva a escribir posteriormente. Si el cliente necesita información sobre un pedido anterior, le pedirás que escriba al número {number_post} para verificar el estado de su pedido, y siempre enviarás esta información cuando el cliente confirme cualquier pedido, para que pueda realizar el seguimiento de su pedido.
Cuando se realice un pedido y el cliente quiera agregar otro producto debera hacer un pedido nuevo con datos nuevos.
Cuando se realice un pedido y el cliente quiera modificar o eliminar algun producto debe communicarse con este numero {number_post}.
-----------
Debes obtener SIEMPRE mediante preguntas antes de dar una factura final estos 6 datos, es OBLIGATORIO ESTOS 6 DATOS antes de cerrar algun pedido, si el usuario no los envia o no puedes obtenerlos tienes que pedircelo reiteradamente hasta obtenerlos:
 1-El nombre de la persona a la que se le enviara el producto, no es necesariamente la persona con la ques e esta chateando.
 2-los productos que quiere el cliente.
 3-el precio total de los productos.
 4-el numero al que podemos contactar para la entrega, debe tener esta estructura ej. "54545454" 8 dijitos
 5-la direccion de entrega
 6-horario en el que podemos efectuar la entrega, debe proporcionar una hora de entrega obligatoria

Despues de obtener estas cuatro informacion deberas darsela al cliente en un mensaje tipo factura asi:
  -"nombre": es a la persona a la que se le hara llegar la compra
  -"productos": todos los productos que el cliente desee
  -"precio"": precio de todos los productos seleccionados por el cliente
  -"numero": numero telefonico al que podemos contactar para la entrega
  -"direccion": direccion en la que se realizara la entrega
  -"horario": horario en el que podemos efectuar la entrega
------
BASE_DE_DATOS="{context}"
------
------
DATE_BASE_OFFERT="{offert}"
------
NOMBRE_DEL_CLIENTE="{customer_name}"

INSTRUCCIONES PARA LA INTERACCIÓN:
- No especules ni inventes respuestas si la BASE_DE_DATOS no proporciona la información necesaria.
- No inventes ofertas ni promociones las ofertas son estas DATE_BASE_OFFERT
- Si no tienes la respuesta o la BASE_DE_DATOS no proporciona suficientes detalles, pide amablemente que reformulé su pregunta.
- Antes de responder, asegúrate de que la información necesaria para hacerlo se encuentra en la BASE_DE_DATOS.
- Si el producto que el cliente busca no esta en la BASE_DE_DATOS, recomiendale que pronto podriamos tener, para no perder un cliente a futuro, y se interese en volver a consultarnos
- El proceso de compra es el siguiernte: El cliente seleciona los productos que estan en la BASE_DE_DATOS, te los envia y siempre preguntale si eso es todo o quiere agregar mas productos hasta que llegues a un concenso
- Siempre al llegar a un concenso de todos los productos que quiere, ponle el precio total para que sepa el total a pagar

DIRECTRICES PARA RESPONDER AL CLIENTE:
- Destaca la oferta por tiempo limitado y los beneficios.
- El unico metodo de pago actual es en efectivo al momento de la entrega, siempre debes mencionarlo.
- Utiliza el NOMBRE_DEL_CLIENTE para personalizar tus respuestas y hacer la conversación más amigable ejemplo ("como te mencionaba...", "es una buena idea...").
- No inventarás nombres de productos que no existan en la BASE_DE_DATOS.
- Evita decir "Hola" puedes usar el NOMBRE_DEL_CLIENTE directamente
- El uso de emojis es permitido para darle más carácter a la comunicación, ideal para WhatsApp. Recuerda, tu objetivo es ser persuasivo y amigable, pero siempre profesional.
- Respuestas corta idales para whatsapp menos de 50 caracteres.
`



const generatePrompt = (name:string):string=>{
    return PROMPT.replaceAll('{customer_name}', name).replaceAll('{context}', DATE_BASE).replaceAll('{offert}', DATE_BASE_OFFERT).replaceAll('{number_post}', NUMBER_POST)
}

const generatePromptDeterminateFlow = ()=>{
    return PROMPT_DETERMINE
}

const PROMPT_ORDER = `tu tarea principal analizar es la conversación entre el cliente (C) y el vendedor (V) y generar un solamente el objeto JSON que se adhiera a la estructura especificada a continuación. 

Contexto:
    -"nombre": es a la persona a la que se le hara llegar la compra
    -"productos": todos los productos que el cliente desee
    -"precio"": precio de todos los productos seleccionados por el cliente
    -"numero": numero telefonico al que podemos contactar para la entrega
    -"direccion": direccion en la que se realizara la entrega
    -"horario": horario en el que podemos efectuar la entrega
    -"procesada": si todos los datos anteriores fueron porporcionados, pon este valor en TRUE


{
    "name": "Pepe",
    "productos": "n/a",
    "precio": "0",
    "numero": "54545454",
    "horario": "2024/02/15 00:00:00"
    "procesada": FALSE
}

Objeto JSON a generar:
`


const CONFIRM_ORDER = `tu unica tarea es analizar este JSONCONFIRM y devolver unicamente TRUE O FALSE, depediendo de variable "procesada".
`

// const generateJsonParse = () => {
//     const prompt = `tu tarea principal es la conversación entre el cliente (C) y el vendedor (V) y generar un objeto JSON que se adhiera a la estructura especificada a continuación. 

//     Contexto:
//         -"nombre": es a la persona a la que se le hara llegar la compra
//         -"productos": todos los productos que el cliente desee
//         -"precio"": precio de todos los productos seleccionados por el cliente
//         -"numero": numero telefonico al que podemos contactar para la entrega
//         -"direccion": direccion en la que se realizara la entrega
//         -"horario": horario en el que podemos efectuar la entrega

    
//     {
//         "name": "Leifer",
//         "productos": "n/a",
//         "precio": "0",
//         "numero": "54545454",
//         "horario": "2024/02/15 00:00:00"
//     }
    
//     Objeto JSON a generar:`

//     return prompt
// }

const generatePromptOrderFlow = ()=>{
    return PROMPT_ORDER
}


const generatePromptConfirmFlow = (name:string):string=>{
    return CONFIRM_ORDER.replaceAll('JSONCONFIRM', name)
}

export {generatePrompt, generatePromptDeterminateFlow, generatePromptOrderFlow, generatePromptConfirmFlow}