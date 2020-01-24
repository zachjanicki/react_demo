import React from 'react';
import {Route, Switch} from 'react-router-dom';
import TopStories from './components/TopStories';
import StoryComments from './components/StoryComments';
import './App.css';

function App() {
  
  return (
    <main>
      <Switch>
        <Route path="/" component={TopStories} exact />
        <Route path="/comments/:storyId" component={StoryComments} />
      </Switch>
    </main>
  )
}

export default App;
