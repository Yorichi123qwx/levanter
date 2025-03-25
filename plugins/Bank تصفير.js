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
    
    // 🔄 تصفير بيانات كل المستخدمين
    for (let user in bank) {
        bank[user] = { exp: 0, bank: 0, diamonds: 0, level: 0 }
    }

    // 🔄 تصفير بيانات المستخدمين في قاعدة البيانات العامة
    for (let user in global.db.data.users) {
        global.db.data.users[user] = { exp: 0, bank: 0, diamonds: 0, level: 0 }
    }

    // 📝 حفظ التغييرات
    saveBank(bank)

    m.reply('✅ تم تصفير بيانات جميع المستخدمين بنجاح! 🔥')
}

handler.help = ['تصفير_بنك']
handler.tags = ['owner']
handler.command = ['تصفير_بنك']
handler.owner = true  // 🔥 الشرط الوحيد عشان يشتغل فقط للمطور

export default handler
