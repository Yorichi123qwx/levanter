let handler = async (m, { conn, participants, args, command, isAdmin, isOwner }) => {
  if (!isAdmin && !isOwner) return m.reply(`⚠️ هذا الأمر مخصص للمشرفين فقط.`)

  if (!args.length) return m.reply(`⚠️ أدخل نصًا لطلب حضور ${command}.`)

  const pesan = args.join(' ').trim()
  const oi = `_${pesan}_`

  const listMembers = participants.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n')

  const message = 
`*⊱ ──── 《.⋅ 🐾 ⋅.》 ──── ⊰*
> *☘︎ استدعاء جميع الأعضاء*
> *☘︎ رسالة العضو:* ${oi}

*⊱ ──── 《.⋅ الأعضاء ⋅.》 ──── ⊰*
${listMembers}

> ⛔ جميع الأعضاء الذين تم طلب حضورهم.`.trim()

  await conn.sendMessage(m.chat, { text: message, mentions: participants.map(v => v.id) }, { quoted: m })
}

handler.command = /^(الاعضاء|الأعضاء)$/i
handler.group = true
handler.admin = true // هذا يجعل الأمر متاحًا فقط للإداريين

export default handler
