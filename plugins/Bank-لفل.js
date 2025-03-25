import { canLevelUp, xpRange } from '../libraries/levelling.js'
import { levelup } from '../libraries/canvas.js' 

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender] || {}  // ✅ التأكد من أن المستخدم موجود
    user.level = user.level || 0
    user.exp = user.exp || 0
    user.role = user.role || "مبتدئ"
    user.limit = user.limit || 0  // ✅ التأكد من أن "الماس" لا يكون undefined

    let name = conn.getName(m.sender)
    let { min, xp, max } = xpRange(user.level, global.multiplier)

    // ✅ التأكد من إمكانية الترقية
    console.log(`🔍 التحقق من ترقية ${name}: المستوى الحالي ${user.level}, الخبرة ${user.exp}, الحد الأدنى للترقية ${min}, الحد الأقصى ${max}`)
    
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let txt = `┊━─━─━─━─━─━─━─━─━─🕷┊
┊👤| *الإسم:* ${name}  
┊🎓| *المستوى:* ${user.level}  
┊🔮| *التقدم:* ${user.exp - min}/${xp}  
┊🏆| *رتبتك:* ${user.role}  
┊⚡| *الخبرة المتبقية:* ${max - user.exp}  
┊💎| *الماس:* ${user.limit}  
┊━─━─━─━─━─━─━─━─━─🕷┊`
        return m.reply(txt)
    }

    // ✅ ترقية المستوى
    let oldLevel = user.level
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++

    let newRole = getRole(user.level)  // ✅ تحديد الرتبة بعد الترقية
    user.role = newRole  // ✅ تحديث الرتبة للمستخدم

    let txt = `┊🍷⧼𝐒𝐏𝐈𝐃𝐄𝐑 𝐁𝐎𝐓⧽🍷┊
*╭━⊰ ${name} ⊱━დ*
*┃ المستوى السابق: ${oldLevel}*
*┃ المستوى الحالي: ${user.level}*
*┃ رتبتك:* *‎${user.role}*
*╰━⊰ 🎖️ مستوى جديد 🎖️ ⊱━━დ*`.trim()

    // ✅ إرسال رسالة الترقية مع الصورة
    try {
        const img = await levelup(`🎉✨ تهانينا ${name}!`, user.level)
        await conn.sendMessage(m.chat, { image: { url: img }, caption: txt, mentions: [m.sender] })
    } catch (e) {
        m.reply(txt)  // ✅ إذا فشل إرسال الصورة، يرسل رسالة نصية فقط
    }
}

handler.help = ['levelup']
handler.tags = ['xp']
handler.command = ['رانك', 'lvl', 'لفل', 'level'] 
export default handler

// 🏆 دالة تحديد الرتبة بناءً على المستوى
function getRole(level) {
    if (level >= 50) return "⚡ المحترف"
    if (level >= 30) return "🔥 الخبير"
    if (level >= 20) return "⭐ المتقدم"
    if (level >= 10) return "🎓 المتوسط"
    return "👶 المبتدئ"
}
