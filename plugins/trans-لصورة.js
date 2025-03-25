import { webp2png } from '../libraries/webp2mp4.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    const notStickerMessage = `✳️ قم بالرد على ملصق بـ:\n\n *${usedPrefix + command}*`
    if (!m.quoted) throw notStickerMessage
    const q = m.quoted || m
    let mime = q.mediaType || ''
    if (!/sticker/.test(mime)) throw notStickerMessage
    let media = await q.download()
    let out = await webp2png(media).catch(_ => null) || Buffer.alloc(0)
    await conn.sendFile(m.chat, out, 'out.png', '*تفضل طلبك يا حب🥰*', m)
}
handler.help = ['toimg <sticker>']
handler.tags = ['sticker']
handler.command = ['لصوره', 'jpg', 'لصورة'] 

export default handler
