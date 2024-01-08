import Post from "./post.js"

const settingsButton = document.getElementById("settingsButton")
const settingsBox = document.getElementById("settings")
const usenameInput = document.getElementById("usernameInput")
const pfpInput = document.getElementById("pfpInput")
const pfpPreview = document.getElementById("pfpPreview")
const inputBox = document.getElementById("inputBox")
const sendButton = document.getElementById("sendButton")
const limit = document.getElementById("limit")

let settings = true
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

sendButton.addEventListener("click", function(){
    if (inputBox.value != ""){
        let post = new Post(username, profilePic, inputBox.value)
        post.post()
        inputBox.value = ""
        limit.textContent = "0/"+inputBox.maxLength
    }
})

inputBox.addEventListener("keyup", function(){
    limit.textContent = inputBox.value.length+"/"+inputBox.maxLength
    if(inputBox.value.length == inputBox.maxLength){
        limit.style.color = "red"
    } else{
        limit.style.color = "black"
    }
})


