//-------------------------------Database-------------------------------\\
// Import functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import { getDatabase, set, ref, push, onChildAdded} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"

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
const app = initializeApp(firebaseConfig)
const db = getDatabase()
//-------------------------------Variables-------------------------------\\
let lastPost = null
let channel = "global"
const usenameInput = document.getElementById("usernameInput")
const pfpInput = document.getElementById("pfpInput")
const pfpPreview = document.getElementById("pfpPreview")
const settingsButton = document.getElementById("settingsButton")
const settingsBox = document.getElementById("settings")
const inputBox = document.getElementById("inputBox")
const sendButton = document.getElementById("sendButton")
const limit = document.getElementById("limit")
const messageBox = document.getElementById("messages")
const container = document.getElementById("messageContainer")
//-------------------------------Settings-------------------------------\\
let settings = false
settingsButton.addEventListener("click", function(){
    if (settings == true){
        settingsBox.style.display = "none"
    } else {
        settingsBox.style.display = "block"
    }
    settings = !settings
})
//-------------------------------Username-------------------------------\\
let username = "Guest"
if(localStorage.getItem("username") != null){
    username = localStorage.getItem("username")
}
usenameInput.value = username
usenameInput.addEventListener("change", function(){
    if(usenameInput.value != ""){
        username = usenameInput.value
        localStorage.setItem("username", usenameInput.value)
    } else{
        username = "Guest"
        usenameInput.value = username
        localStorage.setItem("username", "Guest")
    }
})
//-------------------------------Profile Picture-------------------------------\\
let profilePic = null
if(localStorage.getItem("profilepic") != null){
    profilePic = localStorage.getItem("profilepic")
    pfpPreview.src = profilePic
}
const reader = new FileReader()
pfpInput.addEventListener("change", function(){
    if(pfpInput.value != ""){
        reader.readAsDataURL(pfpInput.files[0])
        reader.addEventListener("load", function(){
            profilePic = reader.result
            pfpPreview.src = reader.result
            localStorage.setItem("profilepic", String(reader.result))
        })
    }
})
//-------------------------------Scrolling-------------------------------\\
let scrollToBottom = true
if(localStorage.getItem("scrolltobottom") != null){
    scrollToBottom = (localStorage.getItem("scrolltobottom") == "true")
} 
scrollDown.checked = scrollToBottom 
scrollDown.addEventListener("change", function(){
    scrollToBottom = !scrollToBottom
    localStorage.setItem("scrolltobottom", scrollToBottom)
    if(lastPost != null && scrollToBottom){
        lastPost.scrollIntoView({behavior:"smooth", block:"end"})
    }
})
//-------------------------------Character Limit-------------------------------\\
inputBox.addEventListener("input", function(){
    limit.textContent = inputBox.value.length+"/"+inputBox.maxLength
    if(inputBox.value.length == inputBox.maxLength){
        limit.style.color = "red"
    } else{
        limit.style.color = "black"
    }
})
//---------------------Filter---------------------\\
function filterMessage(message){
    // Banned words list
    const filteredWords = ["fuck", "shit", "bitch", "ass", "nigger", "cock", "pussy"] 
    for(let i = 0; i < filteredWords.length; i++){
        // Don't have to worry about people trying to bypass using caps 
        let lowercaseMessage = message.toLowerCase() 
        // Failsafe in case something happens to while loop
        let times = 0
        // Takes the filtered word and converts it into astricks. Stores it
        let astricks = "" 
        for(let w = 0; w < filteredWords[i].length; w++){
            astricks += "*"
        }
        let index = 0
        while(lowercaseMessage.indexOf(filteredWords[i]) != -1 && times < 1001){
            // Finds the occurance of the banned word
            index = lowercaseMessage.indexOf(filteredWords[i])
            // Censors it in both messages
            message = message.substring(0, index) + astricks + message.substring(index+filteredWords[i].length)
            lowercaseMessage = lowercaseMessage.substring(0, index) + astricks + lowercaseMessage.substring(index+filteredWords[i].length)
            // Adds to our failsafe
            times += 1
        }
    }
    return message
}
//-------------------------------Uploads Messages-------------------------------\\
function sendMessage(){
    if (inputBox.value != ""){
        const messagesRef = ref(db, channel)
        const pushMessagesRef = push(messagesRef)
        set(pushMessagesRef,{ 
            username: username,
            profilepicsrc: String(profilePic),
            message: inputBox.value,
        })
        inputBox.value = ""
        limit.textContent = "0/"+inputBox.maxLength
    }
}
sendButton.addEventListener("click", sendMessage)
document.onkeyup = function(e){
    if(e.key == "Enter"){
        sendMessage()
    }
}
//---------------------Loads Messages---------------------\\
onChildAdded(ref(db, channel), (data) =>{
    //------------Data from firebase------------\\
    let messageContents = data.val()
     //------------Element Creation------------\\
     let element = document.createElement("div")
     element.classList.add("post")
     //------------Profile Picture------------\\
     let profilePic = document.createElement("img")
     if(messageContents.profilepicsrc == null || messageContents.profilepicsrc == "null"){
         profilePic.src = "https://shodis.ch/wp-content/uploads/2018/01/person_grey_192x192.png"
     } else{
         profilePic.src = messageContents.profilepicsrc 
     }
     profilePic.classList.add("profilePicture")
     element.appendChild(profilePic)
     //------------Content Div------------\\
     let textContainer = document.createElement("div")
     element.appendChild(textContainer)
     //------------UserName------------\\
     let name = document.createElement("p")
     name.classList.add("userName")
     name.textContent = messageContents.username
     textContainer.appendChild(name)
     //------------Message------------\\
     let text = document.createElement("p")
     text.classList.add("message")
     text.textContent = filterMessage(messageContents.message)
     textContainer.appendChild(text)
    //------------Append to messages------------\\
    messageBox.appendChild(element)
    //------------Scrolls to the bottom------------\\
    lastPost = element
    if(scrollToBottom){
        lastPost.scrollIntoView({behavior:"smooth", block:"end"})
    }
})
