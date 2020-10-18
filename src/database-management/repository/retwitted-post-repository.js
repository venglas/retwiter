const RetwittedPostModel = require('../models/retwitted-posts');
const { logger } = require('../../logger/logger');

const saveRetwittedPost = obj => {
    try {        
        const retwittedPost = new RetwittedPostModel(obj);

        return retwittedPost.save().catch( err => console.log(err));
    } catch ( err ) {
        logger.err(err);
    }
};

const getRetwittedPostByUrl =  postUrl => {
    return RetwittedPostModel.find({twittUrl: postUrl}, twittList => {
        return twittList;
    })
    .catch(err => logger.error(err));
};

const getAllRetwittedPosts = () => {
    return RetwittedPostModel.find({}, twittList => twittList);
};

module.exports = { saveRetwittedPost, getRetwittedPostByUrl, getAllRetwittedPosts };