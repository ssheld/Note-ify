(function(){

  const baseURL = 'http://localhost:8080';

  async function testAPIs(){

    // List all
    try {
      const list = await callAPI('GET', '/api/notes', null, null);
      console.log('\n\n***************************\nlist results:');
      console.log(list);
    } catch(e) {
      console.log('GET all notes failed.');
      console.log(e.message);
    }

    // Create note
    try {
      const data = {
        author: 'John smith',
        title: 'My Grocery list',
        comment: 'my comment'
      };

      const note = await callAPI('POST', '/api/notes', null, data);
      var noteId = note._id;
      console.log('\n\n***************************\ncreate results:');
      console.log(note);

    } catch(e) {
      console.log('POST failed.');
      console.log(e.message);
    }

    // Find note by id
    try {
      const note = await callAPI('GET', '/api/notes/'+noteId, null, null);
      console.log('\n\n***************************\nfind results:');
      console.log(note);
    } catch(e) {
      console.log('GET note by ID failed.');
      console.log(e.message);
    }

    // Update note
    try {
      const data = {
        author: 'John smith',
        title: 'My Grocery list',
        comment: 'This is my updated comment via api test!'
      }; 
      
      const note = await callAPI('PUT', '/api/notes/'+noteId, null, data);
      console.log('\n\n***************************\nupdate results:');
      console.log(note);
      
    } catch(e) {
      console.log('PUT note failed.');
      console.log(e.message);
    }

    // Delete note
    try {
      const result = await callAPI('DELETE', '/api/notes/'+noteId, null, null);
      console.log('\n\n***************************\ndelete result:');
      console.log(result);
    } catch(e) {
      console.log('DELETE note failed.');
      console.log(e.message);
    }
  }
 
   async function callAPI(method, uri, params, body){
     jsonMimeType = {
       'Content-type':'application/json'
     }
     try{
       /*  Set up our fetch.
        *   'body' to be included only when method is POST
        *   If 'PUT', we need to be sure the mimetype is set to json
        *      (so bodyparser.json() will deal with it) and the body
        *      will need to be stringified.
        *   '...' syntax is the ES6 spread operator.
        *      It assigns new properties to an object, and in this case
        *      lets us use a conditional to create, or not create, a property
        *      on the object. (an empty 'body' property will cause an error
        *      on a GET request!)
        */
       var response = await fetch(baseURL + uri, {
         method: method, // GET, POST, PUT, DELETE, etc.
         ...(method=='POST' ? {headers: jsonMimeType, body: JSON.stringify(body)} : {}),
         ...(method=='PUT' ?  {headers: jsonMimeType, body:JSON.stringify(body)} : {})
       });
       return response.json(); // parses response to JSON
     }catch(err){
       console.log("ERROR IN FETCH");
       console.error(err);
       return "{'status':'error'}";
     }
   }
 
   // Calls our test function when we click the button
   //  afer validating that there's a file selected.
   document.querySelector('#testme').addEventListener("click", ()=>{
     testAPIs();
   });
 })();
 