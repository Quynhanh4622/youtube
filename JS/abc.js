var modal = document.getElementById("myModal");
// var img = document.getElementById("myImg");
var myClose = document.getElementById("myClose");
var videoFrame = document.getElementById('video-frame');

var btnAdd = document.querySelector('input[name="btn-add"]');
btnAdd.onclick = function () {
    var keyword = document.querySelector('[name="keyword"]').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var jsonContent = JSON.parse(xhttp.responseText);
            var itemList = document.querySelector('#item-list');
            itemList.innerHTML = '';
            for (var i = 0; i < jsonContent.items.length; i++) {
                itemList.innerHTML += `<div class="item" onclick="playvideowithID(\`${jsonContent.items[i].id.videoId}\`)">
                    <div class="item-name">${jsonContent.items[i].snippet.title}</div>
                    <div class="item-img" >
                        <img src="${jsonContent.items[i].snippet.thumbnails.high.url}" alt="">
                    </div>
                </div>`;
            }
        }
    };
    xhttp.open('GET', `https://content.googleapis.com/youtube/v3/search?q=${keyword}&type=video&maxResults=9&part=snippet&key=AIzaSyCbZ1FtpOw8hqu2hLdmTUqjxm6SVQW-8a4`, true);
    xhttp.send();
}

function playvideowithID(id) {
    modal.style.display = 'block';
    videoframe.src = `https://www.youtube.com/embed/${id}?autoplau=1`;
}

myClose.onclick = function (){
    modal.style.display = 'none';
    videoframe.src = '';
}

var mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
