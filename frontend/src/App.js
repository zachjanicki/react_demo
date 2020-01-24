import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TopStories from './components/TopStories';
import StoryComments from './components/StoryComments';
import logo from './logo.svg';
import './App.css';

function App() {
  const [clickCount, setClickCount] = React.useState(0);
  
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
