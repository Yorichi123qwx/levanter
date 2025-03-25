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

let handler = async (m, { conn }) => {
    let bank = loadBank()
    let user = bank[m.sender] || { exp: 0, bank: 0, diamonds: 0, level: 0, gold: 0, silver: 0, iron: 0, wood: 0, stone: 0 }

    let name = conn.getName(m.sender)

    let txt = `┓─━─━─━─━─━─━─━─━┏
┊👤| *الإسم: ${name} 〕* 
┊🔮| *الخبرة: ${user.exp} 🎓*
┊🏆| *المستوى: ${user.level} 🏅*
┊💰| *الدولار: ${user.bank} 💵*  
┊💎| *الألماس: ${user.diamonds} 💎*   
┊🥇| *الذهب: ${user.gold} 🏵️*  
┛─━─━─━─━─━─━─━─━┗  
┊⚡⧼𝐒𝐏𝐈𝐃𝐄𝐑 𝐁𝐎𝐓⧽⚡┊  
`.trim()

    m.reply(txt)
}

handler.help = ['محفظتي']
handler.tags = ['economy']
handler.command = ['محفظتي', 'رصيدي']
export default handler
