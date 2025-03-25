import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const timeout = 60000;

let handler = async (m, { conn, command }) => { if (command.startsWith('answer_')) { let id = m.chat; let yorichi = conn.yorichi[id];

if (!yorichi) {
        return conn.reply(m.chat, '❌ لا يوجد اختبار نشط في الوقت الحالي.', m);
    }

    let selectedAnswerIndex = parseInt(command.split('_')[1]);
    if (isNaN(selectedAnswerIndex) || selectedAnswerIndex < 1 || selectedAnswerIndex > 4) {
        return conn.reply(m.chat, '❌ اختيار غير صالح.', m);
    }

    let selectedAnswer = yorichi.options[selectedAnswerIndex - 1];
    let isCorrect = yorichi.correctAnswer === selectedAnswer;

    if (isCorrect) {
        await conn.reply(m.chat, `✅ إجابة صحيحة! ربحت 500 XP!`, m);
        global.db.data.users[m.sender].exp += 500;
        clearTimeout(yorichi.timer);
        delete conn.yorichi[id];
    } else {
        yorichi.attempts -= 1;
        if (yorichi.attempts > 0) {
            await conn.reply(m.chat, `❌ إجابة خاطئة. تبقى ${yorichi.attempts} محاولات.`, m);
        } else {
            await conn.reply(m.chat, `❌ انتهت المحاولات.`, m);
            clearTimeout(yorichi.timer);
            delete conn.yorichi[id];
        }
    }
} else {
    try {
        conn.yorichi = conn.yorichi || {};
        let id = m.chat;

        if (conn.yorichi[id]) {
            return conn.reply(m.chat, '⌛ لا يمكنك بدء اختبار جديد حتى تنتهي من الاختبار الحالي.', m);
        }

        const response = await fetch('https://raw.githubusercontent.com/SungReved/games/refs/heads/main/Src/%D8%AF%D9%8A%D8%B2%D9%86%D9%8A.json');
        const yorichiData = await response.json();

        if (!yorichiData) {
            throw new Error('فشل في الحصول على بيانات الاختبار.');
        }

        const yorichiItem = yorichiData[Math.floor(Math.random() * yorichiData.length)];
        const { img, name } = yorichiItem;

        let options = [name];
        while (options.length < 4) {
            let randomItem = yorichiData[Math.floor(Math.random() * yorichiData.length)].name;
            if (!options.includes(randomItem)) {
                options.push(randomItem);
            }
        }
        options.sort(() => Math.random() - 0.5);

        const media = await prepareWAMessageMedia({ image: { url: img } }, { upload: conn.waUploadToServer });

        const interactiveMessage = {
            body: {
                text: `┊🍷⧼الـتخمين من الـصـورة⧽🍷┊\n┊🔔⧼الـوقت *﹝60ثانـية﹞* ⧽🔔┊\n┊🍷⧼إخـتر مـن الأسـفل⧽🍷┊`,
            },
            footer: { text: '' },
            header: {
                title: '',
                subtitle: '𝐁𝐘 : 𝐃𝐄𝐕-𝐘𝐎𝐑𝐈𝐂𝐇𝐈',
                hasMediaAttachment: true,
                imageMessage: media.imageMessage,
            },
            nativeFlowMessage: {
                buttons: options.map((option, index) => ({
                    name: 'quick_reply',
                    buttonParamsJson: JSON.stringify({
                        display_text: `┊🕷️⧼${option}⧽🕷️┊`,
                        id: `.answer_${index + 1}`
                    })
                })),
            },
        };

        let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: { interactiveMessage },
            },
        }, { userJid: conn.user.jid, quoted: m });

        conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

        conn.yorichi[id] = {
            correctAnswer: name,
            options: options,
            timer: setTimeout(async () => {
                if (conn.yorichi[id]) {
                    await conn.reply(m.chat, `!﹝انتهى الوقت وتم إعادة تعيين اللعبة﹞!`, m);
                    delete conn.yorichi[id];
                }
            }, timeout),
            attempts: 2
        };

    } catch (e) {
        console.error(e);
        conn.reply(m.chat, 'حدث خطأ في إرسال الرسالة.', m);
    }
}

};

handler.help = ['شخصية']; handler.tags = ['game']; handler.command = /^(ديزني|ديزني|answer_\d+)$/i;

export default handler;
