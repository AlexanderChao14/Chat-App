window.onload  = function(){
    const socket = io();
    
    const form = document.getElementById("enter");
    const input = document.getElementById("m");
    const messages = document.getElementById("messages");
    const userList = document.getElementById("users")
    let username= "";


    form.addEventListener('submit', e=>{
      e.preventDefault();
      socket.emit('chat message', input.value, username);
      input.value = '';
      return false;
    });


     //add new message 
    socket.on('chat message', function(log){
        // loadOld(log);
        const newMessage = document.createElement('li');
        const {username, msg, time} = log[log.length-1]; 
        newMessage.innerText = `${time}   ${username}: ${msg}`;
        messages.append(newMessage);
    });

    //load chat history function
    function loadOld(log){
        log.forEach(({username, msg, time}) => {
            const newMessage = document.createElement('li');
            newMessage.innerText = `${time}   ${username}: ${msg}`;
            messages.append(newMessage);
        });
    }
    
    socket.on('connection', (log,user, allUser)=>{
        username = user;
        loadOld(log);
        listUser(allUser);
    });

    //add user list
    function listUser(user){
        user.forEach(id =>{
            const userName = document.createElement('li');
            userName.innerText = id;
            userList.append(userName);
        });
    }
}