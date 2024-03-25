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
// $(document ).ready(function() {
//     let ob = getKeyLocalStorage();
//     let name = '<p>'+ob.name+'</p>';
//     $('#user-name').innerHTML = name;
// });
// // $('#user-name').onload(function (){
// //     let ob = getKeyLocalStorage();
// //     let name = '<p>'+ob.name+'</p>';
// //     document.getElementById("user-name").innerHTML = name;
// // })


function createLikesPost(id) {
    let ob = getKeyLocalStorage();
    let user_Id = ob.id;
    let likePost = {
        "post": {
            "id":id
        },
        "user":{
            "id":user_Id
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
            data: JSON.stringify(likePost),
            url: "http://localhost:8080/likes/create",
            success: showListPostHome
        })
    }
}

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
                            <p>${data[i].user.firstName} ${data[i].user.lastName}</p>
                            <small>${data[i].createDate}</small>
                        </div>
                    </div>
                    <div>
                    <button name="delete_button" onclick="deletePost(${data[i].id})">Xóa</button>
                    <button onclick="setPostHiddenId(${data[i].id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Edit</button>
                    </div>
                </div>
                <div class="status-field">
                    <p>${data[i].content}</p>
                    <br>
                </div>
                <div class="post-reaction">
                    <div class="activity-icons">
                    <div>
                        <img src="images/like-blue.png" alt="" onload="showLikePost(${data[i].id})"><span id="postLike${data[i].id}"></span></div>
<!--                        <div><img src="images/like-blue.png" alt="">120</div>-->
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

// function getKeyLocalStorage() {
//     let a = JSON.parse(localStorage.getItem("object"));
//     return a;
// }
function deletePost(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/posts/delete/${id}`,
        success: showListPost
    });
}
function setPostHiddenId(h_id){
    document.getElementById("old_post_id").setAttribute("value", h_id);
    // console.log(h_id);
}
function editPost() {
    let ob = getKeyLocalStorage();
    let p_id = document.getElementById("old_post_id").value;
    let u_id = ob.id;
    let content = document.getElementById("new-post-text").value;
    let newPostEdit = {
        "content": content,
        "user": {
            "id": u_id
        }
    }
    let token_edit = ob.token;
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token_edit
        },
        crossDomain: true,
        type: "PUT",
        data: JSON.stringify(newPostEdit),
        url: `http://localhost:8080/posts/edit/${p_id}`,
        success: showListPost
    });
}
function getUserData() {
    let ob = getKeyLocalStorage();
    let id = ob.id;
    let url = "http://localhost:8080/users/" + id;
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
                let userName = "";
                let firstName = data.firstName;
                let lastName = data.lastName;
                userName = firstName + " " + lastName;
                console.log("success");
                document.getElementById("userName").innerText = userName;
                document.getElementById("userName-post").innerText = userName;
            }
        })
    }
}
function setUserLocalStorage(id) {
    localStorage.setItem("tempUser", id);
    window.location.href="friendProfile.html"
}
getUserData();

function logout() {
    localStorage.removeItem("object");
    window.location.href = "../login/login.html";
}

function showListPostHome() {
    let ob = getKeyLocalStorage();
    let url = "http://localhost:8080/posts/home/" + ob.id;
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
                </div>
                <div class="status-field">
                    <p>${data[i].content}</p>
                    <br>
                </div>
                <div class="post-reaction">
                    <div class="activity-icons">
                        <div>
                            <img src="images/like-blue.png" alt="" onload="showLikePost(${data[i].id})" onclick="createLikesPost(${data[i].id});showLikePost(${data[i].id})"><span id="postLike${data[i].id}"></span></div>
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
                document.getElementById("post-home").innerHTML = content;
            }
        })
    }
}
showListPostHome();

function showLikePost(id) {
    let ob = getKeyLocalStorage();
    let url = "http://localhost:8080/likes/" + id;
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
        success: function(data) {
            // console.log(data)
            // $('#likeData').text(JSON.stringify(data));
            document.getElementById(`postLike${id}`).innerHTML = JSON.stringify(data);
        }
    });
}


