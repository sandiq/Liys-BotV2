/**
* Base By NdyZz [ github.com/NdyZz ]
* Created On 1/7/2024
* Contact Me on wa.me/6285346923840
*/

const fetch = require('node-fetch');
const cheerio = require('cheerio');
const bingUrl = 'https://www.bing.com';

class BingApi {
   constructor(cookie) {
      this.cookie = cookie;
      this.headers = {
         'User-Agent':
         'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0',
         Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
         'Accept-Language': 'en-US,en;q=0.5',
         'Content-Type': 'application/x-www-form-urlencoded',
         'Alt-Used': 'www.bing.com',
         'Upgrade-Insecure-Requests': '1',
         'Sec-Fetch-Dest': 'document',
         'Sec-Fetch-Mode': 'navigate',
         'Sec-Fetch-Site': 'same-origin',
         'Sec-Fetch-User': '?1',
         Cookie: `${cookie};`,
         'X-Forwarded-For': `20.${this.getRandomNum()}.${this.getRandomNum()}.${this.getRandomNum()}`,
      };
   }

   async createImages(prompt, isSlowMode) {
      try {
         const payload = `q=${encodeURIComponent(prompt)}`;
         let credits = await this.getCredits();
         if (!credits) {
            credits = 0;
         }
         let response = await this.sendRequest(credits > 0 ? isSlowMode : true, payload);

         if (response.status === 200) {
            const responseHtml = await response.text();
            const $ = cheerio.load(responseHtml);
            const errorAmount = $('.gil_err_img.rms_img').length;
            if (!isSlowMode && credits > 0 && $('#gilen_son').hasClass('show_n')) {
               throw 'Dalle-3 is currently unavailable due to high demand';
            } else if ($('#gilen_son').hasClass('show_n') || (errorAmount === 2 && credits > 0 && isSlowMode)) {
               throw 'Slow mode is currently unavailable due to high demand';
            } else if (errorAmount === 2) {
               throw 'Invalid cookie';
            } else if (errorAmount === 4) {
               throw 'Prompt has been blocked';
            } else {
               throw 'Unknown error';
            }
         }

      const eventId = response.headers.get('x-eventid');
      return await this.retrieveImages(eventId);
    } catch (error) {
      console.log(`error is ${error}`);
    }
  }

   async getCredits() {
      const response = await fetch(`${bingUrl}/create`, {
         headers: this.headers,
         method: 'GET',
         mode: 'cors',
      });
      const html = await response.text();
      const $ = cheerio.load(html);
      return $('#token_bal').text();
   }

   getRandomNum() {
      return Math.floor(Math.random() * 254) + 1;
   }

   async sendRequest(isSlowMode, payload) {
      try {
         const response = await fetch(`${bingUrl}/images/create?${payload}&rt=${isSlowMode ? '3' : '4'}`,
            {
               headers: this.headers,
               method: 'POST',
               mode: 'cors',
               redirect: 'manual',
            }
         );
         return response;
      } catch (error) {
         console.log('Error in sendRequest:', error);
      }
   }

   async retrieveImages(eventId) {
      try {
         while (true) {
            const images = await fetch(`${bingUrl}/images/create/async/results/1-${eventId}`, {
               headers: this.headers,
               method: 'GET',
               mode: 'cors',
            });

            const html = await images.text();

            if (html.includes(`"errorMessage":"Pending"`)) {
               throw 'Error occurred';
            }

            let results = [];

            if (html === '') {
               await new Promise((resolve) => setTimeout(resolve, 5000));
               continue;
            }

            const $ = cheerio.load(html);
            for (let i = 0; i < $('.mimg').length; i++) {
               const badLink = $('.mimg')[i].attribs.src;
               const goodLink = badLink.slice(0, badLink.indexOf('?')); // Delete the parameters
               results.push(goodLink);
            }
            return results;
         }
      } catch (error) {
         console.log(`Error in retrieveImages: ${error}`);
      }
   }
}

