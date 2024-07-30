import BotWhatsapp from '@bot-whatsapp/bot';

export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
.addAnswer(['🆘 ¿Necesitas ayuda? ¡Estoy aquí para eso! 🆘'])
.addAnswer('Parece que necesitas asistencia adicional. Aquí te ofrezco algunas opciones para ayudarte mejor.')
.addAnswer('🔎 *_Consultas sobre Productos:_* ¿Quieres saber más sobre un producto específico o necesitas recomendaciones? Escribe *Producto* y estaré encantado de ayudarte.')
.addAnswer('💬 *_Soporte Personalizado:_* Si tu consulta es más específica o necesitas hablar con un humano, escribe *Soporte* y te conectaré con uno de nuestros expertos.')
.addAnswer('💳 *_Información sobre Pagos y Facturación:_* ¿Tienes preguntas sobre métodos de pago, facturación o problemas con una transacción? Escribe *Pago* para obtener ayuda relacionada con transacciones.')
.addAnswer('🚚 *_Seguimiento de Pedidos:_* Si tu inquietud es sobre el estado de un pedido que ya realizaste, escribe *Seguimiento* y te proporcionaré la información más reciente sobre tu entrega.')
.addAnswer('👍 *_Retroalimentación y Sugerencias:_* ¿Tienes comentarios o ideas sobre cómo podemos mejorar? Nos encantaría escucharlos. Escribe *Feedback* y comparte tus pensamientos.')
.addAnswer('🔙 *_Volver al Menú Principal:_* Si deseas regresar al menú principal, simplemente escribe *Hola*.')
