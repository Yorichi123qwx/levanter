import fs from 'fs'

let bankFile = './Bank.json'

// تحميل بيانات البنك
function loadBank() {
    try {
        return JSON.parse(fs.readFileSync(bankFile, 'utf-8'))
    } catch (e) {
        return {}
    }
}

// حفظ بيانات البنك
function saveBank(bank) {
    fs.writeFileSync(bankFile, JSON.stringify(bank, null, 2))
}

let handler = async (m, { conn, text }) => {
    let bank = loadBank()

    let sender = m.sender
    let receiver = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : null
    if (!receiver) {
        return m.reply(`┓─━─━─━─━─━─━─━─┏
┊🧸| *رد على رسالة الشخص* 
┊🧸| *أو قم بعمل له منشن* 
┛─━─━─━─━─━─━─━─┗`)
    }

    let [type, amount] = text.split(' ')
    if (!type || isNaN(amount)) {
        return m.reply('❌ استخدم الأمر هكذا: .حول [المورد] [الكمية]\n📝 الموارد المتاحة: خبرة, دولار, الماس')
    }

    amount = parseInt(amount)

    // العمولة لكل نوع
    let fees = { 'خبرة': 500, 'دولار': 50, 'الماس': 50 }
    let fee = fees[type] || 0

    // تحميل بيانات المستخدمين
    let senderData = global.db.data.users[sender] || bank[sender] || { exp: 0, bank: 0, diamonds: 0 }
    let receiverData = global.db.data.users[receiver] || bank[receiver] || { exp: 0, bank: 0, diamonds: 0 }

    if (type === 'خبرة') {
        if (senderData.exp < amount + fee) return m.reply('❌ لا تملك خبرة كافية للتحويل!')
        senderData.exp -= amount + fee
        receiverData.exp += amount
    } else if (type === 'دولار') {
        if (senderData.bank < amount + fee) return m.reply('❌ لا تملك دولار كافي للتحويل!')
        senderData.bank -= amount + fee
        receiverData.bank += amount
    } else if (type === 'الماس') {
        if (senderData.diamonds < amount + fee) return m.reply('❌ لا تملك ألماس كافي للتحويل!')
        senderData.diamonds -= amount + fee
        receiverData.diamonds += amount
    } else {
        return m.reply('❌ نوع المورد غير معروف! استخدم: خبرة, دولار, الماس')
    }

    // تحديث البيانات
    global.db.data.users[sender] = senderData
    global.db.data.users[receiver] = receiverData
    bank[sender] = senderData
    bank[receiver] = receiverData
    saveBank(bank)

    let msg = `┓─━─━─━─━─━─━─━─┏
┊✅| *تم تحويل ${amount} ${type} بنجاح!*  
┊💰| *تم خصم ${fee} ${type} كرسوم تحويل*  
┊📩| *المستلم: @${receiver.split('@')[0]}*  
┛─━─━─━─━─━─━─━─┗`

    return m.reply(msg, null, { mentions: [receiver] })
}

handler.help = ['حول']
handler.tags = ['economy']
handler.command = ['حول']

export default handler
