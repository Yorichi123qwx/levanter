import { delay } from '@whiskeysockets/baileys'

let handler = async (m, { conn, args, mentionedJid, quoted }) => {
  // تأكيد استلام الأمر
  await m.react('🔄') 

  try {
    // ━━ التحقق من المطور ━━
    if (!global.db.data.users[m.sender].owner) {
      await m.react('❌')
      return conn.sendMessage(m.chat, { 
        text: 'هذا الأمر للمطور فقط!',
        mentions: [m.sender]
      }, { quoted: m })
    }

    // ━━ معالجة العدد ━━
    const callCount = Math.min(parseInt(args[0]) || 1, 20);
    if (callCount > 20) {
      await m.react('⚠️')
      return conn.sendMessage(m.chat, { text: 'الحد الأقصى 20 مكالمة!' })
    }

    // ━━ تحديد المستهدف ━━
    const targetJid = mentionedJid[0] || quoted?.sender
    if (!targetJid) {
      await m.react('❓')
      return conn.sendMessage(m.chat, { 
        text: 'الاستخدام الصحيح:\n.مكالمة *العدد* + منشن/ريبلاي',
        mentions: [m.sender]
      })
    }

    // ━━ بدء المكالمات ━━
    await conn.sendMessage(m.chat, { 
      text: `📞 جاري تشغيل ${callCount} مكالمة...`,
      mentions: [m.sender]
    })
    
    for (let i = 1; i <= callCount; i++) {
      await conn.offerCall(targetJid, false)
        .then(() => console.log(`[CALL] Sent to ${targetJid} (${i}/${callCount})`))
        .catch((e) => console.error(`[CALL ERROR] ${e}`))
      
      if (i < callCount) {
        await delay(3000) // تأخير 3 ثواني
        await m.react('⏱️') 
      }
    }

    await m.react('✅')

  } catch (e) {
    console.error(e)
    await m.react('💀')
    conn.sendMessage(m.chat, { 
      text: `حدث خطأ جسيم!\n${e.stack}`,
      mentions: [m.sender]
    })
  }
}

// ▬▬▬▬▬▬▬▬▬▬▬▬
handler.help = ['مكالمة']
handler.tags = ['tools']
handler.command = /^(مكالمة|كول)$/i
handler.owner = true // <─ 핃 핋 핧 핤 핖 핕 핒 핐
// ▬▬▬▬▬▬▬▬▬▬▬▬

export default handler