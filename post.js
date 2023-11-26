import round from "./main.js";

export default class Post{
    //------------Properties------------\\
    message;
    userName;
    profilePicSrc;
    element;
    numLikes;
    //------------Constructor------------\\
    constructor(userName, profilePicture, message,numLikes){
        //------------Properties------------\\
        this.userName = userName;
        this.profilePicSrc = profilePicture;
        this.message = message;
        this.numLikes = numLikes;
        //------------Element Creation------------\\
        this.element = document.createElement("div");
        this.element.classList.add("post");
        //------------Profile Picture------------\\
        let profilePic = document.createElement("img");
        profilePic.classList.add("profilePicture")
        profilePic.src = profilePicture;
        this.element.appendChild(profilePic)
        //------------Content Div------------\\
        let content = document.createElement("div");
        content.classList.add("content");
        this.element.appendChild(content);
        //------------UserName------------\\
        let name = document.createElement("p");
        name.classList.add("userName");
        name.textContent = userName
        content.appendChild(name);
        //------------Message------------\\
        let text = document.createElement("p");
        text.classList.add("message");
        text.textContent = message
        content.appendChild(text)
        //------------Likes------------\\
        let likes = document.createElement("div");
        likes.classList.add("likes");
        this.element.appendChild(likes);
        let likeImg = document.createElement("img")
        likeImg.src = "icons/NotLiked.png";
        likeImg.alt = "Likes: ";
        likeImg.classList.add("likeImage");
        likes.appendChild(likeImg);
        let likeCounter = document.createElement("p");
        likeCounter.textContent = numLikes;
        likeCounter.classList.add("likeCounter");
        likes.appendChild(likeCounter);
        // Like button functionality
        likeImg.addEventListener("click", function(){
            likeImg.src = "icons/Liked.png";
            numLikes ++;
            likeCounter.textContent = round(numLikes);
        });
    }
    //------------Methods------------\\
    post() {
        // This will be where the client connects to the firebase database.
        document.getElementById("messages").appendChild(this.element);
    }

    addLike(){
        this.numLikes++;
    }

    getMessage(){
        return this.message
    }

    getUser(){
        return this.userName
    }

    getLikes(){
        return this.numLikes;
    }
}