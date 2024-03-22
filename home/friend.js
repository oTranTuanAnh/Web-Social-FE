function getKeyLocalStorage() {
    let a = JSON.parse(localStorage.getItem("object"));
    return a;
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
                            <img src="images/member-1.png" alt="">
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
            url: "http://localhost:8080/home/friendrequset/add/" + id,
            success: function (data) {
            }
        })
    }
}
showListUser();