import { xpRange } from '../libraries/levelling.js'
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

// 🔢 دالة حساب المستوى بناءً على XP
function getLevel(exp, multiplier) {
    let level = 0
    while (exp >= xpRange(level, multiplier).max) {
        level++
    }
    return level
}

let handler = async (m, { conn, text }) => {
    let bank = loadBank()

    let who = m.quoted ? m.quoted.sender : (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : null
    if (!who) return m.reply('فين الشخص الي هتضيفلو المورد يا مطور؟')

    let [type, amount] = text.split(' ')
    if (!type || isNaN(amount)) return m.reply('🧸┊ *غير صحيح |❌*\n🧸┊ *قم بكتابة 〔.ضيف 'مورد' 'كمية'〕*\n🧸┊ *خبرة،دولار،ذهب،الماس |⛩️*')

    amount = parseInt(amount)

    // تحميل بيانات المستخدم من قاعدة البيانات أو ملف JSON
    let user = global.db.data.users[who] || bank[who] || { exp: 0, bank: 0, diamonds: 0, gold: 0, level: 0 }

    let oldLevel = user.level

    if (type === 'خبرة') {
        user.exp += amount
        user.level = getLevel(user.exp, global.multiplier)
    } else if (type === 'دولار') {
        user.bank = (user.bank || 0) + amount
    } else if (type === 'الماس') {
        user.diamonds = (user.diamonds || 0) + amount
    } else if (type === 'ذهب') {
        user.gold = (user.gold || 0) + amount
    } else {
        return m.reply('❌〔مورد غير معروف!!〕\n〔خبرة┊ذهب┊دولار┊الماس〕')
    }

    // تحديث بيانات المستخدم في قاعدة البيانات والملف
    global.db.data.users[who] = user
    bank[who] = user
    saveBank(bank)

    let msg = `✅ تم إضافة *${amount}* إلى *${type}* للمستخدم @${who.split('@')[0]}`
    if (user.level > oldLevel) msg += `\n🎉 تهانينا! ارتفع مستواه إلى *${user.level}* 🎊`

    return m.reply(msg, null, { mentions: [who] })
}

handler.help = ['ضيف']
handler.tags = ['economy']
handler.command = ['ضيف']
handler.owner = true

export default handler
