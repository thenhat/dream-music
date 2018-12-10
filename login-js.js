var dem = 0;
var home = document.getElementById("home");
home.onclick = function () {
    if (dem % 2 == 0) {
        document.getElementsByClassName("sub-menu")[0].style = "display:block";
        dem = dem + 1;
    } else {
        document.getElementsByClassName("sub-menu")[0].style = "display:none";
        dem = dem + 1;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var loginForm = document.forms['login-form'];
    if (loginForm == null || loginForm['btn-submit'] == null) {
        alert('Vui lòng thử lại!');
        return;
    }
    loginForm['btn-submit'].onclick = function () {
        var pwdPassword = loginForm['password'];
        var txtEmail = loginForm['email'];
        if (pwdPassword == null || txtEmail == null) {
            alert('Login fails, please try again! ');
            return;
        }
        var jsMemberLogin = {
            password: pwdPassword.value,
            email: txtEmail.value,
        }
        doLogin(jsMemberLogin);
    }
});

function doLogin(jsMemberLogin) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            var tokenObject = JSON.parse(this.responseText);
            alert(`Login success with ID: ${tokenObject.token}`);
            localStorage.setItem('token-key', tokenObject.token);
        }
    }
    xhr.open('POST', 'https://2-dot-backup-server-001.appspot.com/_api/v2/members/authentication', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(jsMemberLogin));
}



