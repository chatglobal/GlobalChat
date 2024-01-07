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

// Filters a message based on an array of banned words. Returns a string.
function filterMessage(message){
    // Banned words list
    const filteredWords = ["fuck", "shit", "bitch", "ass", "nigger", "cock"] 
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
