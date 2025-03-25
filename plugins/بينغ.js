import speed from 'performance-now'
//    const url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
let handler = async (m, { conn }) => {

    let _uptime = process.uptime() * 1000
    let timestamp = speed();
    let latensi = speed() - timestamp;
    //let commandText = m.text.split(' ')[0];
    m.reply(`┊〔السرعة〕: ${latensi.toFixed(4)} _ms_`);
};

handler.help = ['ping']
handler.tags = ['main']
handler.command = ['ping', 'speed','بينق','بنق','السرعه','السرعة','البنق','البينق','بينغ','بنغ','البينغ','البنغ']


export default handler
