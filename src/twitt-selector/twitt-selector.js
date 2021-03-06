const { twittTime } = require('./elements');
const selectTwitt = require('./select-twitt');
const { setError } = require('../state/app-state');
const { logger } = require('../logger/logger');

const twittSelector = async page => {
    try {
        await page.waitForSelector(twittTime);
        const twittsTime = await page.$$(twittTime);
        const selectedTwitt = await selectTwitt(page, twittsTime);
        const twittLink = await page.evaluate(selectedTwitt => selectedTwitt.parentNode.getAttribute("href"), selectedTwitt);
        if (twittLink === undefined) setError({ msg: "twittSelector() -> twittLink is undefined", appPID: process.pid });
        
        return twittLink;
    } catch {
        setError({ msg: "twittSelector()", appPID: process.pid });
        logger.error("twittSelector()");
    }
};

module.exports = { twittSelector };