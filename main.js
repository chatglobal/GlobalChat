// Stopped at auto scroll to bottom
//-----------Imports-----------\\
import Post from "./post.js"
//-------------------------------Database-------------------------------\\
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, set, get, ref, child, push, onChildAdded} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJAWilARSZ_ugsbeAR96GJXgd-3rOVkTU",
  authDomain: "chatroom-81f88.firebaseapp.com",
  databaseURL: "https://chatroom-81f88-default-rtdb.firebaseio.com",
  projectId: "chatroom-81f88",
  storageBucket: "chatroom-81f88.appspot.com",
  messagingSenderId: "231716874740",
  appId: "1:231716874740:web:945e1201e377c278cc31a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
//-------------------------------Settings-------------------------------\\
let lastPost = null
const usenameInput = document.getElementById("usernameInput")
const pfpInput = document.getElementById("pfpInput")
const pfpPreview = document.getElementById("pfpPreview")
const scrollDown = document.getElementById("scrollDown")
const settingsButton = document.getElementById("settingsButton")
const settingsBox = document.getElementById("settings")

let settings = false
settingsButton.addEventListener("click", function(){
    if (settings == true){
        settingsBox.style.display = "none"
    } else {
        settingsBox.style.display = "block"
    }
    settings = !settings
})

let username = "Guest"
usenameInput.value = username
usenameInput.addEventListener("change", function(){
    if(usenameInput.value != ""){
        username = usenameInput.value
    } else{
        username = "Guest"
        usenameInput.value = username
    }
})

let profilePic = null
const reader = new FileReader()
pfpInput.addEventListener("change", function(){
    if(pfpInput.value != ""){
        reader.readAsDataURL(pfpInput.files[0])
        reader.addEventListener("load", function(){
            profilePic = reader.result
            pfpPreview.src = reader.result
        })
    }
})

let scrollToBottom = true
scrollDown.checked = true
scrollDown.addEventListener("change", function(){
    scrollToBottom = !scrollToBottom
    if(lastPost != null && scrollToBottom){
        lastPost.scrollIntoView({behavior:"smooth", block:"end"})
    }
})
//---------------------Send---------------------\\
const inputBox = document.getElementById("inputBox")
const sendButton = document.getElementById("sendButton")
const limit = document.getElementById("limit")
const messageBox = document.getElementById("messages")

sendButton.addEventListener("click", function(){
    if (inputBox.value != ""){
        let post = new Post(username, profilePic, inputBox.value)
        const messagesRef = ref(db, "chatroom")
        const pushMessagesRef = push(messagesRef)
        set(pushMessagesRef,{ //stopped here
            username: post.userName,
            profilepicsrc: String(post.profilePicSrc),
            message: post.message,
        })
        inputBox.value = ""
        limit.textContent = "0/"+inputBox.maxLength
    }
})

inputBox.addEventListener("input", function(){
    limit.textContent = inputBox.value.length+"/"+inputBox.maxLength
    if(inputBox.value.length == inputBox.maxLength){
        limit.style.color = "red"
    } else{
        limit.style.color = "black"
    }
})
//---------------------Loads Messages---------------------\\
onChildAdded(ref(db, "chatroom"), (data) =>{
    let messageContents = data.val()
    let post = new Post(messageContents.username, messageContents.profilepicsrc, messageContents.message)
    lastPost = post.getElement()
    messageBox.appendChild(lastPost)
    if(scrollToBottom){
        lastPost.scrollIntoView({behavior:"smooth", block:"end"})
    }
})
