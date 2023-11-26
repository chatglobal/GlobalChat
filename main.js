import Post from "./post.js"
export default round

const messageBox = document.getElementById("messageBox")
const sendButton = document.getElementById("sendButton")
const limit = document.getElementById("limit")

sendButton.addEventListener("click", function(){
    if (messageBox.value != ""){
        let post = new Post("TestPoster", null, messageBox.value, 0)
        post.post()
        messageBox.value = ""
    }
})

messageBox.addEventListener("keyup", function(){
    limit.textContent = messageBox.value.length+"/"+messageBox.maxLength
    if(messageBox.value.length == messageBox.maxLength){
        limit.style.color = "red"
    } else{
        limit.style.color = "black"
    }
})


//------------Like Rounding------------\\
const increments = [
    [1000, "K"],
    [1000000, "M"],
    [1000000000, "B"],
    [1000000000000, "T"],

]

function round(num){
    for(let i = increments.length-1; i >= 0; i--){
        if(num >= increments[i][0]){
            return Math.floor((num/increments[i][0])*10)/10 + increments[i][1]
        }
    }
    return num
}
