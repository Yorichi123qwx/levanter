import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = pkg;

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor((ms % 3600000) / 60000);
    let s = Math.floor((ms % 60000) / 1000);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

const handler = async (m, { conn, usedPrefix, __dirname, text, isPrems }) => {
    let d = new Date();
    d.setTime(d.getTime() + 3600000); // تعديل وقت الساعة بإضافة ساعة
    let locale = 'ar';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let user = global.db.data.users[m.sender] || {};
    let name = conn.getName(m.sender) || 'مستخدم';
    let { money = 0, joincount = 0, diamond = 0 } = user;
    let { exp = 0, limit = 0, level = 0, role = 'مستخدم' } = user;
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered === true).length;
    let more = String.fromCharCode(8206);
    let readMore = more.repeat(850);
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];

    await conn.sendMessage(m.chat, { react: { text: '🗒', key: m.key } });

    // تجهيز الصورة والقائمة
    const images = [
        'https://i.postimg.cc/fb1kMTkp/ef492beda8450d382047937fe2a2fda9.jpg',
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];

    var messa = await prepareWAMessageMedia({ image: { url: randomImage } }, { upload: conn.waUploadToServer });

    // إرسال القائمة
    conn.relayMessage(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    body: {
                        text: `◈─🕷️〘𝐒𝐏𝐈𝐃𝐄𝐑-𝐌𝐕𝐋〙🕷️─◈
╮─━─ *مـرحـبـا بـك*🍷
┊🍷الإسم:${name}|⎆
┊🍷المنشن:${taguser}|⎆
┊🍷المستوى:${level}|⎆
╯─━─━─━─━─━─━─━─╰
◈─🕷️〘𝐒𝐏𝐈𝐃𝐄𝐑-𝐌𝐕𝐋〙🕷️─◈
╮─━─ *الـمـطـور*🩸 
┊🩸الإسم: محمد الشامي|⎆
┊🩸اللقب: يوريتشي|⎆
╯─━─━─━─━─━─━─━─╰ 
◈─🕷️〘𝐒𝐏𝐈𝐃𝐄𝐑-𝐌𝐕𝐋〙🕷️─◈
╮─━─ *مـعـلـومـات*🌐 
┊🌐 إسم البوت:ՏᑭIᗪᗴᖇ|⎆
┊🌐 التشغيل:${uptime}|⎆
╯─━─━─━─━─━─━─━─╰
◈─🕷️〘𝐒𝐏𝐈𝐃𝐄𝐑-𝐌𝐕𝐋〙🕷️─◈`
                    },
                    footer: {
                        text: '𝐁𝐘:〔𝐃𝐄𝐕-𝐄𝐋𝐒𝐇𝐀𝐌𝐘〕'
                    },
                    header: {
                        title: '',
                        hasMediaAttachment: true,
                        imageMessage: messa.imageMessage,
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: 'single_select',
buttonParamsJson: JSON.stringify({
    title: '┊🕷️〔أقـسـامـ♤ـالـبوت〕🕷️',
    sections: [
        {
            title: '┊⚔️『قسم المالك』⚔️┊',
            highlight_label: '|🕷️﹝ՏᑭIᗪᗴᖇ ᗷOT﹞🕷️|',
            rows: [
                { header: '〔خـاصـ☘︎ـبالمـطـور〕🕷️', title: '✾⎦قسمـ⚔️ـالمطور⎡✾', description: '> ⟨يعـرض أوامـر المـطور⟩ ➥', id: '.قسم_المطور', highlight_label: '|🕷️﹝ՏᑭIᗪᗴᖇ ᗷOT﹞🕷️|' },
            ]
        },
        {
            title: '┊🌀『قسم التحويلات』🌀┊',
            highlight_label: '|🕷️﹝ՏᑭIᗪᗴᖇ ᗷOT﹞🕷️|',
            rows: [
                { header: '〔التحـ☘︎ـويلات〕🕷️', title: '✾⎦قسمـ🌀ـالتحويل⎡✾', description: '> ⟨يـعرض أوامـر التحـميل⟩ ➥', id: '.قسم_التحويل', highlight_label: '|🕷️﹝ՏᑭIᗪᗴᖇ ᗷOT﹞🕷️|' },
            ]
        },
        {
            title: '┊🧭『قسم الجروبات』🧭┊',
            highlight_label: '|🕷️﹝ՏᑭIᗪᗴᖇ ᗷOT﹞🕷️|',
            rows: [
                { header: '〔الجرو☘︎ـبات〕🕷️', title: '✾⎦قسمـ🧭ـالجروب⎡✾', description: '> ⟨يـعرض أوامـر الجروبـات⟩ ➥', id: '.قسم_الجروب', highlight_label: '|🕷️﹝ՏᑭIᗪᗴᖇ ᗷOT﹞🕷️|' },
            ]
        },
        {
            title: '┊🕌『قسم الدين』🕌┊',
            highlight_label: '|🕷️﹝ՏᑭIᗪᗴᖇ ᗷOT﹞🕷️|',
            rows: [
                { header: '〔الإسـ☘︎ـلام〕🕷️', title: '✾⎦قسمـ🕌ـالدين⎡✾', description: '> ⟨يـعرض أوامـر الديـن⟩ ➥', id: '.قسم_الدين', highlight_label: '|🕷️﹝ՏᑭIᗪᗴᖇ ᗷOT﹞🕷️|' }
            ]
        },
        {
            title: '┊👾『قسم الذكاء』👾┊',
            highlight_label: '|🕷️﹝ՏᑭIᗪᗴᖇ ᗷOT﹞🕷️|',
            rows: [
                { header: '〔الذ☘︎ـكاء〕🕷️', title: '✾⎦قسمـ👾ـالذكاء⎡✾', description: '> ⟨يـعرض أوامـر الAI⟩ ➥', id: '.قسم_الذكاء', highlight_label: '|🕷️﹝ՏᑭIᗪᗴᖇ ᗷOT﹞🕷️|' },
            ]
        },
        {
            title: '┊🎪『قسم التحميلات』🎪┊',
            highlight_label: '|🕷️﹝ՏᑭIᗪᗴᖇ ᗷOT﹞🕷️|',
            rows: [
                { header: '〔التحمـ☘︎ـيلات〕🕷️', title: '✾⎦قسمـ🎪ـالتحميل⎡✾', description: '> ⟨يـعرض أوامـر التحميـل⟩ ➥', id: '.قسم_التحميلات', highlight_label: '|🕷️﹝ՏᑭIᗪᗴᖇ ᗷOT﹞🕷️|' },
            ]
        },
        {
            title: '┊🎭『قسم الألعاب』🎭┊',
            highlight_label: '|🕷️﹝ՏᑭIᗪᗴᖇ ᗷOT﹞🕷️|',
            rows: [
                { header: '〔الألـ☘︎ـعاب〕🕷️', title: '✾⎦قسمـ🎭ـالألعاب⎡✾', description: '> ⟨يـعرض أوامـر الألـعاب⟩ ➥', id: '.قسم_الالعاب', highlight_label: '|🕷️﹝ՏᑭIᗪᗴᖇ ᗷOT﹞🕷️|' },
            ]
        },
        {
        title: '┊🎡『قسم التسلية』🎡┊',
            highlight_label: '|🕷️﹝ՏᑭIᗪᗴᖇ ᗷOT﹞🕷️|',
            rows: [
                { header: '〔التسـ☘︎ـلية〕🕷️', title: '✾⎦قسمـ🎡ـالتسلية⎡✾', description: '> ⟨يـعرض أوامـر التسلـية⟩ ➥', id: '.قسم_التسلية', highlight_label: '|🕷️﹝ՏᑭIᗪᗴᖇ ᗷOT﹞🕷️|' },
            ]
        }    
    ]
}),
messageParamsJson: ''
                            },
                            {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
        display_text: "┊🍷〔تحديثاتـ♤ـالـبوت〕🍷",
        url: "https://whatsapp.com/channel/0029VascwNL60eBiGZOQz647",
        merchant_url: "https://whatsapp.com/channel/0029VascwNL60eBiGZOQz647"
    })
},
{
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
        display_text: "┊🩸〔موقعـ♤ـالمطور〕🩸",
        url: "https://spider-2.vercel.app/",
        merchant_url: "https://spider-2.vercel.app/"
    })
}
                        ]
                    }
                }
            }
        }
    }, {});
}

handler.help = ['info'];
handler.tags = ['main'];
handler.command = ['الاوامر', 'أوامر', 'menu', 'اوامر'];

export default handler;
``
