import Post from "./post.js"

const inputBox = document.getElementById("inputBox")
const sendButton = document.getElementById("sendButton")
const limit = document.getElementById("limit")

sendButton.addEventListener("click", function(){
    if (inputBox.value != ""){
        let post = new Post("TestPoster", null, inputBox.value)
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
