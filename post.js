export default class Post{
    //------------Properties------------\\
    message
    userName
    profilePicSrc
    element
    //------------Constructor------------\\
    constructor(userName, profilePicSrc, message){
        //------------Properties------------\\
        this.userName = userName
        this.profilePicSrc = profilePicSrc
        this.message = message
        //------------Element Creation------------\\
        this.element = document.createElement("div")
        this.element.classList.add("post")
        //------------Profile Picture------------\\
        let profilePic = document.createElement("img")
        if(profilePicSrc == null || profilePicSrc == "null"){
            profilePic.src = "https://shodis.ch/wp-content/uploads/2018/01/person_grey_192x192.png"
        } else{
            profilePic.src = profilePicSrc
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
        text.textContent = this.filterMessage(message)
        textContainer.appendChild(text)
    }
    //------------Methods------------\\
    getMessage(){
        return this.message
    }

    getUser(){
        return this.userName
    }

    getProfilePicture(){
        return this.profilePicSrc
    }

    getDate(){
        return this.date
    }

    getElement(){
        return this.element
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