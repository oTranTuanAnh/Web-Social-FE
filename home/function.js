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


function createLikesPost(post_Id) {
    let ob = getKeyLocalStorage();
    let user_Id = ob.id;
    let url="http://localhost:8080/likes/create/"+post_Id+"/"+user_Id;
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
            url: url,
            success: function () {
                console.log("ok")
                showLikePost(post_Id)
            }
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
                <div class="user-status-box">
                <div class="user-profile-box">
                    <div class="user-profile">
                        <img src="images/ava${data[i].user.id}.jpg" alt="">
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
            success: function () {
                document.getElementById("post-text-input").value="";
                showListPost();
            }
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
                userName = firstName +" " + lastName;
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
                <div class="user-status-box">    
                <div class="user-profile-box">
                    <div class="user-profile">
                        <img src="images/ava${data[i].user.id}.jpg" alt="">
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
                            <img src="images/like-blue.png" alt="" onload="showLikePost(${data[i].id})" onclick="createLikesPost(${data[i].id})"><span id="postLike${data[i].id}"></span></div>
                        <div><img src="images/comments.png" alt="" onclick="showComment(${data[i].id})" onload="countComment(${data[i].id})"><span id="countComment${data[i].id}"></span></div>
                        <div><img src="images/share.png" alt="">35</div>
                    </div>
                    <div class="post-profile-picture">
                        <img src="images/ava${ob.id}.jpg " alt=""> <i class=" fas fa-caret-down"></i>
                    </div>
                    <br>
                    
                </div>
                </div>
                <div id = "comment_list${data[i].id}" style="display: none">
                <div id="showComment${data[i].id}"></div>         
               <input class="input-style" placeholder="Comment..." type="text" id="comment-text${data[i].id}">
               <button class="comment_ok_btn" onclick="createNewCom(${data[i].id})">Send</button>
               <button class="comment_ok_btn" onclick="hideComment(${data[i].id})">Hide</button>
                    </div>
                <div class="line-post"></div>`
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
                    <div class="list-friend">
                        <div class="user-profile">
                            <img src="images/ava${data[i].id}.jpg" alt="" onclick="setUserLocalStorage(${data[i].id})">
                        </div>
                        <p>${data[i].firstName}  ${data[i].lastName} </p>
                    <button name = "addfriend_button" onclick="addFriendRequest(${data[i].id})" type="button" id="btn-addfriend">+Add Friend</button>
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
                window.location.reload();
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
                            <img src="images/ava${data[i].user1.id}.jpg" alt="" width="100px" height="100px" ">
                            <p style="font-size: 15px">${data[i].user1.firstName} ${data[i].user1.lastName} </p>
                        </div>
                    <button class="btn-fr"  name = "accept_button" onclick="successRequest(${data[i].user1.id})" type="button"  >Accept</button>
                    <button class="btn-fr" name = "delete_button" onclick="removeRequest(${data[i].user1.id})" type="button" >Remove</button>
                    </div>`;
                }
                document.getElementById("friend-request").innerHTML = content;
            }
        })
    }
}
showFriendRequest();
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
                console.log(data);
                window.location.reload();
            }
        })
    }
}
function removeRequest(id){
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
            type: "DELETE",
            url: "http://localhost:8080/home/friendrequest/"+id,
            success: function (data) {
                console.log(data)
            }
        })
    }
}

showListUser();


function showComment(p_id){
document.getElementById("comment_list"+p_id).style.display = "block";
    let ob = getKeyLocalStorage();
    let url = "http://localhost:8080/comments/" + p_id;
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
                commentList = "";
                for (let i = 0; i < data.length; i++) {
                    commentList += `<div id="com-list${p_id}" style="display: block">
                <div class="outer-div"  >
                   <button class="delete_button_cmt" onclick="deleteCom(${data[i].id}, ${p_id})">X</button>
                     <div class="user-profile">
                        <img src="images/ava${data[i].user.id}.jpg" alt="">
                        <div>
                            <span>${data[i].user.lastName} ${data[i].user.firstName}</span>
                        </div>
                    </div>
                    <br>
                            <p>${data[i].content}</p>
                             </div>
                </div>`;
                  }
                document.getElementById("showComment"+p_id).innerHTML =commentList;
            }
            })
    }

}
function hideComment(p_id){
    document.getElementById("comment_list"+p_id).style.display = "none";
}

function createNewCom(p_id){

    console.log("ok")
    let c_content = document.getElementById("comment-text"+p_id).value;
    let ob = getKeyLocalStorage();
    let u_id = ob.id;
    let newComment ={
        "content": c_content,
        "user": {
            "id": u_id,
        },
        "post": {
            "id": p_id,
        }
    }
    let  url ="http://localhost:8080/comments/create/" + p_id;
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
            data: JSON.stringify(newComment),
            url: url,
            success: function () {
                console.log("OK")
                document.getElementById("comment-text"+p_id).value = "";
                showComment(p_id)
            }
        })
    }
}
function deleteCom(id, p_id){
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/comments/delete/${id}`,
        success: function (){
            document.getElementById("comment-text"+p_id).value = "";
            showComment(p_id)


        }
    });
}
window.onload = function (){
    let ob = getKeyLocalStorage();
    let u_id = ob.id;
    let str = "<img src=\"images/ava";
    let ava_cur = str+u_id +  ".jpg\" class=\"coverImage\" alt=\"\">";
    let ava_post = str+u_id +  ".jpg\" class=\"coverImage\" alt=\"\">";
    let ava_profile = str+u_id +  ".jpg\" class=\"coverImage\" alt=\"\">";
    // let ava_profile_cur = str+u_id +  ".jpg\" class=\"coverImage\" alt=\"\">";
    // document.getElementById("user-profile-cur").innerHTML = ava_profile_cur;

    document.getElementById("ava-current").innerHTML = ava_cur;
    document.getElementById("ava-post").innerHTML = ava_post;
    document.getElementById("ava-profile").innerHTML = ava_profile;
}
function showAva(){
    let ob = getKeyLocalStorage();
    let u_id = ob.id;
    let str = "<img src=\"images/ava";

    let ava_profile_cur = str+u_id +  ".jpg\" class=\"coverImage\" alt=\"\">";
    let ava_profile_cur_area = str+u_id +  ".jpg\" class=\"coverImage\" alt=\"\">";
    let ava_profile_img_online = str+u_id +  ".jpg\" class=\"coverImage\" alt=\"\">";
    document.getElementById("user-profile-cur").innerHTML = ava_profile_cur;
    document.getElementById("user-profile-cur-text-area").innerHTML = ava_profile_cur_area;
    document.getElementById("user-profile-online").innerHTML = ava_profile_img_online;

}
showAva();

function countComment(id) {
    let ob = getKeyLocalStorage();
    let url = "http://localhost:8080/comments/count/" + id;
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
            document.getElementById(`countComment${id}`).innerHTML = JSON.stringify(data);
        }
    });
}

