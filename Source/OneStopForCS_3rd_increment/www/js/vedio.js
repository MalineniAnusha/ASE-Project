/**
 * Created by putha on 11/7/2016.
 */


var nextPageToken, prevPageToken;
$('#controls').hide();

function clearEntry(){
  $('#user-input').val('').focus();
}

function entryList (newEntry){
  var allHtml;
  allHtml += newEntry+'<hr>';
  $('#search-results').prepend(allHtml);
  nextPageToken = newEntry.result.nextPageToken;
  prevPageToken = newEntry.result.prevPageToken;
  $('#controls').fadeIn(1000);

}

function nextPage() {
  requestVideoPlaylist(playlistId, nextPageToken);
}

// Retrieve the previous page of videos in the playlist.
function previousPage() {
  requestVideoPlaylist(playlistId, prevPageToken);
}

function showResults(results){
  console.log('show');
  var html=' ';
  $.each(results, function(index, value){

    var result = results[index];
    var position = index+1;
    if (result.id.kind == 'youtube#channel'){
      var url = 'https://www.youtube.com/channel/'+result.id.channelId;
    }
    else {
      var url = 'https://www.youtube.com/watch?v='+result.id.videoId;
    }

    var title = result.snippet.title;
    var thumb = '<a href="'+url+'" target="_blank"><div class="thumb" style="background-image: url('+result.snippet.thumbnails.high.url+')"></div></a>';

    html += '<div class="result"><h3>'+ position +'. '+title+'</h3>'+thumb+'<p>'+result.snippet.description+'<br>'+ position +'</p></div>';



  });
  entryList(html);
  clearEntry();

}



function getRequest(searchTerm) {
  console.log('get');
  var params = {
    // s: searchTerm,
    r: 'json',
    q: searchTerm,
    part: 'snippet',
    order: 'viewCount',
    startIndex: 1,
    pagetoken: 'CAoQAA',
    maxResults: 10,
    key: 'AIzaSyA5KnfmKw5qQc6iFwxuLlXw2lgd5ydWb8M'

  };
  url = 'https://www.googleapis.com/youtube/v3/search';

  $.getJSON(url, params, function(data){

    showResults(data.items);
  });
}

$(function() {
  console.log('start');
  clearEntry();
  $('#search-form').submit(function(event){
    event.preventDefault();
    var searchTerm = $('#user-input').val();
    getRequest(searchTerm);
  });


  $('#reset').click(event, function(){
    event.preventDefault();
    $('#search-results').empty();
  });
});


