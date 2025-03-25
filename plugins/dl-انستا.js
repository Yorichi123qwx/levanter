import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    let inputUrl = text || m.text;

    // استخراج رابط Instagram من الرسالة
    let regex = /https?:\/\/(?:www\.)?(?:instagram\.com|instagr\.am)\/\S+/i;
    let match = inputUrl.match(regex);
    
    if (!match) return m.reply('❌ لم يتم العثور على رابط Instagram صالح!');

    let finalUrl = match[0].split('?')[0]; // حذف أي متغيرات إضافية من الرابط

    try {
        await m.reply('⏳ جاري تحميل فيديو Instagram، انتظر قليلاً...');

        // استخدام API جديد لتنزيل الفيديو
        let apiUrl = `https://igram.io/api/json?url=${encodeURIComponent(finalUrl)}`;
        let res = await fetch(apiUrl);
        let json = await res.json();

        if (!json?.data?.[0]?.url) throw new Error('فشل في استخراج الفيديو.');

        let videoUrl = json.data[0].url;

        // إرسال الفيديو
        await conn.sendMessage(m.chat, { 
            video: { url: videoUrl }, 
            caption: `
┓──────────────┏
┊ *الفيديو الخاص بك 🤍* 
┊ *لا أتحمل ذنوب ما تشاهده* 
┛──────────────┗
            `
        }, { quoted: m });

    } catch (error) {
        console.error(error);
        m.reply(`❌ أوبس... حدث خطأ أثناء التحميل!\n🚀 جرّب مجددًا بعد قليل.`);
    }
};

// استجابة مباشرة لرابط Instagram
handler.customPrefix = /https?:\/\/(?:www\.)?(?:instagram\.com|instagr\.am)\/\S+/i;
handler.command = new RegExp;

export default handler;
