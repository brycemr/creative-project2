function onClick(e) {
  e.preventDefault();
  // get form values
  let username = document.getElementById('usernameInput').value;

  // check if username is empty
  if (username === "") {
    return;
  }

  // setup URL for user profile
  let url = "http://api.chess.com/pub/player/" + username + "?json";
  // call API
  fetch(url)
    .then(function(response) {
      // make sure the request was successful
      if (response.status != 200) {
        return {
          text: "Error calling the chess.com API service: " + response.statusText
        }
      }
      return response.json();
    }).then(function(json) {
      // update DOM with response
      updateUser(json);
    });

  // setup URL for current Game
  url = "http://api.chess.com/pub/player/" + username + "/games?json";
  // call API
  fetch(url)
    .then(function(response) {
      // make sure the request was successful
      if (response.status != 200) {
        return {
          text: "Error calling the chess.com API service: " + response.statusText
        }
      }
      return response.json();
    }).then(function(json) {
      // update DOM with response
	 updateGame(json);
    });

  // setup URL for Statistics
  url = "http://api.chess.com/pub/player/" + username + "/stats?json";

  // call API
  fetch(url)
    .then(function(response) {
      // make sure the request was successful
      if (response.status != 200) {
        return {
          text: "Error calling the chess.com API service: " + response.statusText
        }
      }
      return response.json();
    }).then(function(json) {
      // update DOM with response
      	updateStats(json);
    });

}

function updateUser(info) {
  document.getElementById('username').innerHTML = info.username;
	let timestampJoined = new Date(info.joined*1000);
  let dateJoined = (timestampJoined.getMonth()+1) + "/" + timestampJoined.getDate() + "/" + timestampJoined.getFullYear();
  document.getElementById('joined').innerHTML = dateJoined;
        let timestampOnline = new Date(info.last_online*1000);
  let lastOnline = (timestampOnline.getMonth()+1) + "/" + timestampOnline.getDate() + "/" + timestampOnline.getFullYear();		
  document.getElementById('lastOnline').innerHTML = lastOnline;
}

function updateGame(info) {
  let game = "";
  let row = "<div class='row'><div class='col-5 col-xl-3' id='table'>";
  let gameLink = "";
  let whiteName = "";
  let blackName = "";
  let gameType = "";
  for (let i = 0; i < info.games.length; ++i){
	gameLink = "<a href='" + info.games[i].url + "'> View Game </a>";
   	whiteName = info.games[i].white.substring(33);
  	blackName = info.games[i].black.substring(33);
	gameType = info.games[i].time_class;
	game += row + whiteName + "</div><div class='col-2 col-xl-2' id='table'> VS </div><div class='col-5 col-xl-3' id='table'>";
	game += blackName +"</div><div class='col-6 col-xl-2' id='table'>"; 
	game += gameType + " chess</div><div class='col-6 col-xl-2' id='table'>" + gameLink + "</div></div>";
  }
  document.getElementById('currentGame').innerHTML = game;
}

function updateStats(info) {
  let blitzRating = "Rating: " + info.chess_blitz.last.rating;
  let blitzRecord = "Record(W/L/D): " + info.chess_blitz.record.win+"/"+info.chess_blitz.record.loss+"/"+info.chess_blitz.record.draw;
  document.getElementById('blitz-rating').innerHTML = blitzRating;
  document.getElementById('blitz-record').innerHTML = blitzRecord;
  let bulletRating = "Rating: " + info.chess_bullet.last.rating;
  let bulletRecord = "Record(W/L/D): " + info.chess_bullet.record.win+"/"+info.chess_bullet.record.loss+"/"+info.chess_bullet.record.draw;
  document.getElementById('bullet-rating').innerHTML = bulletRating;
  document.getElementById('bullet-record').innerHTML = bulletRecord;
  let rapidRating = "Rating: " + info.chess_rapid.last.rating;
  let rapidRecord = "Record(W/L/D): " + info.chess_rapid.record.win+"/"+info.chess_rapid.record.loss+"/"+info.chess_rapid.record.draw;
  document.getElementById('rapid-rating').innerHTML = rapidRating;
  document.getElementById('rapid-record').innerHTML = rapidRecord;
  let dailyRating = "Rating: " + info.chess_daily.last.rating;
  let dailyRecord = "Record(W/L/D): " + info.chess_daily.record.win+"/"+info.chess_daily.record.loss+"/"+info.chess_daily.record.draw;
  document.getElementById('daily-rating').innerHTML = dailyRating;
  document.getElementById('daily-record').innerHTML = dailyRecord;	
}

document.getElementById('search').addEventListener('click', onClick);
document.getElementById('search').addEventListener('touchstart'. onClick);
