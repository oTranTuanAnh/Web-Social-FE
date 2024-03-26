var userSettings = document.querySelector(".user-settings");
var darkBtn = document.getElementById("dark-button");
var LoadMoreBackground =document.querySelector(".btn-LoadMore");
function getUserData() {
    let ob = JSON.parse(localStorage.getItem("object"));
    let id = parseInt(localStorage.getItem("tempUser"));
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
getUserData();
function getKeyLocalStorage(){
    let a = JSON.parse(localStorage.getItem("object"));
    return a;
}
function friendStatusButton() {
    let ob = getKeyLocalStorage();
    let id = parseInt(localStorage.getItem("tempUser"));
    let url = "http://localhost:8080/relationship/check-relationship?id2=" + id;
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
                console.log(data.status);
                let status = data.status;
                console.log(status);
                let content = "";
                switch (status) {
                    case "0":
                        content += '<button type="button"><i class="fas fa fa-user-times"></i> Pending</button>'
                        break;
                    case "1":
                        content += '<button type="button"><i class="fas fa-user"></i>Friends</button>'
                        break;
                    default:
                        content += '<button type="button"><i class="fas fa-user-plus" onclick="addFriendRequest(${data[i].id});"></i> Add friends</button>'
                }
                console.log("success");
                document.getElementById("friendStatus").innerHTML = content;
            }
        })
    }
}
friendStatusButton();
function UserSettingToggle(){
    userSettings.classList.toggle("user-setting-showup-toggle");
}
function darkModeON(){
    darkBtn.classList.toggle("dark-mode-on");
    document.body.classList.toggle("dark-theme");
};