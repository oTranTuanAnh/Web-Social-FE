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
            localStorage.setItem("object", JSON.stringify(data));
            window.location.href = "../home/index.html"
        }
    })
}

function createNewUser(){
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let email = document.getElementById("email1").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("pwd").value;
    let date = document.getElementById("birthday").value;
    let gender = document.getElementById("gender").value;
    let newUser = {
        "email": email,
        "password": password,
        "firstName": firstname,
        "lastName": lastname,
        "phoneNumber": phone,
        "dateOfBirth": date,
        "gender": gender
    }
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
    // let ob = getKeyLocalStorage();
    // if (ob != null){
    // let token = ob.token;
    $.ajax({

        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        crossDomain: true,
        type: "POST",
        data: JSON.stringify(newUser),
        url:"http://localhost:8080/users/create",
        success: function (data){
            localStorage.setItem("object", JSON.stringify(data));
            window.location.href = "../login/login.html"
        },
        error: function (data){
            window.location.href ="../login/login.html"
        }
    })
    // } else {
    //     window.location.href = "../login/login.html"
    // }

}
