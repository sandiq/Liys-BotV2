const axios = require('axios');

class UrlShorten {
  constructor() {
    this.TINYURL_URL = "http://tinyurl.com/api-create.php";
    this.ISGD_URL = "https://is.gd/create.php?format=json&url=";
    this.VGD_URL = "https://v.gd/create.php?format=json&url=";
    this.OUO_URL = "https://ouo.io/api/0G4vYlK2?s=";
    this.BITLY_URL = "https://bitly.ws/create.php?url=";
  }

  async tinyurl(url_long) {
    try {
      const url = `${this.TINYURL_URL}?url=${url_long}`;
      const res = await axios.get(url);
      const short_url = res.data;
      return short_url;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async isgd(url_long) {
    try {
      const url = `${this.ISGD_URL}${url_long}`;
      const res = await axios.get(url);
      const data = res.data;
      return data.shorturl || `Error: ${data.error || "Unknown error"}`;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async vgd(url_long) {
    try {
      const url = `${this.VGD_URL}${url_long}`;
      const res = await axios.get(url);
      const data = res.data;
      return data.shorturl || `Error: ${data.error || "Unknown error"}`;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async ouo(url_long) {
    try {
      const url = `${this.OUO_URL}${url_long}`;
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async bitly(url_long) {
    try {
      const url = `${this.BITLY_URL}${url_long}`;
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = { UrlShorten };