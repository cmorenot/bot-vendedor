import BotWhatsapp from '@bot-whatsapp/bot';


export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
.addAnswer(['¡Hola! 👋 Bienvenido a *_TuLatitud_*. Soy tu asistente virtual 🤖.',' ¿Cómo puedo ayudarte hoy?'])
.addAnswer(
    [
        '1️⃣🔍 *Explorar Productos:* Descubre nuestro catálogo y encuentra lo que necesitas.',
        '2️⃣🛒 *Hacer Pedido:* Selecciona y ordena tus productos favoritos de forma rápida.',
        '3️⃣💸 *Ofertas Especiales:* No te pierdas nuestras promociones y descuentos exclusivos.',
        '4️⃣🆘 *Ayuda y Soporte:* ¿Tienes preguntas o necesitas asistencia? Estoy aquí para ayudarte.',
        '5️⃣ℹ️ *Más Información:* Conoce más sobre nosotros y cómo podemos mejorar tu experiencia de compra.'

    ]
)

