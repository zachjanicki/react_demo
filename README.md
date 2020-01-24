# React Demo with Hacker News API

This is a demo of a tiny react application. It gets 10 stories from the Hacker News api and displays them on the screen. You can then click to view the top level comments for each story.

To run the code, clone this repo:

    git clone https://github.com/zachjanicki/react_demo.git

Install node modules in both folders
    
    cd api_server; npm install
    cd frontend; npm install

Run the apiServer node app and the frontend react app in two different terminals:
    
    npm start


### API server
This is an express application that reads data from a few different hacker news api endpoints. It formats the responses and sends them to the client side application.

### Client side App
This is a react application created with create-react-app. It uses react-router and styled-components, and gets its data from the api server node app. 
