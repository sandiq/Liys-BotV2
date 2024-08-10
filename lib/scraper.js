/**
* Base By NdyZz [ github.com/NdyZz ]
* Created On 1/7/2024
* Contact Me on wa.me/6285346923840
*/

const FormData = require("form-data"),
Jimp = require("jimp"),
axios = require('axios'),
cheerio = require('cheerio'),
{
  getBase64
} = require('./myfunc.js'),
fs = require('fs');

async function remini(urlPath, method) {
  return new Promise(async (resolve, reject) => {
    let Methods = ["enhance", "recolor", "dehaze"];
    Methods.includes(method) ? (method = method): (method = Methods[0]);
    let buffer,
    Form = new FormData(),
    scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/" + method;
    Form.append("model_version", 1, {
      "Content-Transfer-Encoding": "binary",
      contentType: "multipart/form-data; charset=uttf-8",
    });
    Form.append("image", Buffer.from(urlPath), {
      filename: "enhance_image_body.jpg",
      contentType: "image/jpeg",
    });
    Form.submit(
      {
        url: scheme,
        host: "inferenceengine" + ".vyro" + ".ai",
        path: "/" + method,
        protocol: "https:",
        headers: {
          "User-Agent": "okhttp/4.9.3",
          Connection: "Keep-Alive",
          "Accept-Encoding": "gzip",
        },
      },
      function (err, res) {
        if (err) reject();
        let data = [];
        res
        .on("data", function (chunk, resp) {
          data.push(chunk);
        })
        .on("end", () => {
          resolve(Buffer.concat(data));
        });
        res.on("error", (e) => {
          reject();
        });
      }
    );
  });
}

async function jarak(dari, ke) {
  var html = (await axios(`https://www.google.com/search?q=${encodeURIComponent('jarak ' + dari + ' ke ' + ke)}&hl=id`)).data
  var $ = cheerio.load(html), obj = {}
  var img = html.split("var s=\'")?.[1]?.split("\'")?.[0]
  obj.img = /^data:.*?\/.*?;base64, /i.test(img) ? Buffer.from(img.split`,` [1], 'base64') : ''
  obj.desc = $('div.BNeawe.deIvCb.AP7Wnd').text()?.trim()
  return obj
}

