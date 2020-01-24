const express = require('express');
const axios = require('axios');
const cors = require('cors');

const apiServer = express();
const PORT = 3001;

const HACKER_NEWS_BASE_URL = "https://hacker-news.firebaseio.com/v0/"


apiServer.use(cors());

apiServer.get('/hn-stories', async (req, res) => {
	console.log("received request for top stories");
	const response = await axios.get(HACKER_NEWS_BASE_URL + "topstories.json?print=pretty");
	const storyData = await formatStoriesResponse(response.data);
	res.send(storyData);
})

apiServer.get('/hn-top-comments/:storyId', async (req, res) => {
	console.log("received request for comments from story ID:", req.params.storyId);
	const response = await axios.get(HACKER_NEWS_BASE_URL + "item/" + req.params.storyId + ".json?print=pretty");
	const commentData = await formatCommentsResponse(response.data.kids);
	res.send(commentData);
})

apiServer.get('/story-title/:storyId', async (req, res) => {
	console.log("recieved request for story title from story ID:", req.params.storyId);
	const response = await axios.get(HACKER_NEWS_BASE_URL + "item/" + req.params.storyId + ".json?print=pretty");
	const storyTitle = response.data.title;
	res.send(storyTitle);
})

apiServer.listen(PORT, () => console.log("running api server"));


async function formatStoriesResponse(storyList) {
	const shortStoryList = storyList.slice(0, 10);
	const requestStrings = shortStoryList.map((storyId) => {
		return HACKER_NEWS_BASE_URL + "item/" + storyId + ".json?print=pretty";
	});
	const allStoryData = await axios.all(requestStrings.map(req => axios.get(req)));
	const allStories = allStoryData.map(story => story.data);
	const allStoriesSorted = allStories.sort((storyA, storyB) => storyB.score - storyA.score);
	return allStoriesSorted;
}

async function formatCommentsResponse(commentsList) {
	const commentRequestStrings = commentsList.map((commentId) =>  {
		 return HACKER_NEWS_BASE_URL + "item/" + commentId + ".json?print=pretty";
	});
	const allCommentData = await axios.all(commentRequestStrings.map(req => axios.get(req)));
	const allComments = allCommentData.map(comment => comment.data);
	const allCommentsSorted = allComments.sort((commentA, commentB) => commentA.time - commentB.time);
	return allComments;
}