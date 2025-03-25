import fs from 'fs'

const BANK_FILE = './Bank.json'

// 🏦 تحميل بيانات البنك
function loadBank() {
    try {
        return JSON.parse(fs.readFileSync(BANK_FILE, 'utf-8'))
    } catch (e) {
        return {}
    }
}

// 🏦 حفظ بيانات البنك
function saveBank(bank) {
    fs.writeFileSync(BANK_FILE, JSON.stringify(bank, null, 2))
}

let handler = async (m, { conn }) => {
    let bank = loadBank()

    // 🔎 تحديد المستخدم المطلوب تصفيره
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : null
    if (!who) return m.reply('❌ يجب عليك منشن الشخص أو الرد على رسالته!')

    // ✅ تصفير بيانات المستخدم في البنك
    bank[who] = { exp: 0, bank: 0, diamonds: 0, level: 0 }
    
    // ✅ تصفير بيانات المستخدم في قاعدة البيانات العامة
    if (global.db.data.users[who]) {
        global.db.data.users[who] = { exp: 0, bank: 0, diamonds: 0, level: 0 }
    }

    // 📝 حفظ التغييرات
    saveBank(bank)

    m.reply(`✅ تم تصفير جميع بيانات المستخدم @${who.split('@')[0]} بنجاح! 🔥`, null, { mentions: [who] })
}

handler.help = ['صفرو']
handler.tags = ['owner']
handler.command = ['صفرو']
handler.owner = true  // 🔥 الأمر للمطور فقط

export default handler
