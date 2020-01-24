import React from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
const axios = require('axios');

const API_BASE_URL = "http://localhost:3001/"

function StoryComments() {
	const { storyId } = useParams();

	const [commentData, setCommentData] = React.useState([]);
	const [storyTitle, setStoryTitle] = React.useState('');

	React.useEffect(() => {
		const commentsRequestString = API_BASE_URL + "hn-top-comments/" + storyId;
		axios.get(commentsRequestString).then(res => {
			setCommentData(res.data);
			const storyTitleRequestString = API_BASE_URL + "story-title/" + storyId;
				axios.get(storyTitleRequestString).then(res => {
				setStoryTitle(res.data);
			});
		});

		
		
	}, []);

	function displayComments(commentData) {
		if (commentData === null) {
			return null;
		} else {
			return commentData.map((comment) => {
				const dangerousHTML = {__html: comment.text}
				// dangerously setting inner html here because the hacker news api 
				// gives html in their comments
				// this is dangerous
				return (
					<Card>
						<Author>
							{comment.by}
						</Author>
						<div dangerouslySetInnerHTML={dangerousHTML}/>
					</Card>
				)}
			)
		}
	}

	return (
		<PageContainer>
			<h1>Top-level Comments: {storyTitle != null && storyTitle}</h1>
			{displayComments(commentData)}
		</PageContainer>
	);
}

const PageContainer = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const Card = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 0 auto;
	box-shadow: 0px 0px 10px 3px rgba(0,0,0,0.25);
	padding: 10px;
	margin-bottom: 20px;
	border-radius: 10px;
	width: 50%;
`

const Author = styled.div`
	margin-bottom: 10px;
	font-weight: 700;
`

export default StoryComments;