const YOUTUBE_API_DOMAIN = 'https://content.googleapis.com/youtube/v3/search';
const YOUTUBE_API_kEY = 'AIzaSyCddtR8W83Ma1We0rNtwyC66TcJ25DjxYg';
const LIMIT_VIDEO = 16;
document.addEventListener('DOMContentLoaded',function (){
  var btnSearch = document.forms['search-form'] ['btn-search'];
  var txtKeyword = document.forms['search-form']['keyword'];
  if (btnSearch){
      btnSearch.addEventListener('click',function (){
          if (txtKeyword){
              var keyword = txtKeyword.value;
              if (keyword && keyword.length > 0){
                  loadVideoByKeyword(keyword);
              }else {
                  alert('vui long nhap tu khoa');
              }
          }
      })
  }
  var modal = document.getElementById("myModal");
  var videoContent = document.getElementById("modal-content");
  document.addEventListener('click', function (event){
      var obj = event.target;
      var clickVideo = false;
      if (obj.className === 'card'){
          clickVideo = true;
      }
      if (obj.className === 'video-thumbnail'){
          obj = obj.parentElement;
          clickVideo = true;
      }
      if (clickVideo){
          modal.style.display = "block";
          videoContent.src=`https://www.youtube.com/embed/${obj.title}`;
      }
  })
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function (){
      modal.style.display = "none";
      videoContent.src = '';
  }
    loadVideoByKeyword('BTS');
  })
function loadVideoByKeyword(keyword){
    var requestUrl = `${YOUTUBE_API_DOMAIN}?q=${keyword}&type=video&maxResults=${LIMIT_VIDEO}9&part=snippet&key=${ YOUTUBE_API_kEY}`;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (){
        if (this.readyState == 4){
            if (this.status == 200){
                var jsonResponseObject = JSON.parse(this.responseText);
                renderListVideo(jsonResponseObject);
            }
        }
    }
    xhr.open('GET',requestUrl, true);
    xhr.send();
}
function  renderListVideo(videoData){
    var divListVideo = document.getElementById('list-video');
    if (divListVideo && videoData){
        var contentList = '';
        for (var i = 0; i < videoData; i++) {
            var video = videoData.items[i];
            contentList += `<div class="col-3">
                 <div class"card">
                      <img src="${video.snippet.thumbnails.high.url}"alt="Avartar">
                      <div class="container">
                         <p>${video.snippet.title}</p>
                        </div>
                      </div>
                    </div>`;
        }
        divListVideo.innerHTML = contentList;
    }
}