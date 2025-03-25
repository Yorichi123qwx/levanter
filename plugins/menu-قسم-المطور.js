const handler = async (m, { conn }) => {
    let user = m.quoted ? m.quoted.sender : m.sender; // جلب رقم الشخص
    let userName = (await conn.getName(user)) || "المستخدم"; // جلب الاسم الظاهر أو وضع "المستخدم" كبديل
    let me = `◈─🍷〘ՏᑭIᗪᗴᖇ ᗷOT〙🍷─◈`;
    let imageUrl = "https://i.postimg.cc/3JG5PJBP/IMG.jpg"; // رابط الصورة

    let messageText = `> *╮┊🍷⧼الأوامـر والـمـهـام⧽🍷┊*\n` +
        `> *┤ ⎆〔.بان〕*\n` +
        `> *┤ ⎆〔.فك_بان〕*\n` +
        `> *┤ ⎆〔.بانشات〕*\n` +
        `> *┤ ⎆〔.فكه〕*\n` +
        `> *┤ ⎆〔.انضم〕*\n` +
        `> *┤ ⎆〔.اخرج〕*\n` +
        `> *┤ ⎆〔.ارفعني〕*\n` +
        `> *┤ ⎆〔.هاك〕*\n` +
        `> *┤ ⎆〔.لأونر〕*\n` +
        `> *┤ ⎆〔.سبام〕*\n` +
        `> *┤ ⎆〔.ابلاغ〕*\n` +
        `> *┤ ⎆〔.المستخدمين〕*\n` +
        `> *┤ ⎆〔.نشر〕*\n` +
        `> *╯────────────···*\n` +
        `*⟣┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈⟢*`;

    // إضافة ردة فعل (React) على الرسالة
    await conn.sendMessage(m.chat, { react: { text: "🔥", key: m.key } });

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

handler.command = /^قسم_المطور$/i; // استدعاء الكود عند كتابة الأمر .قسم_المطور

export default handler;
