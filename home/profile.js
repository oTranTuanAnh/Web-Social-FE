function getMyUserData() {
    let ob = JSON.parse(localStorage.getItem("object"));
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
                let firstName = data.firstName;
                let lastName = data.lastName;
                let userName = firstName + " " + lastName;
                console.log("success");
                document.getElementById("userName").innerText = userName;
                document.getElementById("userName-post").innerText = userName;
            }
        })
    }
}
getMyUserData();