const handler = async (m, { conn }) => {
    let user = m.quoted ? m.quoted.sender : m.sender; // جلب رقم الشخص
    let userName = (await conn.getName(user)) || "المستخدم"; // جلب الاسم الظاهر أو وضع "المستخدم" كبديل
    let me = `𝐒𝐏𝐈𝐃𝐄𝐑 𝐁𝐎𝐓-𝐌𝐕𝐋`;
    let imageUrl = "https://files.catbox.moe/dye2y4.jpg"; // رابط الصورة

    let messageText = `◈─🕷️〘𝐒𝐏𝐈𝐃𝐄𝐑-𝐌𝐕𝐋〙🕷️─◈
╮─━─ *مـرحـبـا بـك*🍷
┊🍷الإسم: ${userName}
┊🍷المنشن: @${user.split('@')[0]}
╯─━─━─━─━─━─━─━╰
  ╮━─━─━─━─━─━─━─╭
  ┊ *🕷️أنا هو سبايدر بوت🕷️* 
  ╯━─━─━─━─━─━─━─╰
╮─━─ *مـعـلـومـات*🎡
┊ 🎡إختر من الأزرار التالية 
╯─━─━─━─━─━─━─━╰
◈─🕷️〘𝐒𝐏𝐈𝐃𝐄𝐑-𝐌𝐕𝐋〙🕷️─◈`;

    // إضافة ردة فعل (React) على الرسالة
    await conn.sendMessage(m.chat, { react: { text: "🕷", key: m.key } });

    // إرسال الرسالة مع الأزرار
    conn.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: `${me}\n\n${messageText}`,
        footer: "★彡[ 𝐘𝐎𝐑𝐈𝐂𝐇𝐈.🩸.𝐌𝐕𝐋 ]彡★",
        buttons: [
            { 
                buttonId: `.اوامر`,
                buttonText: { displayText: '┊🍷⧼الـقائـمة الـرئيسـية⧽🍷┊' }, 
                type: 1 
            },
            { 
                buttonId: `.المطور`,
                buttonText: { displayText: '┊🍷⧼الـمـطـور يـوريـتشي⧽🍷┊' }, 
                type: 1 
            }
        ],
        headerType: 4, // يجب أن يكون 4 عند إرسال صورة
        viewOnce: true,
        mentions: [user]
    }, { quoted: m });
};

// تغيير الأمر إلى بوت أو Bot أو سبايدر
handler.customPrefix = /^(بوت|Bot|سبايدر)$/i;
handler.command = new RegExp;

export default handler;