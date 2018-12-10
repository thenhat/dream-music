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
var btnSubmit = document.forms['song-form']['btn-submit'];
btnSubmit.onclick = function () {
    if(validateForm()){
        doCreateSong();
    }
}
function doCreateSong() {
    var _name = document.forms['song-form']['name'].value;
    var _singer = document.forms['song-form']['singer'].value;
    var _author = document.forms['song-form']['author'].value;
    var _thumbnail = document.forms['song-form']['thumbnail'].value;
    var _link = document.forms['song-form']['link'].value;

    var CreateSongInformation = {
        name: _name,
        singer: _singer,
        author: _author,
        thumbnail: _thumbnail,
        link: _link
    };
    var jsonCreateSongInformation = JSON.stringify(CreateSongInformation);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 201) {
            alert('Create Song success!');
        } else if (xhr.readyState == 4) {
            alert('Create Song fails, please try again! ' + xhr.responseText);
        }
    };
    xhr.open('POST', 'https://2-dot-backup-server-001.appspot.com/_api/v2/songs', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem('token-key'));
    xhr.send(jsonCreateSongInformation);
}

function validateForm() {
    var isValid = true;
    var isValidName = true;
    var isValidSinger = true;
    var isValidAuthor = true;
    var isValidThumbnail = true;
    var isValidLink = true;

    var txtName = document.forms['song-form']['name'];
    var msgName = txtName.nextElementSibling;
    if (txtName.value == null || txtName.value.length == 0) {
        msgName.classList.remove('msg-success');
        msgName.classList.add('msg-error');
        msgName.innerHTML = 'Name is required!';
        isValidName = false;
    } else {
        msgName.classList.remove('msg-error');
        msgName.classList.add('msg-success');
        msgName.innerHTML = 'Ok.';
    }

    var txtSinger = document.forms['song-form']['singer'];
    var msgSinger = txtSinger.nextElementSibling;
    if (txtSinger.value == null || txtSinger.value.length == 0) {
        msgSinger.classList.remove('msg-success');
        msgSinger.classList.add('msg-error');
        msgSinger.innerHTML = 'Singer is required!';
        isValidSinger = false;
    } else {
        msgSinger.classList.remove('msg-error');
        msgSinger.classList.add('msg-success');
        msgSinger.innerHTML = 'Ok.';
    }

    var txtAuthor = document.forms['song-form']['author'];
    var msgAuthor = txtAuthor.nextElementSibling;
    if (txtAuthor.value == null || txtAuthor.value.length == 0) {
        msgAuthor.classList.remove('msg-success');
        msgAuthor.classList.add('msg-error');
        msgAuthor.innerHTML = 'Author is required!';
        isValidAuthor = false;
    } else {
        msgAuthor.classList.remove('msg-error');
        msgAuthor.classList.add('msg-success');
        msgAuthor.innerHTML = 'Ok.';
    }

    var txtThumbnail = document.forms['song-form']['thumbnail'];
    var msgThumbnail = txtThumbnail.nextElementSibling;
    if (txtThumbnail.value == null || txtThumbnail.value.length == 0) {
        msgThumbnail.classList.remove('msg-success');
        msgThumbnail.classList.add('msg-error');
        msgThumbnail.innerHTML = 'Thumbnail is required!';
        isValidThumbnail = false;
    } else {
        msgThumbnail.classList.remove('msg-error');
        msgThumbnail.classList.add('msg-success');
        msgThumbnail.innerHTML = 'Ok!';
    }
    var txtLink = document.forms['song-form']['link'];
    var msgLink = txtLink.nextElementSibling;
    if (txtLink.value == null || txtLink.value.length == 0) {
        msgLink.classList.remove('msg-success');
        msgLink.classList.add('msg-error');
        msgLink.innerHTML = 'Link is required!';
        isValidLink = false;
    } else {
        msgLink.classList.remove('msg-error');
        msgLink.classList.add('msg-success');
        msgLink.innerHTML = 'Ok!';
    }
    isValid = isValidName && isValidSinger && isValidAuthor && isValidThumbnail && isValidLink;
    return isValid;
}