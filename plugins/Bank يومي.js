import fs from 'fs'

const bankFile = './Bank.json'

// 🏦 تحميل بيانات البنك
function loadBank() {
    try {
        return JSON.parse(fs.readFileSync(bankFile, 'utf-8'))
    } catch (e) {
        return {}
    }
}

// 🏦 حفظ بيانات البنك
function saveBank(bank) {
    fs.writeFileSync(bankFile, JSON.stringify(bank, null, 2))
}

const free = 2000
const prem = 5000

const resources = {
    "💰 العملات": { amount: free, prem: prem },
    "🏅 الذهب": { amount: 5, prem: 10 },
    "⛓️ الحديد": { amount: 15, prem: 30 },
    "🥈 الفضة": { amount: 10, prem: 20 },
    "🪵 الخشب": { amount: 50, prem: 100 },
    "🪨 الأحجار": { amount: 70, prem: 140 }
}

let handler = async (m, { conn, isPrems }) => {
    let bank = loadBank()
    let user = bank[m.sender] || { credit: 0, gold: 0, iron: 0, silver: 0, wood: 0, stone: 0, lastclaim: 0 }

    let time = user.lastclaim + 86400000
    if (new Date() - user.lastclaim < 86400000) {
        let remainingTime = msToTime(time - new Date())
        return m.reply(`❌| *لقد قمت بطلب مكافأتك اليوم!*\n⏳| *يمكنك المطالبة بها بعد: ${remainingTime}*`)
    }

    let rewards = Object.keys(resources).map(type => {
        let amount = isPrems ? resources[type].prem : resources[type].amount
        user[type] = (user[type] || 0) + amount
        return `🔹 *${type}:* +${amount}`
    }).join('\n')

    user.lastclaim = new Date().getTime()

    bank[m.sender] = user
    saveBank(bank)

    let msg = `┓─━─━─━─━─━─━─━─┏
┊ 🎁| *مبروك! لقد حصلت على مكافأتك اليومية!*  
┊ 📜| *تفاصيل المكافأة:*  
${rewards}  
┊ 🕛| *يمكنك المطالبة بها مرة أخرى غداً!*  
┛─━─━─━─━─━─━─━─┗`

    m.reply(msg)
}

handler.help = ['يومي']
handler.tags = ['economy']
handler.command = ['يومي']

export default handler

// 🕒 تحويل الوقت المتبقي إلى ساعات ودقائق
function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = hours < 10 ? "0" + hours : hours
    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds

    return `${hours} ساعات و ${minutes} دقائق`
}
