import Post from "./post.js";
export default round;

document.getElementById("sendButton").addEventListener("click", function(){
    const messageBox = document.getElementById("messageBox")
    if (messageBox.value != ""){
        let post = new Post("TestPoster", null, messageBox.value, 0)
        post.post()
        messageBox.value = ""
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
