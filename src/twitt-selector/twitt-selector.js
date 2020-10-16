const { twittTime } = require('./elements');
const selectTwitt = require('./select-twitt');

// TODO:
/*
check tweet in db
if tweet isn't in db retweet it
*/

const twittSelector = async (page) => {
    await page.waitForSelector(twittTime);
    const twittsTime = await page.$$(twittTime);
    const selectedTwitt = await selectTwitt(page, twittsTime);
    const twittLink = await page.evaluate(selectedTwitt => selectedTwitt.parentNode.getAttribute("href"), selectedTwitt);

    return twittLink;
};

module.exports = { twittSelector };