const ssweb = (url, device = 'desktop') => {
  return new Promise((resolve,
    reject) => {
    const base = 'https://www.screenshotmachine.com'
    const param = {
      url: url,
      device: device,
      cacheLimit: 0
    }
    axios( {
      url: base + '/capture.php',
      method: 'POST',
      data: new URLSearchParams(Object.entries(param)),
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then((data) => {
      const cookies = data.headers['set-cookie']
      if (data.data.status == 'success') {
        axios.get(base + '/' + data.data.link, {
          headers: {
            'cookie': cookies.join('')
          },
          responseType: 'arraybuffer'
        }).then(({
            data
          }) => {
          result = {
            status: 200,
            result: data
          }
          resolve(result)
        })
      } else {
        reject( {
          status: 404, statuses: `Link Error`, message: data.data
        })
      }
    }).catch(reject)
  })
}

async function pinterest(querry) {
  let HASIL = [];
  await axios
  .request(`https://id.pinterest.com/search/pins/?rs=typed&q=` + querry, {
    method: "GET",
    url: "https://id.pinterest.com/search/pins/?rs=typed&q=" + querry,
    headers: {
      "sec-ch-ua":
      '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
      "sec-ch-ua-mobile": "?0",
      "upgrade-insecure-requests": "1",
      cookie:
      'csrftoken=ebe0be3a93cea6072be18633add953a2; _b="AVezvd6F4UtE24FUsA6INxipyZZDoSpyCc5vaJK4QDYXmExosVEc4h6WkiKhlVtQ430="; cm_sub=denied; fba=True; _ga=GA1.2.862909259.1620474446; g_state={"i_l":0}; _auth=1; _pinterest_sess=TWc9PSZ0VEZqZmdDSlJYaGU5REIvNklIcVlnMjE5b0ZraTE5REJVQ0JiMUwxTkZZaGFoVk1sRDVhOFlwQzhkQnQ0YkMwRlNyV0lIWUFlK0ZVTkVxYUhKNmlvZ0R1UXlQYTBRRVVhMU1yYkpmcXpHK3UyNjNhckRqUFFOYVJVa3RnVmJtVzd2MmRGaHFMZUpLNVhtaHptTDhWSnBSdXhZY0FhRnRTN3J1S0V4cGtsVTBxeE54NkF2blVNSFV3R0NTQTR1bVVNRURGVGdnYlN5UjdBbk9YcHVGbGI3a1kwd1dEZDgrZVM1SDc3V0pJMm00OWxKUDVNQjBLVlFocTB4Mjg1M1RnbGxBaFAxbS9MTnVzei91cEQvcjBtakp6N0ZnU2t1Y3NxWW1DRDV1Q3h0ankvQ3FEWGh3MXczcXBHNXJpYVNCMHB6dUoxMGF6ZzVxN2VqQVBoSElSd0tiQk41ZVRPQXlOaGNpNzVQMWJSeVZJbCtYYVMxQ1ZRUFUwalU3eGVzMGRySlNzdWo1NG5uaXNFM3ZpT0o0TkZHR1daUXlwaXFQclMwa04raW9xVnVaTTRSVGEzTE03TVlZcmZYVDd5UmVPd2lZaGw4aE9VMHJBd0tidEsrcHdPWk96RlFMekVLTzY3VU1PL0tIYUdwUE1IWVdJNnJXalBkU09Sb3dEaHlQVVR1T1RqNW5Sc2FRdmVkZmhkMk9HNHBCL0ZpZ3NMdmZvVW9ReVltTFBCTlNLWHpray9LNWJ2UTNvTlBzVm9aZjRvYWRvRFhla0dBNzdveWJVYXZmVFp2cnFFNU5DYUVwSHhxeDlIajNIVTlHaEVYdGptWm5mSGVSRmtIMmQwVVVVZlVCVEh6UHB3TnBtdWV0b2l6L3VTc3pXMXFGN3lHS3ZJM3BwL0NrWVJDMm1HY2tROGxuQVFRNS9OUW45R3dtSk8zeFJidVFSTG1qTG5PelAvKzd3T3lrN1NoKzBHVGNTY1pGSEY0bW8xcGVmc3NtclBhTWE2QUMxOXNpQWUwRmo4UHl0ZGpwUzhUQXVhbjYwT0ZJeHhHai8yOWFUVTA1Wkx2czN4VSttLzMvbkFVQ2svWnZvNC9xZ3E4VkhYSFZ5elo4TzhtU0o5c3ZDcEJyYjE3QVI1WHlmTTFhWThvWHQ1T0tSTWRsWnI3a1lpU245dEVLd1lZSXRremtkTUZmcVA2YUg0c1UrSk1JOWJVRzZpcWd3T0NVaFZkdUh3UUdURi9sbDBqT2pBZVV2ZnlTQzc5ZnBMYkFMQ1ZsWjdIYWcmaDc1Uk5kK2I4MjFMUXBaVUthci9rVHpCUWRvPQ==; _pinterest_cm="TWc9PSYxZnpkMS9XN29Rd2R0TnpBN0RzVktja1J4NUtINUJqRzNGODFXS0xES1pndWlNVm52a0d3V0JocmVIS3p5eDdnNXNZa0hGelNQNDBSTFRId3ZhTFFIQjRGOW1lNlJZMzFiVlg1MHhSOFpmMGhRZUoySUpJZDIyWlVYMjRXNHRaL1lodFl4eW1jWjNyTklpbytYbHZyd29nRm5DY0pQOGgyUWpDdk9zQ1craXR5VEZoNHV4ZzRnOXV4SUFFSStYZCsmT08zMFI1bktXa3pwSDFtK3NNRWpxWWNpQzNzPQ=="; _routing_id="595f24cd-7f4c-4495-aa67-37212d099cd8"; sessionFunnelEventLogged=1',
    },
  })
  .then((res) => {
    const $ = cheerio.load(res.data);
    let hasil = [];
    $(
      "body > div > div > div > div > div > div > div > div > div > div > div",
    ).each(function (a,
        b) {
        $(b)
        .find("div")
        .each(function (c, d) {
          let Link = $(d)
          .find("div > div > div > div > a")
          .find("img")
          .attr("src");
          hasil.push(Link);
        });
      });

    const output = hasil
    .filter((v) => v !== undefined)
    .map((v) => v.replace("236x",
      "originals"))
    .filter((url) => url.includes("/originals/"));
    const result = {
      status: res.status,
      creator: "NdyZz",
      result: [...new Set(output)],
    };
    HASIL.push(result);
  });
  return HASIL[0];
}

function quotesAnime() {
  return new Promise((resolve,
    reject) => {
    const page = Math.floor(Math.random() * 184)
    axios.get('https://otakotaku.com/quote/feed/'+page)
    .then(({
      data
    }) => {
      const $ = cheerio.load(data)
      const hasil = []
      $('div.kotodama-list').each(function(l, h) {
        hasil.push({
          link: $(h).find('a').attr('href'),
          gambar: $(h).find('img').attr('data-src'),
          karakter: $(h).find('div.char-name').text().trim(),
          anime: $(h).find('div.anime-title').text().trim(),
          episode: $(h).find('div.meta').text(),
          up_at: $(h).find('small.meta').text(),
          quotes: $(h).find('div.quote').text().trim()
        })
      })
      resolve(hasil)
    }).catch(reject)
  })
}

function hentaivid() {
  return new Promise((resolve,
    reject) => {
    const page = Math.floor(Math.random() * 1153);
    axios.get("https://sfmcompile.club/page/" + page).then((data) => {
      const $ = cheerio.load(data.data);
      const hasil = [];
      $("#primary > div > div > ul > li > article").each(function (a, b) {
        hasil.push({
          title: $(b).find("header > h2").text(),
          link: $(b).find("header > h2 > a").attr("href"),
          category: $(b)
          .find("header > div.entry-before-title > span > span")
          .text()
          .replace("in ", ""),
          share_count: $(b)
          .find("header > div.entry-after-title > p > span.entry-shares")
          .text(),
          views_count: $(b)
          .find("header > div.entry-after-title > p > span.entry-views")
          .text(),
          type: $(b).find("source").attr("type") || "image/jpeg",
          video_1:
          $(b).find("source").attr("src") ||
          $(b).find("img").attr("data-src"),
          video_2: $(b).find("video > a").attr("href") || "",
        });
      });
      resolve(hasil);
    });
  });
}

async function stickersearch(query) {
  return new Promise((resolve) => {
    axios.get(`https://getstickerpack.com/stickers?query=${encodeURIComponent(query)}`).then(({
      data
    }) => {
      const $ = cheerio.load(data)
      const link = [];
      $('#stickerPacks > div > div:nth-child(3) > div > a').each(function(a, b) {
        link.push($(b).attr('href'))
      })
      let rand = link[Math.floor(Math.random() * link.length)]
      axios.get(rand).then(({
        data
      }) => {
        const $$ = cheerio.load(data)
        const url = [];
        $$('#stickerPack > div > div.row > div > img').each(function(a, b) {
          url.push($$(b).attr('src').split('&d=')[0])
        })
        resolve( {
          title: $$('#intro > div > div > h1').text(),
          author: $$('#intro > div > div > h5 > a').text(),
          author_link: $$('#intro > div > div > h5 > a').attr('href'),
          sticker: url
        })
      })
    })
  })
}

function uuid() {
  let d = new Date().getTime()
  let d2 = (performance && performance.now && (performance.now() * 1000)) || 0
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16
    if (d > 0) {
      r = (d + r) % 16 | 0
      d = Math.floor(d / 16)
    } else {
      r = (d2 + r) % 16 | 0
      d2 = Math.floor(d2 / 16)
    }
    return (c === 'x' ? r: (r & 0x3) | 0x8).toString(16)
  })
}

