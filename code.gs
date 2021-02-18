function retrieveMyUploads() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ws = ss.getSheetByName('My Videos');
 
  
  ws.getRange("A2:E").clearContent();
  
  var results = YouTube.Channels.list('contentDetails', {mine: true});
  for(var i in results.items) {
    var item = results.items[i];
    // Get the playlist ID, which is nested in contentDetails, as described in the
    // Channel resource: https://developers.google.com/youtube/v3/docs/channels
    var playlistId = item.contentDetails.relatedPlaylists.uploads;

    var nextPageToken = '';

    // This loop retrieves a set of playlist items and checks the nextPageToken in the
    // response to determine whether the list contains additional items. It repeats that process
    // until it has retrieved all of the items in the list.
    while (nextPageToken != null) {
      var playlistResponse = YouTube.PlaylistItems.list('snippet', {
        playlistId: playlistId,
        maxResults: 25,
        pageToken: nextPageToken
      });

      for (var j = 0; j < playlistResponse.items.length; j++) {
        var playlistItem = playlistResponse.items[j];
        var pubDate = Utilities.formatDate(new Date(playlistItem.snippet.publishedAt),"CST","MM/dd/yyyy");
        Logger.log('[%s] Title: %s',
                   playlistItem.snippet.resourceId.videoId,
                   playlistItem.snippet.title,
                   playlistItem.snippet.publishedAt,
                   playlistItem.snippet.thumbnail)
                   
        var vidID = playlistItem.snippet.resourceId.videoId;
        var tn = '=image("https://img.youtube.com/vi/' + vidID + '/default.jpg")';
        
        ws.appendRow([playlistItem.snippet.title,playlistItem.snippet.description,pubDate,"https://www.youtube.com/embed/" + playlistItem.snippet.resourceId.videoId + "?autoplay=0&rel=0",tn]);

      }
      nextPageToken = playlistResponse.nextPageToken;
    }
  }
}


