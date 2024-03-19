function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let user = {
        "email":email,
        "password":password
    }
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        data: JSON.stringify(user),
        url: "http://localhost:8080/api/aut/customer",
        success: function (data) {
            localStorage.setItem("object", JSON.stringify(data));
            window.location.href = "../**"
        }
    })
}

