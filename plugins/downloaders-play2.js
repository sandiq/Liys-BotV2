const xyz = require("@xyzteams/scapers").Scapers;
let handler = async (m, { text, conn, args, usedPrefix, command }) => {
  const a = await xyz.Download.youtube.search(text).then(async (res) => {
    if (!res) throw "No results found";
    let data = await res[0];
    if (data.duration.seconds > 600) throw "Max duration is 10 minutes";
    await conn.sendMessage(
      m.chat,
      {
        text: `Title: ${data.title}\nDuration: ${
          data.duration.timestamp
        }\nDate Uploaded: ${
          data.publish ? data.publish : "Not known"
        }\nViews: ${data.views}\nThumbnail: ${
          data.thumbnail
        }\n\n\nDownloading...,`,
        contextInfo: {
          externalAdReply: {
            title: "Play Audio",
            body: wm,
            thumbnailUrl: data.thumbnail,
            sourceUrl: data.url,
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
    return data.url;
  });
  await xyz.Download.youtube.youtube(a).then(async (res) => {
    if (!res) throw "No results found";
    await conn.sendMessage(
      m.chat,
      {
        audio: { url: res.audio.url },
        mimetype: "audio/mp4",
      },
      { quoted: m }
    );
  });
};
handler.help = ["play2"];
handler.tags = ["downloader"];
handler.command = ["play2"];

module.exports = handler;
