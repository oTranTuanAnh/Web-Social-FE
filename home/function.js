var userSettings = document.querySelector(".user-settings");
var darkBtn = document.getElementById("dark-button");
var LoadMoreBackground =document.querySelector(".btn-LoadMore");
function UserSettingToggle(){
    userSettings.classList.toggle("user-setting-showup-toggle");
}
// darkBtn.onclick = function(){
//     darkBtn.classList.toggle("dark-mode-on");
// }

function darkModeON(){
    darkBtn.classList.toggle("dark-mode-on");
    document.body.classList.toggle("dark-theme");
};

function LoadMoreToggle(){
    LoadMoreBackground.classList.toggle("loadMoreToggle");
};


function getKeyLocalStorage(){
    let a = JSON.parse(localStorage.getItem("object"));
    return a;
}
var userSettings = document.querySelector(".user-settings");
var darkBtn = document.getElementById("dark-button");
var LoadMoreBackground =document.querySelector(".btn-LoadMore");
function UserSettingToggle(){
    userSettings.classList.toggle("user-setting-showup-toggle");
}
// darkBtn.onclick = function(){
//     darkBtn.classList.toggle("dark-mode-on");
// }

function darkModeON(){
    darkBtn.classList.toggle("dark-mode-on");
    document.body.classList.toggle("dark-theme");
};

function LoadMoreToggle(){
    LoadMoreBackground.classList.toggle("loadMoreToggle");
};
function showListPost() {
    let ob = getKeyLocalStorage();
    let url = "http://localhost:8080/posts/" + ob.id;
    if (ob != null) {
        let token = ob.token;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            crossDomain: true,
            type: "GET",
            url: url,
            success: function (data) {
                content = "";
                for (let i = 0; i < data.length; i++) {
                    content += `
                <div class="user-profile-box">
                    <div class="user-profile">
                        <img src="images/profile-pic.png" alt="">
                        <div>
                            <p>${data[i].user.lastName} ${data[i].user.firstName}</p>
                            <small>${data[i].createDate}</small>
                        </div>
                    </div>
                    <div>
                    <a onclick="deletePost(${data[i].id})">Xóa</a>
                    </div>
                </div>
                <div class="status-field">
                    <p>${data[i].content}</p>
                    <br>
                </div>
                <div class="post-reaction">
                    <div class="activity-icons">
                        <div><img src="images/like-blue.png" alt="">120</div>
                        <div><img src="images/comments.png" alt="">52</div>
                        <div><img src="images/share.png" alt="">35</div>
                    </div>
                    <div class="post-profile-picture">
                        <img src="images/profile-pic.png " alt=""> <i class=" fas fa-caret-down"></i>
                    </div>
                </div>
            `
                }
                console.log("success");
                document.getElementById("post-text").innerHTML = content;
            }
        })
    }
}
showListPost();

function postingText() {
    let ob = getKeyLocalStorage();
    let content = document.getElementById("post-text-input").value;
    let id = ob.id;
    let newPost = {
        "content": content,
        "user": {
            "id": id
        }
    }
    if (ob != null) {
        let token = ob.token;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            crossDomain: true,
            type: "POST",
            data: JSON.stringify(newPost),
            url: "http://localhost:8080/posts/create",
            success: showListPost
        })
    } else {
        window.location.href = "../login/profile.html"
    }
}

function getKeyLocalStorage() {
    let a = JSON.parse(localStorage.getItem("object"));
    return a;
}
function deletePost(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/posts/${id}`,
        success: showListPost
    });
}
function showListUser() {
    // event.preventDefault();
    let ob = getKeyLocalStorage();
    if (ob != null) {
        let token = ob.token;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            crossDomain: true,
            type: "GET",
            url: "http://localhost:8080/home/friend",
            success: function (data) {
                content = "";
                for (let i = 0; i < data.length; i++) {
                    content += `
                    <div className="online-list">
                        <div className="online">
                            <img src="images/member-1.png" alt="" onclick="showProfile(${data[i].id})">
<!--                            <a href="">-->
                        </div>
                        <p>${data[i].firstName}  ${data[i].lastName} </p>
                    <button onclick="addFriendRequest(${data[i].id})" type="button" id="btn-addfriend">Add Friend</button>
                    </div>`
                }
                document.getElementById("friend-list").innerHTML = content;
            }
        })
    }
}
function addFriendRequest(id){
    let ob = getKeyLocalStorage();
    if (ob != null) {
        let token = ob.token;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token,
            },
            crossDomain: true,
            type: "GET",
            url: "http://localhost:8080/home/friendrequest/add/"+id,
            success: function (data) {
                console.log("done");
                // window.location.href = "../home/index.html";
            }
        })
    }
}
function showFriendRequest(){
    let ob = getKeyLocalStorage();
    if (ob != null) {
        let id = ob.id;
        let token = ob.token;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            crossDomain: true,
            type: "GET",
            url: "http://localhost:8080/home/friendrequest/"+id,
            success: function (data) {
                console.log(data)
                content = ``;
                for (let i=0;i<data.length;i++){
                    content += `<div className="online-list">
                        <div className="online">
                            <img src="images/member-1.png" alt="">
                            <p>${data[i].user1.firstName} ${data[i].user1.lastName} </p>
                        </div>
                    <button onclick="successRequest(${data[i].user1.id})" type="button" >Ok</button>
                    </div>`;
                }
                document.getElementById("friend-request").innerHTML = content;
            }
        })
    }
}
function showProfile(id){
    localStorage.setItem("id",id);
    window.location.href = "profile.html";
}
function successRequest(id){
    event.preventDefault();
    let ob = getKeyLocalStorage();
    if (ob != null) {
        let token = ob.token;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            crossDomain: true,
            type: "PUT",
            url: "http://localhost:8080/home/friendrequest/"+id,
            success: function (data) {
                console.log(data)
            }
        })
    }
}
showFriendRequest();
showListUser();