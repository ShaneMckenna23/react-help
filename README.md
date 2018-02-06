# React - Help :speech_balloon::question:

## [React Hosting](https://www.reddit.com/r/reactjs/comments/7vipbg/hosting_react_app_on_godaddy/)

>Hosting react app on goDaddy
>
>Hello there! I have a GoDaddy account and I want to host my front-end react app on a domain. Does anyone know a tutorial on how to do so? And what changes do I have to make in order for it to go live? Inside of the package.json or index.html for example. Anything helps!
>
>Edit: I haven't done anything with Webpack or Browserify. (I'm new to hosting, so please go easy)

Hello,
I hosted your application on Netlify: https://wonderful-ramanujan-f1515b.netlify.com/#/
There are lots of ways you can host your react web application. Depending on your requirements you may choose one option over another. Your application is fairly striaht forward to host, you simply have to serve your build folder.

## Fixes
Firstly your package.json contains a GitHub hompage. This is used for when you want to host your website on GitHub Pages. It changes the src location of your assets e.g

    <script type="text/javascript" src="/Samuel-Montoya/UBER-ACE-Project/static/js/main.3a0f6089.js"></script>

    <script type="text/javascript" src="/static/js/main.3a0f6089.js"></script>
You must remove the homepage value to host your website on other hosting platforms

## Hosting
Netlify is a service that can host static sites. It's easy to setup and they have a generous free plan. Check out this tutorial to help you learn how to use it. https://www.slightedgecoder.com/2017/12/09/deploying-existing-create-react-app-github-netlify/

Regards, 
Shane