async function thinkany(prompt) {
  try {
    const response = await axios.post("https://thinkany.ai/api/chat",
      {
        role: 'user',
        content: prompt,
        conv_uuid: uuid(),
        mode: 'search',
        is_new: true,
        model: 'claude-3-haiku'
      },
      {
        "Content-Type": "application/json"
      })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function happymod(query) {
  try {
    const res = await axios.get("https://unduh.happymod.com/search.html?q=" + query);
    const html = res.data;
    const $ = cheerio.load(html);
    const hsl = [];
    $('article.flex-item').each((index, element) => {
      const appName = $(element).find('h2.has-normal-font-size.no-margin.no-padding.truncate').text().trim();
      const appVersion = $(element).find('div.has-small-font-size.truncate').first().text().trim();
      const appUrl = $(element).find('a.app.clickable').attr('href');

      if (appName && appVersion && appUrl) {
        hsl.push({
          name: appName,
          version: appVersion,
          url: "https://unduh.happymod.com/"+appUrl
        });
      }
    });
    return {
      status: true,
      hsl
    }
  } catch (error) {
    return {
      status: false,
      message: "permintaan tidak dapat diproses!!"
    }
  }
}

async function igStory(url) {
  try {
    const response = await axios( {
      method: 'post',
      url: 'https://v3.igdownloader.app/api/ajaxSearch',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*'
      },
      data: qs.stringify({
        recaptchaToken: '',
        q: url,
        t: 'media',
        lang: 'en'
      })
    })

    const $ = cheerio.load(response.data.data)
    const downloads = []

    $('.download-items').each((index, element) => {
      const thumbnail = $(element).find('.download-items__thumb img').attr('src')
      const download = $(element).find('.download-items__btn a').attr('href')
      const title = $(element).find('.download-items__btn a').attr('title')

      downloads.push({
        author,
        title,
        thumbnail,
        download
      })
    })

    return downloads
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function geospy(url, apikey) {
  try {
    const dat = await getBase64(url)
    const options = {
      method: 'POST',
      url: 'https://dev.geospy.ai/predict',
      headers: {
        Authorization: `Bearer ${apikey}`,
        'Content-Type': 'application/json'
      },
      data: {
        top_k: 1,
        image: dat.split(',')[1]
      }
    };
    await axios.request(options)
    .then(function (response) {
      const result = response.data
      return {
        status: true,
        result
      }
    })
    .catch(function (e) {
      console.error(e);
      return {
        status: false,
        message: 'apikey expired'
      }
    });
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'apikey expired'
    }
  }
};

async function simsimi(text) {
  try {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Accept-Language': 'id,en-US;q=0.7,en;q=0.3',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
      'Origin': 'https://simsimi.vn',
      'Alt-Used': 'simsimi.vn',
      'Connection': 'keep-alive',
      'Referer': 'https://simsimi.vn/',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin'
    }

    const data = {
      text,
      lc: 'id'
    }

    const response = await axios.post('https://simsimi.vn/web/simtalk',
      data,
      {
        headers
      });
    const results = {
      status: true,
      success: response.data.success
    };
    return results
  } catch (err) {
    const e = String(err);
    console.log(err)
    return {
      status: false,
      message: e
    }
  }
};

async function igstalk(username) {
  try {
    const {
      data
    } = await axios.get(`https://dumpor.com/v/${username}`,
      {
        headers: {
          "user-agent": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "cookie": "_inst_key=SFMyNTY.g3QAAAABbQAAAAtfY3NyZl90b2tlbm0AAAAYT3dzSXI2YWR6SG1fNFdmTllfZnFIZ1Ra.5Og9VRy7gUy9IsCwUeYW8O8qvHbndaus-cqBRaZ7jcg; __gads=ID=f8ead4404e6a0e16-2206b4189ace0028:T=1636352226:RT=1636352226:S=ALNI_MbsEYYwp3U-9PJHoUHPA0mj4zn3uQ; _ym_uid=1636352226596108095; _ym_d=1636352226; _ym_isad=2; __atssc=google%3B1; FCNEC=[[\"AKsRol8BmQbGXTRP_1wzoi3Qg8PSMr7FFU0k- LGYROfG4nmvg - yFq6fARCalcofDHQIoyhwlo75582yk2a5WLTZakmPZu - SIkkXQNAePmtpVXwaPISfK8HC1pJ8tUjrRWRiFfjPaZh3rC - _6nkHQN25c - 1YR- NJtDQ == \"],null,[]]; FCCDCF=[null,null,[\"[[], [], [], [], null, null, true]\",1636352300969],null,null,null,[]]; __atuvc=3%7C45; __atuvs=6188c0df986e798b002"
        }
      })
    const $ = cheerio.load(data);
    let results = {}

    results.profileImg = $('div.avatar img').attr('src') || '';
    results.username = $('h1').text().trim() || '';
    results.name = $('h2').text().trim() || '';
    results.bio = $('div.text-sm').text().trim() || '';
    results.followers = $('.stat:nth-child(2) .stat-value').text() || '';
    results.followings = $('.stat:nth-child(3) .stat-value').text() || '';

    let posts = [];
    $('.card').each((index, element) => {
      const postImg = $(element).find('img').attr('src') || '';
      const caption = $(element).find('.font-sans').text().trim() || '';
      posts.push({
        postImg, caption
      });
    });
    results.posts = posts;
    return results
  } catch (e) {
    console.error(e)
    throw 'Not found ;-;'
  }
}

async function ttSearch(query) {
  return new Promise(async (resolve, reject) => {
    axios("https://tikwm.com/api/feed/search", {
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        cookie: "current_language=en",
        "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
      },
      data: {
        keywords: query,
        count: 12,
        cursor: 0,
        web: 1,
        hd: 1,
      },
      method: "POST",
    }).then((res) => {
      resolve(res.data.data);
    });
  });
}

