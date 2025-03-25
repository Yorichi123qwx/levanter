const handler = async (m, { conn }) => {
    let user = m.quoted ? m.quoted.sender : m.sender; // جلب رقم الشخص
    let userName = (await conn.getName(user)) || "المستخدم"; // جلب الاسم الظاهر أو وضع "المستخدم" كبديل
    let me = `◈─🍷〘ՏᑭIᗪᗴᖇ ᗷOT〙🍷─◈`;
    let imageUrl = "https://i.postimg.cc/QxxN4FGC/2d56d223b4d7ba4b8f87194eecbc7d29.jpg"; // رابط الصورة

    let messageText = `> *╮┊🍷⧼الأوامـر والـمـهـام⧽🍷┊*\n` +
        `> *┤ ⎆〔.احزر〕*\n` +
        `> *┤ ⎆〔.عين〕*\n` +
        `> *┤ ⎆〔.علم〕*\n` +
        `> *┤ ⎆〔.كورة〕*\n` +
        `> *┤ ⎆〔.جنشن〕*\n` +
        `> *┤ ⎆〔.ايموجي〕*\n` +
        `> *┤ ⎆〔.ديزني〕*\n` +
        `> *┤ ⎆〔.هاري〕*\n` +
        `> *┤ ⎆〔.مسلسلات〕*\n` +
        `> *┤ ⎆〔.فكك〕*\n` +
        `> *┤ ⎆〔.سؤال〕*\n` +
        `> *┤ ⎆〔.خمن〕*\n` +
        `> *┤ ⎆〔.رتب〕*\n` +
        `> *┤ ⎆〔.رياضه〕*\n` +
        `> *┤ ⎆〔.دين〕*\n` +
        `> *┤ ⎆〔.قلوب〕*\n` +
        `> *┤ ⎆〔.تحدي〕*\n` +
        `> *╯────────────···*\n` +
        `*⟣┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈⟢*`;

    // إضافة ردة فعل (React) على الرسالة
    await conn.sendMessage(m.chat, { react: { text: "🎭", key: m.key } });

    // إرسال الرسالة مع الأزرار
    conn.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: `${me}\n\n${messageText}`,
        footer: "★彡[ 𝐘𝐎𝐑𝐈𝐂𝐇𝐈.🩸.𝐌𝐕𝐋 ]彡★",
        buttons: [
            { 
                buttonId: `.اوامر`, // الزر الأول ينفذ الأمر مباشرة
                buttonText: { displayText: '┊🍷⧼الـقائـمة الـرئيسـية⧽🍷┊' }, 
                type: 1 
            }
        ],
        headerType: 4, // يجب أن يكون 4 عند إرسال صورة
        viewOnce: true,
        mentions: [user]
    }, { quoted: m });
};

handler.command = /^قسم_الالعاب$/i; // استدعاء الكود عند كتابة الأمر .قسم_المطور

export default handler;
