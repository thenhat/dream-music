loadSong();
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

var i=0;
var img=[];
img[0]='https://malmolive.se/sites/all/files/header-image/dreammusic-header_1.jpg';
img[1]='https://media.lamsao.com//Resources/Data/News/Auto/trangbh/201405/28d5bc6a4a545852533a192c800c7698635352243626929353.jpg';
img[2]='https://png.pngtree.com/thumb_back/fw800/back_pic/02/50/95/52577f9d4eec419.jpg';
img[3]='https://images.theskinny.co.uk/assets/production/000/108/391/108391_widescreen.jpg';
img[4]='https://cdn.pixabay.com/photo/2018/04/30/20/54/fantasy-3364026_960_720.jpg';
img[5]='https://www.owlcitymusic.com/wp-content/uploads/2018/01/Owl-City-Lucid-Dream-Music-Video_crop-1024x451.jpg';


function changeImage() {
    document.slide.src = img[i];
    if(i<img.length-1){
        i++;
    }else {
        i=0;
    }
}
setInterval('changeImage()',3000);

function playSong(link) {
    var audioPlayer = document.getElementsByTagName('audio')[0];
    audioPlayer.src = link;
    audioPlayer.play();
}

function loadSong() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var arraySongs = JSON.parse(xhr.responseText);
            var htmlContent = '';
            for (var i = 0; i < arraySongs.length; i++) {
                var song = arraySongs[i];
                htmlContent += '<div class="song-item">';
                htmlContent += '<div class="song-index">' + (i + 1) + '</div>';
                htmlContent += '<div class="song-thumbnail">';
                htmlContent += '<img src="' + song.thumbnail + '">';
                htmlContent += '</div>';
                htmlContent += '<div class="song-infor">';
                htmlContent += '<div class="song-name" onclick="playSong(\'' + song.link + '\')">' + song.name + '</div>';
                htmlContent += '<div class="song-singer">' + song.singer + '</div>';
                htmlContent += '</div>';
                htmlContent += '</div>';
            }
            document.getElementById('list-song').innerHTML += htmlContent;
        }
    };
    xhr.open('GET', 'https://2-dot-backup-server-001.appspot.com/_api/v2/songs', true);
    xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem('token-key'));
    xhr.send();

}


