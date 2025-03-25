import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    let inputUrl = text || m.text;

    // استخراج الرابط من الرسالة
    let regex = /https?:\/\/(?:www\.)?(?:tiktok\.com|vt\.tiktok\.com)\/\S+/i;
    let match = inputUrl.match(regex);
    
    if (!match) return; // إذا لم يكن هناك رابط، لا تفعل شيئًا

    let finalUrl = match[0]; // الرابط الفعلي من الرسالة

    try {
        // إرسال رسالة الانتظار بمجرد اكتشاف الرابط
        await m.reply('⏳ جاري التحميل، انتظر قليلاً...');

        // توسيع الرابط إذا كان قصيرًا
        let response = await fetch(finalUrl, { redirect: 'follow' });
        finalUrl = response.url;

        // استدعاء API التنزيل
        let apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(finalUrl)}`;
        let res = await fetch(apiUrl);
        let json = await res.json();

        if (!json?.data?.play) throw new Error('خطأ في التحميل');

        // إرسال الفيديو
        await conn.sendMessage(m.chat, { 
            video: { url: json.data.play }, 
            caption: `
┓──────────────┏
┊ *الفيديو الخاصك بك🤍* 
┊ *لا أتحمل ذنوب ما تشاهدة* 
┛──────────────┗`
        }, { quoted: m });

    } catch (error) {
        console.error(error);
        m.reply(`أوبس...خطأ غير متوقع\nحاول بعد شوية🥰
        `);
    }
};

handler.customPrefix = /https?:\/\/(?:www\.)?(?:tiktok\.com|vt\.tiktok\.com)\/\S+/i;
handler.command = new RegExp;
export default handler;
