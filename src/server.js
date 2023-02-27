const http = require('http'); //pull in http module
const url = require('url'); 
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

//handle POST requests
const handlePost = (request, response, parsedUrl) => {
  
  if(parsedUrl.pathname === '/addUser') {
    parseBody(request, response, jsonHandler.addUser);
  }
};

//Reassembles the body and then handles the request.
const parseBody = (request, response, handler) => {

  const body = [];

  //Event Handlers 
  //Error Handling
  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  //Data Handling
  request.on('data', (chunk) => {
    body.push(chunk);
  });

  //End Handling 
  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);
    handler(request, response, bodyParams);
  });
};

//GET Request Handling 
const handleGet = (request, response, parsedUrl) => {

  //Based on URL, picks handler 
  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  }else if(parsedUrl.pathname === '/app.html'){
    htmlHandler.getApp(request, response); 
  } else if (parsedUrl.pathname === '/getUsers') {
    jsonHandler.getUsers(request, response);
  } else if(parsedUrl.pathname === '/notReal') {
    jsonHandler.notReal(request, response); 
  } else {
    htmlHandler.getIndex(request, response);
  }
};

const onRequest = (request, response) => {
  //parse url into individual parts
  const parsedUrl = url.parse(request.url);

  //check if method was POST 
  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else {
    handleGet(request, response, parsedUrl);
  }
};


//Starts server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});