const handler = async (m, { conn }) => {
    let user = m.quoted ? m.quoted.sender : m.sender; // جلب رقم الشخص
    let userName = (await conn.getName(user)) || "المستخدم"; // جلب الاسم الظاهر أو وضع "المستخدم" كبديل
    let me = `◈─🍷〘ՏᑭIᗪᗴᖇ ᗷOT〙🍷─◈`;
    let imageUrl = "https://i.postimg.cc/sDsCJ0h8/f3556eec072a9f78df1bc8c673c6fe39.jpg"; // رابط الصورة

    let messageText = `> *╮┊🍷⧼الأوامـر والـمـهـام⧽🍷┊*\n` +
        `> *┤ ⎆〔.منشن〕*\n` +
        `> *┤ ⎆〔.مخفي〕*\n` +
        `> *┤ ⎆〔.طرد〕*\n` +
        `> *┤ ⎆〔.دعوه〕*\n` +
        `> *┤ ⎆〔.رفع〕*\n` +
        `> *┤ ⎆〔.خفض〕*\n` +
        `> *┤ ⎆〔.منشني〕*\n` +
        `> *┤ ⎆〔.كتم〕*\n` +
        `> *┤ ⎆〔.كتم_الكل〕*\n` +
        `> *┤ ⎆〔.فك-كتم〕*\n` +
        `> *┤ ⎆〔.فك-كتم-الكل〕*\n` +
        `> *┤ ⎆〔.جروب〕*\n` +
        `> *┤ ⎆〔.معلومات_جروب〕*\n` +
        `> *┤ ⎆〔.الأدمن〕*\n` +
        `> *┤ ⎆〔.الأعضاء〕*\n` +
        `> *┤ ⎆〔.الترحيب〕*\n` +
        `> *╯────────────···*\n` +
        `*⟣┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈⟢*`;

    // إضافة ردة فعل (React) على الرسالة
    await conn.sendMessage(m.chat, { react: { text: "🧭", key: m.key } });

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

handler.command = /^قسم_الجروب$/i; // استدعاء الكود عند كتابة الأمر .قسم_المطور

export default handler;
