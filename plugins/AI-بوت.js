import fetch from 'node-fetch';

const handler = async (m, { text }) => {
    const header = "|🕷️﹝ՏᑭIᗪᗴᖇ ᗷOT﹞🕷️|\n\n";
    
    // الردود المخصصة
    const customResponses = {
        'مين انت': 'أنا بوت سبايدر الذكي، مساعدك الافتراضي في حل الأسئلة والمهام اليومية 🕸️',
        'مين مطورك': 'مطوري هو يوريتشي، الساحر الذي منحني القدرة على مساعدتك! (◠‿◠)',
        'من انت': 'أنا نسخة متطورة من الذكاء الاصطناعي مبرمجة خصيصًا لخدمتك! 🤖',
        'من صنعك': 'تم تطويري بواسطة فريق يوريتشي التقني باستخدام أحدث تقنيات GPT-4 🛠️'
    };

    if (!text) {
        const examples = `${header}🤖 *أمثلة على الأسئلة:*\n\n` +
            "🔹 .بوت ما هو الذكاء الاصطناعي؟\n" +
            "🔹 .بوت من هو مؤسس واتساب؟\n" +
            "💬 *اكتب سؤالك بعد .بوت*";
        return m.reply(examples);
    }

    try {
        // التحقق من الأسئلة المخصصة أولاً
        const lowerText = text.toLowerCase();
        const matchedKey = Object.keys(customResponses).find(key => 
            lowerText.includes(key.toLowerCase())
        );

        if (matchedKey) {
            return m.reply(`${header}${customResponses[matchedKey]}`);
        }

        // إذا لم يكن سؤالاً مخصصًا، استخدم الـ API
        const encodedQuery = encodeURIComponent(text);
        const apiUrl = `https://api-4dev-ku1.vercel.app/api/ai/gpt4?q=${encodedQuery}`;

        const response = await fetch(apiUrl);
        
        if (!response.ok) throw new Error(`خطأ: ${response.status}`);

        const data = await response.json();
        const mainReply = data.kurosaki?.trim() || "⚠️ لا يوجد رد حالياً";

        await m.reply(`${header}${mainReply}`);
    } catch (error) {
        console.error("حدث خطأ:", error);
        m.reply(`${header}❌ فشل جلب الرد. حاول مرة أخرى!`);
    }
};

handler.command = /^(بوت|سبايدر|@?201008592761)$/i;


export default handler;