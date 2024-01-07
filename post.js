//import translate from "google-translate-api"

export default class Post{
    //------------Properties------------\\
    message
    userName
    profilePicSrc
    element
    //------------Constructor------------\\
    constructor(userName, profilePicture, message){
        //------------Properties------------\\
        this.userName = userName
        this.profilePicSrc = profilePicture
        this.message = message
        //------------Element Creation------------\\
        this.element = document.createElement("div")
        this.element.classList.add("post")
        //------------Profile Picture------------\\
        let profilePic = document.createElement("img")
        if(profilePicture == null){
            profilePic.src = "https://shodis.ch/wp-content/uploads/2018/01/person_grey_192x192.png"
        } else{
            profilePic.src = profilePicture 
        }
        profilePic.classList.add("profilePicture")
        this.element.appendChild(profilePic)
        //------------Content Div------------\\
        let textContainer = document.createElement("div")
        this.element.appendChild(textContainer)
        //------------UserName------------\\
        let name = document.createElement("p")
        name.classList.add("userName")
        name.textContent = userName
        textContainer.appendChild(name)
        //------------Message------------\\
        let text = document.createElement("p")
        text.classList.add("message")
        text.textContent = message
        textContainer.appendChild(text)
    }
    //------------Methods------------\\
    post() {
        // This will be where the client connects to the firebase database.
        let messages = document.getElementById("messages")
        messages.appendChild(this.element)
        messages.lastChild.scrollIntoView({behavior: "smooth"})
    }

    getMessage(){
        return this.message
    }

    getUser(){
        return this.userName
    }

    processMessage(message, lang){
        const filteredWords = []
        translate(message, {to: "en"}).then(result => {
            message = message.text
        }).catch(error =>{
            console.log(error)
        })
        // Ex: I like to shit -> I like to ****
        let filteredMessage = ""
        for(let i = 0; i < filteredWords.length; i++){
            let astricks = ""
            let index = 0
            for(let w = 0; w < filteredWords[i].length; w++){
                astricks += "*"
            }
            while(message.indexOf(filteredWords[i]) != -1){
                index = message.indexOf(filteredWords[i])
                filteredMessage = message.substring(0, index) + astricks + message.substring(index)
            }
        }
    }

    // Filters a message based on an array of banned words. Returns a string.
    filterMessage(message){
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
}