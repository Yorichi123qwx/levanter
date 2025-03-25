import {watchFile, unwatchFile} from 'fs';
import chalk from 'chalk';
import {fileURLToPath} from 'url';
import fs from 'fs'; 
import moment from 'moment-timezone';

global.botnumber = ""
global.confirmCode = ""
global.authFile = `TheEndSession`;
global.linkedFile = `TheEndLinked`;
global.tmpFile = 'tmp';

global.defaultLenguaje = 'ar';
global.isBaileysFail = false

global.owner = [
['201009480596', '〔𝐘𝐎𝐑𝐈𝐂𝐇𝐈 𝐌𝐕𝐋〕', true]
 
];

global.ownername = '𝚖𝚘𝚑𝚊𝚖𝚎𝚍 𝚎𝚕𝚜𝚑𝚊𝚖𝚢';
global.ownernumber = '201009480596';
global.ownerid = '201009480596@s.whatsapp.net';
  
global.rowner = [
['201009480596', '𝚖𝚘𝚑𝚊𝚖𝚎𝚍 𝚎𝚕𝚜𝚑𝚊𝚖𝚢', true],
];
global.registers = [];
global.suittag = [ '201008592761'];
global.prems = ['201008592761'];
global.mods = ['201008592761'];

global.nbot = ['𝐒𝐏𝐈𝐃𝐄𝐑-𝐁𝐎𝐓', 'ՏᑭIᗪᗴᖇ-ᗷOT', '𝕊ℙ𝕀𝔻𝔼ℝ-𝔹𝕆𝕋'];

global.wm = await nbot[Math.floor(Math.random() * nbot.length)];

global.postarIconUrl = [ 'https://i.postimg.cc/xTD57HH3/6ebf1126b5750d682d06892e65a9304d.jpg', 'https://i.postimg.cc/xTD57HH3/6ebf1126b5750d682d06892e65a9304d.jpg']

 global.postarIcon = await postarIconUrl[Math.floor(Math.random() * postarIconUrl.length)];

global.packname = 'ᗴᒪՏᕼᗩᗰY-ᗰᐯᒪ';
global.author = '𝑺𝑷𝑰𝑫𝑬𝑹-𝑩𝑶𝑻';
global.wm2 = '𝑠𝑝𝑖𝑑𝑒𝑟-𝑀𝑉𝐿';
global.titulowm = '𝘴𝘱𝘪𝘥𝘦𝘳-𝘉𝘖𝘛';
global.titulowm2 = '𝗦𝗣𝗜𝗗𝗘𝗥-𝗕𝗢𝗧';
global.igfg = '𝗦𝗣𝗜𝗗𝗘𝗥-𝗕𝗢𝗧';

global.wait = '*⎆─┈⌛〔جـاري التـحميل....〕*';
global.waitt = '*↝ صـليـﮯ عليـﮯ رسـول آللهہ‏‏ ...*';

global.channelId = ["120363351206518144@newsletter"];
global.channelName =  ["┊🕸⧼𝐒𝐏𝐈𝐃𝐄𝐑 𝐁𝐎𝐓⧽🕸┊","┊🕷⧼𝐒𝐏𝐈𝐃𝐄𝐑 𝐔𝐏𝐃𝐀𝐓𝐄⧽🕷┊","┊🍷⧼𝐓𝐄𝐀𝐌 𝐌𝐕𝐋⧽🍷┊"];
global.channelUrl = 'https://whatsapp.com/channel/0029VascwNL60eBiGZOQz647';

global.randomchannelId = await global.channelId[Math.floor(Math.random() * global.channelId.length)];
global.randomchannelName = await global.channelName[Math.floor(Math.random() * global.channelName.length)];

global.adsRandomChannel = {
newsletterJid: global.randomchannelId, 
newsletterName: global.randomchannelName, 
serverMessageId: 100
};

global.adsAdReply = {
title: '◈─🍷〘𝐘𝐎𝐑𝐈𝐂𝐇𝐈-𝐌𝐕𝐋〙🍷─◈',
body: '◈─🍷〘ՏᑭIᗪᗴᖇ-ᗰᐯᒪ〙🍷─◈',
sourceUrl: global.channelUrl,
thumbnailUrl: global.postarIcon,
mediaType: 1,
renderLargerThumbnail: true
};

global.styel1 = '┌─ 〘 ';
global.styel2 = ' 〙 ─ ⳹';
global.styel3 = '│✑ 「 ';
global.styel4 = ' 」';
global.styel5 = '└┬ ✑ 「 ';
global.styel6 = '│✑ ';
global.styel7 = '「 ';

global.tx1 = '╭────┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄────╮';
global.tx2 = '│';
global.tx3 = '├';
global.tx4 = '┤';
global.tx5 = '───┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄───';
global.tx6 = '◈─┄┄┄┄〘';
global.tx7 = '〙┄┄┄┄─◈';
global.tx8 = '┄┄⋗';
global.tx9 = '├───┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄───┤';
global.tx10 = '╰────┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄────╯';




