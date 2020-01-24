import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
const axios = require('axios');

const API_BASE_URL = "http://localhost:3001/"

function TopStories() {

	const [storyData, setStoryData] = React.useState([]);

	React.useEffect(() => {

		const requestString = API_BASE_URL + "hn-stories";
		axios.get(requestString).then(res => {
			setStoryData(res.data);
		})
		
	}, []);

	function displayStories(storyData) {
		if (storyData === null) {
			return null;
		} else {
			return storyData.map((story) =>
				(
					<Card>
						<StoryTitle onClick={() => window.open(story.url)}>
							{story.title}
						</StoryTitle>
						<div>
							Score: {story.score} --- {story.by}
						</div>
						<div>
							<Link to={"/comments/" + story.id}>
							Comments: {story.kids != null ? story.kids.length : 0}
							</Link>
						</div>
					</Card>
				)
			)
		}
	}

	return (
		<PageContainer>
			<h1>10 stories from Hacker News</h1>
			{displayStories(storyData)}
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

const StoryTitle = styled.div`
	margin-bottom: 10px;
	font-weight: 700;
	&:hover {
		background-color: #e5e5e5;
		cursor: pointer
	}
`

export default TopStories;

