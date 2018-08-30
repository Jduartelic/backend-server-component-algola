'use strict'

const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const HackerNews = Schema({
    created_at: Date,
    title: String,
    url	: String,
    author: String,
    points: Number,
    story_text: String,
    comment_text: String,
    num_comments: Number,
    story_id: Number,
    story_title: String,
    story_url: String,
    parent_id:	Number,
    created_at_i: Number,
    deleted:{
			type: Boolean, 
			default: false
		}
});

HackerNews.set('toObject', { virtuals: true })

module.exports = mongoose.model('hackerNews', HackerNews);