# React - Help :speech_balloon::question:

## [Node sass problems](https://www.reddit.com/r/reactjs/comments/7mpcoo/can_anyone_tell_me_why_this_app_is_not_building/)

>I'm trying to figure out why this app made with create-react-app and SASS added to it, to which i added this [template](https://github.com/mrholek/CoreUI-React) won't build.
>I setup a [repo](https://github.com/borisyordanov/node-sass-bug), that you can pull, run npm install and then try npm start to reproduce the issue. Can anyone tell me why it's telling me the variable is undefined?

The issue is not with node-sass itself. It is to do with the order in which it reads the scss files. It seems to read from the top of the scss folder down. This causes errors as some variables haven't been defined yet. If you look at style.scss you can see the correct order for the files.

To fix this first look at the build-css stage and point node-sass-chokidar to src/scss/style.scss. We must also copy Core-UI public folder images and change some paths in this scss file: /scss/core/_variables.scss. On line 51 and 63 remove the .. in the image paths. e.g '../img/logo.png' to '/img/logo.png' . Then we just have to change the css import in index.js to point at the compiled css. import './scss/style.css'

Try follow the steps above to fix your issue. I created a working repo that you can compare with afterwards. https://github.com/ShaneMckenna23/react-help

Regards, Shane
