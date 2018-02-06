# React - Help :speech_balloon::question:

## [Node sass problems](https://www.reddit.com/r/reactjs/comments/7mpcoo/can_anyone_tell_me_why_this_app_is_not_building/)

>I'm trying to figure out why this app made with create-react-app and SASS added to it, to which i added this [template](https://github.com/mrholek/CoreUI-React) won't build.
>I setup a [repo](https://github.com/borisyordanov/node-sass-bug), that you can pull, run npm install and then try npm start to reproduce the issue. Can anyone tell me why it's telling me the variable is undefined?

The issue is not with node-sass itself. It is to do with the order in which it reads the scss files. It seems to read from the top of the scss folder down. This causes errors as some variables haven't been defined yet. If you look at style.scss you can see the correct order for the files.

To fix this first look at the build-css stage and point node-sass-chokidar to src/scss/style.scss. We must also copy Core-UI public folder images and change some paths in this scss file: /scss/core/_variables.scss. On line 51 and 63 remove the .. in the image paths. e.g '../img/logo.png' to '/img/logo.png' . Then we just have to change the css import in index.js to point at the compiled css. import './scss/style.css'

Try follow the steps above to fix your issue. I created a working repo that you can compare with afterwards. https://github.com/ShaneMckenna23/react-help

Regards, Shane

## Access public API
=======
## [Access public API](https://www.reddit.com/r/reactjs/comments/7os450/trying_to_build_a_react_frontend_for_a_public_api/)

>Trying to build a react front-end for a public API. I'm using this as mostly a learning exercise but would also like to incorporate best practices wherever I can.

>I'm currently trying to make an API call with a function located in my server.js file using express/node. I can make the call just fine, but I'm running into issues accessing this >data from react in my App.js file. I'm unable to import the function from server.js because it isn't inside the src folder and apparently you can't import from outside that folder.

>Am I going about this the wrong way? If so what can I do instead? One solution I found was to tell express to make the data available at some endpoint like localhost:3001/api/data >and then fetch it from within an actions.js file, but I'm completely new to redux and don't know where to begin. I also don't want to over-complicate such a (seemingly) simple >problem by getting a state manager involved.
>
>Thanks in advance for any thoughts/advice!

Ok, so I made a simple application that makes an API call to open weather and displays some data. 
It uses the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).
I kept your component names so you can just alter the fetch request in TicketContainer. This follows the popular 
container pattern, you can read about it in this [article](https://medium.com/@learnreact/container-components-c0e67432e005)

Some notes:
Your server.js file is a separate application and is not linked to create-react-app in any way. To run your app you use npm run start, this starts a server for you that serves your react application. You can run node server.js to start a different server running your custom code in the server.js file but again this is a separate service.

Another popular library for making requests is [Axios](https://github.com/axios/axios)

[Example App](https://github.com/ShaneMckenna23/react-help-2)

Let me know if you have any more questions :)