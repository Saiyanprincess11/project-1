const users = {};

//Responds with a json object
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

//Return user object as JSON
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};

//Adds a user from a POST body
const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  //check to make sure we have both fields
  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  //default status code to 204 updated
  let responseCode = 204;

  //If the user doesn't exist yet
  if(!users[body.name]) {
    
    //Set the status code to 201 
    responseCode = 201;
    users[body.name] = {};
  }

  //add or update fields for this user name
  users[body.name].name = body.name;
  users[body.name].age = body.age;


  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

//404: Not found 
const notFound = (request, response) => {
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };
  
    respondJSON(request, response, 404, responseJSON);
  };
  
  const notFoundMeta = (request, response) => {
    respondJSONMeta(request, response, 404);
  };

//404: Not Real 
  const notReal = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found',
        id: 'notReal', 
    };

    respondJSON(request, response, 404, responseJSON); 
  }

  const notRealMeta = (request, response) => {
    respondJSONMeta(request, response, 404, responseJSON); 
  };

//public exports
module.exports = {
  getUsers,
  addUser,
  notFound, 
  notReal, 
  notRealMeta,
  notFoundMeta, 
};