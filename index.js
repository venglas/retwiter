require('dotenv').config();
const puppeteer = require('puppeteer');
const { local, prod } = require('./config/browser-config');
const { twitterBaseUrlWithEnLang } = require('./config/app-config');
const { login } = require('./src/login/login');
const { retwitt } = require('./src/retwitt/retwitt');

const getBrowserConfig = () => {
    const env = process.env.ENV;
    if(env === "local") return local;
    return prod;
};

const initPage = async () => {
    const browser = await puppeteer.launch(getBrowserConfig());
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36");
    await page.setViewport({width: 1440, height: 754});
    await page.goto(twitterBaseUrlWithEnLang);

    return { page, browser };
};

const init = async () => {
    const { page, browser } = await initPage();
    await login(page, process.env.USERNAME, process.env.PASSWORD);
    await retwitt(page);

    await browser.close();
};

init();