const apikeybing = `GI_FRE_COOKIE=gi_fre=2; _C_Auth=; ipv6=hit=1711591992869&t=4; MUID=180833C37F84648128EB27857ED26542; _EDGE_V=1; MUIDB=180833C37F84648128EB27857ED26542; SRCHD=AF=NOFORM; SRCHUID=V=2&GUID=817651318B8C4EF581E660496F97E1D9&dmnchg=1; _UR=cdxcls=0&QS=0&TQS=0; _HPVN=CS=eyJQbiI6eyJDbiI6MSwiU3QiOjAsIlFzIjowLCJQcm9kIjoiUCJ9LCJTYyI6eyJDbiI6MSwiU3QiOjAsIlFzIjowLCJQcm9kIjoiSCJ9LCJReiI6eyJDbiI6MSwiU3QiOjAsIlFzIjowLCJQcm9kIjoiVCJ9LCJBcCI6dHJ1ZSwiTXV0ZSI6dHJ1ZSwiTGFkIjoiMjAyNC0wMy0xOFQwMDowMDowMFoiLCJJb3RkIjowLCJHd2IiOjAsIlRucyI6MCwiRGZ0IjpudWxsLCJNdnMiOjAsIkZsdCI6MCwiSW1wIjoyLCJUb2JuIjowfQ==; SRCHUSR=DOB=20240318&POEX=W; ANON=A=623619BA690FA0FFF2295AE2FFFFFFFF&E=1d8a&W=1; PPLState=1; KievRPSSecAuth=FACqBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACOxfP63n6HdRaARGLxEVIksUSoG8RuEUwUUJ4UrwiY+Ao3auwSNVVG92ydElXRvNg+VLRLNkvQYsU5QZuEDupsbZW+w1TqSsjfq9rdXcr+VrVbRWRzUhUWyRO5n/FF5nKfoNP2L2hNJBdRRC2e78TLQ39qHWf1RDJV4BA5tld1UynaQeOh0qisbazwY7EPf7wN9b+YHSmJhFkN5GSxUgX5PmA9taxymCLDWplFPIe9NyO7AyUNvfj3F8r7m0iFMgJwYYnKBZ/6dx4tkOY6qI6f1R0LqvRlOA2OyiPImHizIvcKIObUhZSQ1J8HHOjWB2rUt5tW1ZvWeF6WoGKNi1kJ4Cmv91+jz/asuOgBMMh6gtfu2CeuWdikWEXfoI+63T1ICu6Gt3+XbzLf+XgvENkMh7zaLSFqBVSUqUDVoVRBGVjA2gmdCShn7941jfKmLBWodS8O9BV3p47seiZwZJkQm1HpHCZFnrT6dRzZFDkEOBcZGCHssO5kE2RbFQba1xDLJrzuGGHZSjU/gyzwJWcUWe3M7i+zdKSGEJCS0+QPLvWAP7ZoRdDzlWN+hFDGzozV0QShpZ5OqNlZ7gjwTGFP1ZGExCB1lHB5LU4ea8vGD2wPgUKAF0uExs929L9gDg023zGrE+XuQjuBYtDcM6lq8SXohUCFaNll98YAD/7WcRTOgDRzjgF9OPFW+lLm5HYzfZEeHJJ/5ynttEMcwlV5gEM/bYP35hpN+jwCS8o21xS5eU6DLRSbjDNDTz4hmL9o9R7ZliKueX4/bPktve+t6StLjabmu5q8C7vRR4fKdNJM6lsiHtLS1KYliuDqVsvMnZpvDEPxhm69XhBqiS3puuiPm3MVJ+l+qCqL1KYUJrx0pDpfb5fPBkoLmdKZHHRBZE6/Bhu8rMlfXfVNVpzxw7J6bvcqAt3mt9RiI0YdXRz15w3c5Cv7J77ELNmuP6yIZWTfTH4HFKefB3VcUEf3aFOtAAws0WpBkiGd+om0p9UlemJyqKKTRqqsbAzn5hgnBAgMMsZvFwAUov2qhL0MO8mrYCN+4rqJDJNq5TlWRx1q0BqYkW7tC2cbjmi+Q6VbzyfjvqV4KT3NgNaIxfzTvgOcZtNNoem9OeLcBrBX72D05hvC0yKPeP6MLkfCWtkbXVtNAhsz3JfoAWo8tXcqWQILQfR8BNkUsQKB9ZY9JxO2NL1UqmY5f4lFnGdJO35u6yj1e3+3/IeDjXTXJyWKt14ZQbfDMXkIv8f9VPFMOJ1Zt79tcSManywcU3PxnqhET75RsvOIX7SACTeBm/axXayWUq39NQ/ZaipYyNsjSzhZEFOsxbPk/srwc0top8HKHDwmMVwyUmh7AUkSmufrbNb55sPenIS1Q8Ryqn0DyYDZjti2jpcONglsZXaP2PkBv3bs9vTSOND+758c9UJpgbN3zf7bJvqqDwS8H36Mxpz5k6vU3YZKazuzh+/SGx9CNG28tJYJGeQcJh+supWhldB2CcegIsBEIEqxJ+1katB7UUACNb5P2UlLRprbz3LmugNO6BQUfS; _U=13POoSzCb6VYeH5AABdQxCAk8jxZazcLs0eQQNh1ByoZ4hdgEVqXDTweb_RArZbqHiNoVv0vHHNVFUcBh_T25wiH6acEIiQvjgBVQ_Ugl9ROkmZisnnawEFABATBOFH72Jq0RwIvVD57qvHOtiCXNEXA4tm0wFq-Lh3w9h5qeyb1z8Z7D2iT4KdtwbAaKIfjloUEhp2BQs1SsCM9im3ZRKrkc5l2hj0SYUkc7oAFoZGw; WLID=Q9RIC8cARTK+yHFrh+FUM6zBbzNCmPi5iZalMBk9xje5aV0A6PphduFOBSK1aU0rFiCE+3uQD0Y2vSPgxpS9DURZJCqQxNjcuw3lqJNFSYE=; _RwBf=mta=0&rc=0&rb=0&gb=0&rg=0&pc=0&mtu=0&rbb=0&g=0&cid=&clo=0&v=1&l=2024-03-18T07:00:00.0000000Z&lft=0001-01-01T00:00:00.0000000&aof=0&ard=0001-01-01T00:00:00.0000000&rwdbt=0001-01-01T16:00:00.0000000-08:00&rwflt=0001-01-01T16:00:00.0000000-08:00&o=0&p=MSAAUTOENROLL&c=MR000T&t=1500&s=2024-03-18T21:19:24.0480915+00:00&ts=2024-03-18T21:19:24.4010990+00:00&rwred=0&wls=2&wlb=0&wle=1&ccp=0&lka=0&lkt=0&aad=0&TH=&e=8hcRf8yHTof3LwnNdEMKtZtZvyOCkFLLlJahdCLIQWyCwyyHTMTIhljSY6WGAffGrqN10uC0G-jUMPKXQQjY9A&A=623619BA690FA0FFF2295AE2FFFFFFFF; _EDGE_S=SID=0ED9591A92D064B82E754D4A93D065B2; WLS=C=f49b71489f08232e&N=sandi; _SS=SID=0ED9591A92D064B82E754D4A93D065B2; _C_ETH=1; SRCHHPGUSR=SRCHLANG=id&IG=A14FDDA011D34F5180F4153AAE062A4E&CW=471&CH=943&SCW=471&SCH=943&BRW=MW&BRH=MT&DPR=1.5&UTC=480&DM=0&PV=10.0.0&HV=1711588393&HBOPEN=2&PRVCW=471&PRVCH=943&WTS=63846393353; _clck=y2028h%7C2%7Cfkg%7C0%7C1538; _clsk=1o9ku6t%7C1711588395130%7C1%7C0%7Cm.clarity.ms%2Fcollect`

//const apikeybing = apikyst[Math.floor(apikyst.length * Math.random())];

module.exports = { BingApi, apikeybing };
