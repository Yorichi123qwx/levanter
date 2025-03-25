let handler = async (m, { conn, text, isAdmin, isOwner, command }) => {
    let user = global.db.data.users[m.sender];

    let targetJid = m.quoted ? m.quoted.sender : (m.mentionedJid && m.mentionedJid.length ? m.mentionedJid[0] : null);
    if (!targetJid) targetJid = m.sender;
    let targetUser = global.db.data.users[targetJid] || null;

    let groupMetadata = await conn.groupMetadata(m.chat);
    let groupMembers = groupMetadata.participants.map(p => p.id);
    let isSuperAdmin = isOwner || groupMetadata.participants.find(p => p.id === m.sender)?.admin;

    if (command === 'لقبي') {
        if (!user.nickname) return m.reply('╭━━[❌]━━╮\n*معندكش لقب لحد دلوقتي!*\n╰━━━━━━╯');
        return m.reply(`╭━━[🎖️]━━╮\n*لقبك هو:* ${user.nickname}\n╰━━━━━━╯`);
    }

    if (command === 'وضع-لقب') {
        if (!isSuperAdmin) return m.reply('╭━━[🚫]━━╮\n*الأمر ده للمشرفين بس!*\n╰━━━━━━╯');
        if (!text || !targetJid) return m.reply('╭━━[❗]━━╮\n*منشن العضو أو رد على رسالته واكتب اللقب الجديد!*\n╰━━━━━━╯');
        if (!targetUser) return m.reply('╭━━[❌]━━╮\n*العضو مش موجود في قاعدة البيانات!*\n╰━━━━━━╯');

        let nickname = text.replace(/@?\d+/g, '').trim();
        if (!nickname) return m.reply('╭━━[❗]━━╮\n*اكتب لقب صالح!*\n╰━━━━━━╯');

        let isNicknameTaken = groupMembers.some(member => {
            let memberData = global.db.data.users[member];
            return member !== targetJid && memberData.nickname === nickname;
        });

        if (isNicknameTaken) {
            return m.reply(`╭━━[🚫]━━╮\n*اللقب "${nickname}" مستخدم من قبل شخص آخر في المجموعة. جرّب واحد تاني!*\n╰━━━━━━╯`);
        }

        targetUser.nickname = nickname;
        return m.reply(`╭━━[✅]━━╮\n*العضو @${targetJid.split('@')[0]} لقبه الجديد هو:* ${nickname}\n╰━━━━━━╯`, { mentions: [targetJid] });
    }

    if (command === 'حذف-لقب') {
        if (!user.nickname) return m.reply('╭━━[❌]━━╮\n*معندكش لقب أصلا عشان تحذفه!*\n╰━━━━━━╯');

        delete user.nickname;
        return m.reply('╭━━[✅]━━╮\n*تم مسح لقبك خلاص!*\n╰━━━━━━╯');
    }

    if (command === 'لقب') {
        if (!targetJid) return m.reply('╭━━[❗]━━╮\n*منشن العضو أو رد على رسالته عشان تعرف لقبه!*\n╰━━━━━━╯');
        if (!targetUser) return m.reply('╭━━[❌]━━╮\n*العضو مش موجود في قاعدة البيانات!*\n╰━━━━━━╯');
        if (!targetUser.nickname) return m.reply('╭━━[❗]━━╮\n*العضو ده معندوش لقب لحد دلوقتي!*\n╰━━━━━━╯');

        return m.reply(`╭━━[🎖️]━━╮\n*لقب العضو @${targetJid.split('@')[0]} هو:* ${targetUser.nickname}\n╰━━━━━━╯`, { mentions: [targetJid] });
    }

    return m.reply('╭━━[❗]━━╮\n*الأمر غير معروف!*\n╰━━━━━━╯');
};

handler.help = ['لقبي', 'وضع-لقب @المستخدم اللقب', 'حذف-لقب', 'لقب @المستخدم'];
handler.tags = ['tools'];
handler.command = /^(لقبي|وضع-لقب|حذف-لقب|لقب)$/i;

export default handler;