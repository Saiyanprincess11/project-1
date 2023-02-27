const handleResponse = async (response, parseResponse) => {
   
   const content = document.querySelector('#content');

   //Displays tag based on status code 
   switch(response.status) {
     case 200: //Success
       content.innerHTML = `<b>Success</b>`;
       break;
     case 201: //Created
       content.innerHTML = '<b>Created</b>';
       break;
     case 204: //Updated (no response back from server)
       content.innerHTML = '<b>Updated (No Content)</b>';
       return;
     case 404: //Not Found
       content.innerHTML = `<b>Not Found</b>`;
     break;
     case 400: //Bad request
       content.innerHTML = `<b>Bad Request</b>`;
       break;
     default: //any other status code
       content.innerHTML = `Error code not implemented by client.`;
     break;
   }

   //Parses the response to json
   let obj = await response.json();
   if(parseResponse && obj.id !== 'notReal'){
     let jsonString = JSON.stringify(obj);
     content.innerHTML += `<p>${jsonString}</p>`;
   }
   
   //Displays message
   if(obj.message){
     content.innerHTML += `<p>Message: ${obj.message}</p>`;
   }
 };

 //Uses fetch to send a postRequest
 const sendPost = async (nameForm) => {
   const nameAction = nameForm.getAttribute('action');
   const nameMethod = nameForm.getAttribute('method');
   const nameField = nameForm.querySelector('#nameField');
   const ageField = nameForm.querySelector('#ageField');

   //Build a data string in the FORM-URLENCODED format.
   const formData = `name=${nameField.value}&age=${ageField.value}`;

   //Make a fetch request and await a response
   let response = await fetch(nameAction, {
     method: nameMethod,
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       'Accept': 'application/json',
     },
     body: formData,
   });

   handleResponse(response);
 };

 const requestUpdate = async (userForm) => {
   
   const url = userForm.querySelector('#urlField').value;
   const method = userForm.querySelector('#methodSelect').value;
   
   //Awaits fetch response
   let response = await fetch(url, {
     method,
     headers: {
         'Accept': 'application/json'
     },
   });

   handleResponse(response, method === 'get');
 };
 
 //Runs on page load 
 const init = () => {
   const nameForm = document.querySelector('#nameForm');
   const userForm = document.querySelector('#userForm');
   
   //Cancels the forms default action and calls sendPost
   const addUser = (e) => {
     e.preventDefault();
     sendPost(nameForm);
     return false;
   }
   //Cancels the forms default action and calls requestUpdate
   const getUsers = (e) => {
     e.preventDefault();
     requestUpdate(userForm);
     return false;
   }
   
   //Call addUser when the submit event fires on the form.
   nameForm.addEventListener('submit', addUser);
   userForm.addEventListener('submit', getUsers);
 };

 
 //When the window loads, run init.
 window.onload = init;