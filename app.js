
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAfDv2OaCZu58UNJecyhbgSLMom4uQCfRE",
    authDomain: "testingapp-72950.firebaseapp.com",
    databaseURL: "https://testingapp-72950-default-rtdb.firebaseio.com",
    projectId: "testingapp-72950",
    storageBucket: "testingapp-72950.appspot.com",
    messagingSenderId: "525867712533",
    appId: "1:525867712533:web:2285430a1555b5d4028e1c"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);




var list = document.getElementById("list");

firebase.database().ref("todos").on("child_added",function(data){
    var liElement = document.createElement("li");
     

    var liText = document.createTextNode(data.val().value);  
      
    
    liElement.appendChild(liText);
  
    list.appendChild(liElement);
  
    //   console.log(liElement);  
    
  
    var EditBtnELement = document.createElement("button");
  
    var EditBtnText = document.createTextNode("Edit");
  
    EditBtnELement.appendChild(EditBtnText);
  
    var DeleteBtnELement = document.createElement("button");
    
    var DeleteBtnText = document.createTextNode("Delete");  
  
    DeleteBtnELement.appendChild(DeleteBtnText);
   
  
    liElement.appendChild(EditBtnELement);
  
    liElement.appendChild(DeleteBtnELement);
  
  
    EditBtnELement.setAttribute("class", "Editbtn");
  
    DeleteBtnELement.setAttribute("onclick", "deleteItem(this)");

    DeleteBtnELement.setAttribute("id", data.val().key );

    EditBtnELement.setAttribute("onclick", "EditItem(this)");

    EditBtnELement.setAttribute("id", data.val().key);
    EditBtnELement.style.marginLeft= "auto"

} )

function addTodo() {
  var input = document.getElementById("todoInput");
  var key = Date.now().toString(26)

    var todos = {
        value : input.value,
        key
        
    }
    firebase.database().ref("todos/"+ key).set(todos);
  //   console.log(input.value);

//   var liElement = document.createElement("li");

//   var liText = document.createTextNode(input.value);  
  
//   liElement.appendChild(liText);

//   list.appendChild(liElement);

//   //   console.log(liElement);  

//   var EditBtnELement = document.createElement("button");

//   var EditBtnText = document.createTextNode("Edit");

//   EditBtnELement.appendChild(EditBtnText);

//   var DeleteBtnELement = document.createElement("button");
  
//   var DeleteBtnText = document.createTextNode("Delete");  

//   DeleteBtnELement.appendChild(DeleteBtnText);

//   liElement.appendChild(EditBtnELement);

//   liElement.appendChild(DeleteBtnELement);

//   EditBtnELement.setAttribute("class", "Editbtn");
//   DeleteBtnELement.style.backgroundColor = "lightcoral";

//   DeleteBtnELement.setAttribute("onclick", "deleteItem(this)");

//   EditBtnELement.setAttribute("onclick", "EditItem(this)");
  input.value = "";
}

function deleteAll() {
    firebase.database().ref("todos").remove();
  list.innerHTML = "";
}

function deleteItem(e) {
    firebase.database().ref(`todos/${e.id}`).remove();
  console.log(e.parentNode.remove());
}

function EditItem(e) {
  var updateValue = prompt(
    "Enter updated value",
    e.parentNode.firstChild.nodeValue
  );
  firebase.database().ref(`todos/${e.id}`).set({
    key: e.id,
    value: updateValue,

})

  e.parentNode.firstChild.nodeValue = updateValue;
}
