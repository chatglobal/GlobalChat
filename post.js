import round from "./main.js"

export default class Post{
    //------------Properties------------\\
    message
    userName
    profilePicSrc
    element
    numLikes
    //------------Constructor------------\\
    constructor(userName, profilePicture, message,numLikes){
        //------------Properties------------\\
        this.userName = userName
        this.profilePicSrc = profilePicture
        this.message = message
        this.numLikes = numLikes
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
        let content = document.createElement("div")
        content.classList.add("content")
        this.element.appendChild(content)
        //------------UserName------------\\
        let name = document.createElement("p")
        name.classList.add("userName")
        name.textContent = userName
        content.appendChild(name)
        //------------Message------------\\
        let text = document.createElement("p")
        text.classList.add("message")
        text.textContent = message
        content.appendChild(text)
        //------------Likes------------\\
        let likes = document.createElement("div")
        likes.classList.add("likes")
        this.element.appendChild(likes)
        let likeIcon = document.createElement("i")
        likeIcon.textContent = "favorite"
        likeIcon.style.color = "grey"
        likeIcon.classList.add("material-icons")
        likeIcon.classList.add("likeImage")
        likes.appendChild(likeIcon)
        let likeCounter = document.createElement("p")
        likeCounter.textContent = numLikes
        likeCounter.classList.add("likeCounter")
        likes.appendChild(likeCounter)
        // Like button functionality
        likeIcon.addEventListener("click", function(){
            likeIcon.style.color = "magenta"
            numLikes++
            likeCounter.textContent = round(numLikes)
        })
    }
    //------------Methods------------\\
    post() {
        // This will be where the client connects to the firebase database.
        document.getElementById("messages").appendChild(this.element)
    }

    addLike(){
        this.numLikes++
    }

    getMessage(){
        return this.message
    }

    getUser(){
        return this.userName
    }

    getLikes(){
        return this.numLikes
    }
}