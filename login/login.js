function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let user = {
        "username":email,
        "password":password
    }
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        data: JSON.stringify(user),
        url: "http://localhost:8080/api/auth/login",
        success: function (data) {
            console.log(data)
            // localStorage.setItem("object", JSON.stringify(data));
            // window.location.href = "../**"
        }
    })
}