global.img1 = 'https://i.postimg.cc/xTD57HH3/6ebf1126b5750d682d06892e65a9304d.jpg';
global.img2 = 'https://i.postimg.cc/xTD57HH3/6ebf1126b5750d682d06892e65a9304d.jpg';
global.img3 = 'https://i.postimg.cc/xTD57HH3/6ebf1126b5750d682d06892e65a9304d.jpg';
global.img4 = 'https://i.postimg.cc/GhmVLVqm/8c85cee14b9bb66e93c2e2214c0a3418.jpg';
global.img5 = 'https://i.postimg.cc/GhmVLVqm/8c85cee14b9bb66e93c2e2214c0a3418.jpg';
global.img6 = 'https://i.postimg.cc/GhmVLVqm/8c85cee14b9bb66e93c2e2214c0a3418.jpg';

global.imagen1 = await postarIconUrl[Math.floor(Math.random() * postarIconUrl.length)];

global.web = 'https://spider-2.vercel.app/';


global.d = new Date(new Date().toLocaleString("en-US", {timeZone: "Africa/Cairo"}));
  //new Date(new Date + 3600000);
global.locale = 'ar';

global.dia = d.toLocaleDateString(locale, {weekday: 'long'});
global.fecha = d.toLocaleDateString('ar', {day: 'numeric', month: 'numeric', year: 'numeric'});
global.mes = d.toLocaleDateString('ar', {month: 'long'});
global.año = d.toLocaleDateString('ar', {year: 'numeric'});
global.tiempo = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});

global.week = d.toLocaleDateString(locale, { weekday: 'long' });
global.day = d.toLocaleDateString('en', { day: '2-digit' });
global.month = d.toLocaleDateString(locale, { month: 'long' });
global.year = d.toLocaleDateString('en', { year: 'numeric' });
global.time = d.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });


global.wm2 = `© 𝗥𝗮𝗺𝘀𝗲𝘀 - 𝗕𝗼𝘁`;

global.channel = 'https://whatsapp.com/channel/0029VascwNL60eBiGZOQz647';

global.ramsesbot = '';


global.nomorown = '201009480596';
global.pdoc = ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/msword', 'application/pdf', 'text/rtf'];

global.botdate = `*[ 📅 ] التاريخ :*  ${moment.tz('Africa/Cairo').format('DD/MM/YY')}`;
global.bottime = `*[ ⏳ ] الوقت :* ${moment.tz('Africa/Cairo').format('HH:mm:ss')}`;

global.fgif = {key: {participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false}, message: {'videoMessage': {'title': wm, 'h': bottime, 'seconds': '', 'gifPlayback': 'true', 'caption': 'Welcom To Bot', 'jpegThumbnail': fs.readFileSync('./src/icon.png')}}};
global.fmsg = {key: {participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false}, message: {conversation: 'ᗴᒪՏᕼᗩᗰY ᗰᐯᒪ'}};
global.fcon = {key: {participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false, 'id': wm}, message: {'contactMessage': { 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid= '201145624848@s.whatsapp.net':'201145624848@s.whatsapp.net'\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, 'participant': '0@s.whatsapp.net' };
global.fgif2 = {key: {participant: '0@s.whatsapp.net',  ...('6289643739077-1613049930@g.us' ? {remoteJid: '6289643739077-1613049930@g.us'} : {})}, message: {'videoMessage': {'title': '𝕊ℍ𝔸𝕎𝔸ℤ𝔸-𝔹𝕆𝕋', 'h': `Hmm`, 'seconds': '99999', 'gifPlayback': 'true', 'caption': '𝐓𝐡𝐞 𝐄𝐧𝐝 - 𝐁𝐨𝐭', 'jpegThumbnail': false}}};
global.fgrp = {key: {participant: '0@s.whatsapp.net', remoteJid: '6289643739077-1613049930@g.us', fromMe: false, 'id': wm}, message: {'contactMessage': { 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid= '201145624848@s.whatsapp.net':'201145624848@s.whatsapp.net'\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, 'participant': '0@s.whatsapp.net' };
global.floc = {key: {participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false}, message: {locationMessage: {degreesLatitude: 37.7749, degreesLongitude: -122.4194, name: 'Palestine', address: 'San Francisco, CA, USA', url: 'https://maps.google.com/?q=37.7749,-122.4194'}}};
global.frol = {key: {participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false}, message: {orderMessage: { itemCount: 2024, status: 1, thumbnail: 'https://i.postimg.cc/xTD57HH3/6ebf1126b5750d682d06892e65a9304d.jpg', surface: 1, message: wm, orderTitle: packname, sellerJid: '0@s.whatsapp.net' } } };

global.multiplier = 99;
global.flaaa = [
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text=',
];



const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright('Update \'config.js\''));
  import(`${file}?update=${Date.now()}`);
});
