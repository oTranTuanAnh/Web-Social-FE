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
                            <p>' + ${data[i].user.name} + '</p>
                            <small>August 13 1999, 09.18 pm</small>
                        </div>
                    </div>
                    <div>
                        <a href="#"><i class="fas fa-ellipsis-v"></i></a>
                    </div>
                </div>
                <div class="status-field">
                    <p>' + ${data[i].content} +'
                    </p>
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
    let content = document.getElementById("post-content").value;
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