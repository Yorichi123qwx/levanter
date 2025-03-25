/*
بيتفاعل علي رسايل المطور
*/
export async function before(m, { conn }) {
    if (m.sender === "201009480596@s.whatsapp.net") {
        const emojis = ['🐦', '🗿', '😲', '🤨', '🤯', '👀', '🙃', '🦄', '🍄', '🦖', '👾'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        try {
            await conn.sendMessage(m.chat, { react: { text: randomEmoji, key: m.key } });
        } catch (error) {
            console.error('❌ فشل في إرسال التفاعل:', error);
        }
        return true;
    }
}