async function xhentai(page) {
  return new Promise((resolve, reject) => {
    axios.get('https://sfmcompile.club/page/'+page)
    .then((data) => {
      const $ = cheerio.load(data.data)
      const hasil = []
      $('#primary > div > div > ul > li > article').each(function (a, b) {
        hasil.push({
          title: $(b).find('header > h2').text(),
          link: $(b).find('header > h2 > a').attr('href'),
          category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
          share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
          views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
          type: $(b).find('source').attr('type') || 'image/jpeg',
          video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
          video_2: $(b).find('video > a').attr('href') || ''
        })
      })
      resolve(hasil)
    })
  })
}

async function waifu() {
  try {
    const url = 'https://boredhumans.com/apis/boredagi_api.php'
    const request = 'prompt=Generate%2520a%2520waifu%2520image&uid=lwe7libs77c253hbtu9&sesh_id=None&get_tool=false&tool_num=42'

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded charset=UTF-8',
      'Accept': '*/*',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Googlebot-News'
    }

    const response = await axios.post(url,
      request,
      {
        headers
      })

    const data = response.data.output
    const $ = cheerio.load(data)
    const imgElement = $('img.img-fluid')
    const imgUrl = imgElement.attr('src')

    return imgUrl
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = {
  remini,
  jarak,
  ssweb,
  pinterest,
  quotesAnime,
  hentaivid,
  stickersearch,
  thinkany,
  happymod,
  igStory,
  geospy,
  simsimi,
  igstalk,
  ttSearch,
  xhentai,
  waifu
}

let chalk = require("chalk");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});