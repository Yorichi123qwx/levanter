//import db from '../lib/database.js'

let handler = async (m, { conn, text, isROwner, isOwner }) => {
  if (text) {
    global.db.data.chats[m.chat].sWelcome = text
    m.reply('*تــم وضــع رســالــة الــتـرحـيب !*')
  } else {
m.reply( `*أدخــل رســالــة الـتـرحــيب !*\n*عــشان تــعـمل مـنــشن أكــتب @user, عــشان تـحط أســم الـجروب أكـتب @group, عــشان تـحط وصــف أكــتب @desc*`)
}
}
handler.help = ['setwelcome <text>']
handler.tags = ['group']
handler.command = ['الترحيب','تغيرالترحيب'] 
handler.admin = true
handler.owner = false
handler.group = true
export default handler