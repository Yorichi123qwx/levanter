import { Chess } from 'chess.js';

const handler = async (m, { conn, args }) => {
  const key = m.chat;
  conn.chess = conn.chess || {};
  let chessData = conn.chess[key] || {
    gameData: null,
    fen: null,
    currentTurn: null,
    players: [],
    hasJoined: []
  };
  conn.chess[key] = chessData;
  const { gameData, fen, currentTurn, players, hasJoined } = chessData;
  const feature = args[0]?.toLowerCase();

  if (feature === 'احذف') {
    delete conn.chess[key];
    return conn.reply(m.chat, '♻️✨ | تـم حـذف غـرفـة الـشـطـرنـج بـنـجـاح 🏳️', m);
  }

  if (feature === 'صمم') {
    if (gameData) {
      return conn.reply(m.chat, '⚠️ | لـقـد تـم إنـشـاء اللـعـبـة بـالـفـعـل! 🎮', m);
    }
    chessData.gameData = { status: 'waiting', black: null, white: null };
    return conn.reply(m.chat, '♟️ | بـدأت لـعـبـة الـشـطـرنـج!\n🕹️ انـتـظـار لاعـب آخـر لـلانـضـمـام...', m);
  }

  if (feature === 'ادخل') {
    const senderId = m.sender;
    if (players.includes(senderId)) {
      return conn.reply(m.chat, '⚠️ | أنـت مـشـارك بـالـفـعـل فـي هـذه الـلـعـبـة! 🙅‍♂️', m);
    }
    if (!gameData || gameData.status !== 'waiting') {
      return conn.reply(m.chat, '🚫 | لا تـوجـد غـرفـة جـاهـزة حـالـيًـا! ❌', m);
    }
    if (players.length >= 2) {
      return conn.reply(m.chat, '👥 | اللـاعـبـيـن مـكـتـمـلـيـن!', m);
    }
    players.push(senderId);
    hasJoined.push(senderId);
    if (players.length === 2) {
      gameData.status = 'ready';
      const [black, white] = Math.random() < 0.5 ? [players[1], players[0]] : [players[0], players[1]];
      gameData.black = black;
      gameData.white = white;
      chessData.currentTurn = white;
      return conn.reply(m.chat, `🏁 | اللاعـبـيـن الـمـنـضـمـون:\n${hasJoined.map(playerId => `- @${playerId.split('@')[0]}`).join('\n')}\n\n⚫ | الأسـود: @${black.split('@')[0]}\n⚪ | الأبـيـض: @${white.split('@')[0]}\n\n🎲 | أكـتـب 〖 .شطرنج ابدا 〗لـبـدء اللـعـبـة`, m, { mentions: hasJoined });
    } else {
      return conn.reply(m.chat, '🙋‍♂️ | تـم انـضـمـامـك لـلـغـرفـة!\n🔄 انـتـظـار لاعـب آخـر...', m);
    }
  }

  if (feature === 'ابدا') {
    if (gameData.status !== 'ready') {
      return conn.reply(m.chat, '⚠️ | لا يـمـكـن بـدء الـلـعـبـة!\n⏳ انـتـظـر اكـتـمـال الـلاعـبـيـن...', m);
    }
    gameData.status = 'playing';
    const senderId = m.sender;
    if (players.length === 2) {
      const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      chessData.fen = fen;
      const encodedFen = encodeURIComponent(fen);
      const turn = `🎲 | دور اللـعـب لـلأبـيـض: @${gameData.white.split('@')[0]} ✨`;
      const flipParam = senderId === gameData.black ? '' : '&flip=true';
      const boardUrl = `https://chessboardimage.com/${encodedFen}.png`;

      try {
        await conn.sendFile(m.chat, boardUrl, '', turn, m, false, { mentions: [gameData.white] });
      } catch (error) {
        const boardUrl2 = `https://chessboardimage.com/${encodedFen}-flip.png`;

        await conn.sendFile(m.chat, boardUrl2, '', turn, m, false, { mentions: [gameData.white] });
      }
      return;
    } else {
      return conn.reply(m.chat, '🔄 | انـتـظـار لاعـب آخـر...', m);
    }
  }

  if (feature === 'شرح') {
    return conn.reply(m.chat, `
*⛩️شرح لعبة الشطرنج⛩️*
┓🎓─━─━─━─━─━─━─┏
┊للإنضمام للغرفة *〔.شطرنج ادخل〕* 
┊لبدئ اللعبة *〔.شطرنج ابدا〕* 
┊لحذف الغرفة *〔.شطرنج احذف〕* 
┊لتحريك قطعة *〔.شطرنج a4 a2〕*
┛─━─━─━─━─━─━─🎓┗`, m);
  }

  return conn.reply(m.chat, '🧸┊ *غير صحيح |❌*\n🧸┊ *قم بكتابة 〔.شطرنج شرح〕*\n🧸┊ *لمعرفة أوامر اللعبة |⛩️*', m);
};

handler.help = ['شطرنج [from to]', 'شطرنج حذف', 'شطرنج ادخل', 'شطرنج ابدأ'];
handler.tags = ['game'];
handler.command = /^(شطرنج|chess)$/i;

export default handler;
