import fs from 'fs'

const BANK_FILE = './Bank.json'

// 🏦 تحميل البيانات من `Bank.json`
const loadBank = () => {
  try {
    if (!fs.existsSync(BANK_FILE)) return {} // لو الملف مش موجود، يرجع Object فاضي
    return JSON.parse(fs.readFileSync(BANK_FILE))
  } catch (error) {
    console.error('❌ خطأ في تحميل Bank.json:', error)
    return {} // في حالة وجود خطأ، يرجع Object فاضي لتجنب المشاكل
  }
}

// 🏦 حفظ البيانات في `Bank.json`
const saveBank = (data) => {
  try {
    fs.writeFileSync(BANK_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('❌ خطأ في حفظ البيانات:', error)
  }
}

let handler = async (m, { conn }) => {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let username = conn.getName(who)

  // تحميل بيانات البنك
  let bank = loadBank()

  // التأكد من أن المستخدم موجود في البنك
  if (!bank[who]) {
    bank[who] = { bank: 0 } // يبدأ بفلوس صفر
    saveBank(bank) // نحفظ التحديث
  }

  let user = bank[who]
  let balance = user.bank || 0 // تأكيد أن `bank` ليس `undefined`

  // 🏆 تحديد تصنيف الثروة
  let wealth = '*مفلس 😭*'
  if (balance > 3000) wealth = '*فقير 😞*'
  if (balance > 6000) wealth = '*👔 موظف حكومي*'
  if (balance > 100000) wealth = '*رجل أعمال 🤴🏼*'
  if (balance > 1000000) wealth = '*غني 💸*'
  if (balance > 10000000) wealth = '*مليونير 🤑💵*'
  if (balance > 1000000000) wealth = '*ملياردير 💰*'

  // 💰 تنسيق رسالة البنك
  let msg = `┓─━─━─━🏦━─━─━─━┏
┊ 💰 *قسم البنك* 💰
┊ 👤 *الإسم:* ${username}
┊ 💵 *الرصيد:* ${balance.toLocaleString()} دولار
┊ 🏆 *الثروة:* ${wealth}
┛─━─━─━🏦━─━─━─━┗
┊ 💎⧼𝐒𝐏𝐈𝐃𝐄𝐑 𝐁𝐎𝐓⧽💎┊`.trim()

  conn.reply(m.chat, msg, m, { mentions: [who] })
}

handler.help = ['bank']
handler.tags = ['economy']
handler.command = ['البنك', 'بنك']

export default handler
