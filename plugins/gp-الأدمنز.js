let handler = async (m, { conn, participants, groupMetadata, args, command }) => {
  if (!args.length) return m.reply(`⚠️ أدخل نصًا لطلب حضور ${command}.`)

  const groupAdmins = participants.filter(p => p.admin)

  if (!groupAdmins.length) {
    return m.reply(`⚠️ لا يوجد إداريين في هذه المجموعة.`)
  }

  const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || `${m.chat.split`-`[0]}@s.whatsapp.net`
  const pesan = args.join(' ').trim()
  const oi = `_${pesan}_`

  const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n')

  const message = 
`*⊱ ──── 《.⋅ 💫 ⋅.》 ──── ⊰*
> *☘︎ استدعاء حضور ${command}*
> *☘︎ رسالة العضو:* ${oi}

*⊱ ─── 《.⋅ المشرفين ⋅.》 ─── ⊰*
${listAdmin}

⛔ الإداريين الذين تم طلب حضورهم.`.trim()

  await conn.sendMessage(m.chat, { text: message, mentions: [...groupAdmins.map(v => v.id), owner] }, { quoted: m })
}

handler.command = /^(الادمنز|@الادمن|الادمن|المشرفين)$/i
handler.group = true

export default handler
