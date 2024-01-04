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
}