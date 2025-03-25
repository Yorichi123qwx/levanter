const handler = async (m, { conn }) => {
    let user = m.quoted ? m.quoted.sender : m.sender; // جلب رقم الشخص
    let userName = (await conn.getName(user)) || "المستخدم"; // جلب الاسم الظاهر أو وضع "المستخدم" كبديل
    let me = `◈─🍷〘ՏᑭIᗪᗴᖇ ᗷOT〙🍷─◈`;
    let imageUrl = "https://i.postimg.cc/pLTRP4qB/e8115dbb23501cfd7d9888fbd5741141.jpg"; // رابط الصورة

    let messageText = `> *╮┊🍷⧼الأوامـر والـمـهـام⧽🍷┊*\n` +
        `> *┤ ⎆〔.طلاق〕*\n` +
        `> *┤ ⎆〔.زواج〕*\n` +
        `> *┤ ⎆〔.خطوبة〕*\n` +
        `> *┤ ⎆〔.قتل〕*\n` +
        `> *┤ ⎆〔.ميمز〕*\n` +
        `> *┤ ⎆〔.صراحه〕*\n` +
        `> *┤ ⎆〔.حكمة〕*\n` +
        `> *┤ ⎆〔.تطقيم〕*\n` +
        `> *┤ ⎆〔.توب〕*\n` +
        `> *┤ ⎆〔.انطق〕*\n` +
        `> *┤ ⎆〔.بيحبني〕*\n` +
        `> *┤ ⎆〔.بيكرهني〕*\n` +
        `> *┤ ⎆〔.شخصية〕*\n` +
        `> *┤ ⎆〔.جمال〕*\n` +
        `> *┤ ⎆〔.لو〕*\n` +
        `> *╯────────────···*\n` +
        `*⟣┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈⟢*`;

    // إضافة ردة فعل (React) على الرسالة
    await conn.sendMessage(m.chat, { react: { text: "🎡", key: m.key } });

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

handler.command = /^قسم_التسلية$/i; // استدعاء الكود عند كتابة الأمر .قسم_المطور

export default handler;
