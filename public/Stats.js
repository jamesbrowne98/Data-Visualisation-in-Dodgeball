const statsDiv = document.getElementById('stats');
const playerSelect = document.getElementById('player-select');
const gameSelect = document.getElementById('game-select');

// function to fetch stats data
function fetchStats(playerId, gameId) {
  let url = '/api/stats';
  if (playerId && gameId) {
    url += `?player_id=${playerId}&game_id=${gameId}`;
  } else if (playerId) {
    url += `?player_id=${playerId}`;
  } else if (gameId) {
    url += `?game_id=${gameId}`;
  }

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
    });
}

// function to render stats HTML
function renderStats(statsArray) {
  let statsHTML = '';
  statsArray.forEach(stats => {
    statsHTML += `
      <div>
        <p>Player ID: ${stats.player_id}</p>
        <p>Game ID: ${stats.game_id}</p>
        <p>Name: ${stats.PlayerName}</p>
        <p>Hits: ${stats.hits}</p>
        <p>Catches: ${stats.catches}</p>
        <p>Total Eliminations: ${stats.totalEliminations}</p>
        <p>Single Ball Eliminations: ${stats.singleBallEliminations}</p>
        <p>Team Eliminations: ${stats.teamEliminations}</p>
        <p>Dodges: ${stats.dodges}</p>
        <p>Times Hit: ${stats.timesHit}</p>
        <p>Single Out: ${stats.singleOut}</p>
        <p>Team Out: ${stats.teamOut}</p>
        <p>Misc Out: ${stats.miscOut}</p>
        <p>Times Caught: ${stats.timesCaught}</p>
        <p>Times Eliminated: ${stats.timesEliminated}</p>
        <p>KD: ${stats.KD.$numberDecimal}</p>
        <p>Sets Off: ${stats.setsOff}</p>
      </div>
    `;
  });
  statsDiv.innerHTML = statsHTML;
}

// function to render player options in select element
function renderPlayerOptions(players) {
  let optionsHTML = '<option value="">All Players</option>';
  players.forEach(player => {
    optionsHTML += `<option value="${player.player_id}">${player.PlayerName}</option>`;
  });
  playerSelect.innerHTML = optionsHTML;
}

// function to render game options in select element
function renderGameOptions(games) {
  let optionsHTML = '<option value="">All Games</option>';
  games.forEach(game => {
    optionsHTML += `<option value="${game.game_id}">${game.GameName}</option>`;
  });
  gameSelect.innerHTML = optionsHTML;
}

// initial fetch for all stats data
fetchStats()
  .then(statsArray => {
    renderStats(statsArray);
    // fetch player and game data for select elements
    return Promise.all([fetch('/api/Stats'), fetch('/api/Stats')]);
  })
  .then(responses => {
    return Promise.all([responses[0].json(), responses[1].json()]);
  })
  .then(data => {
    const players = data[0];
    const games = data[1];
    renderPlayerOptions(players);
    renderGameOptions(games);
  })
  .catch(error => {
    console.error(error);
  });

// event listeners for select
playerSelect.addEventListener('change', handleSelectChange);
gameSelect.addEventListener('change', handleSelectChange);
comparePlayerSelect.addEventListener('change', handleSelectChange);
compareGameSelect.addEventListener('change', handleSelectChange);

// function to handle select change
function handleSelectChange() {
  const player = playerSelect.value;
  const game = gameSelect.value;
  const comparePlayer = comparePlayerSelect.value;
  const compareGame = compareGameSelect.value;

  // make API call with selected values
  fetch(`/api/stats?player_id=${player}&game_id=${game}&compare_player_id=${comparePlayer}&compare_game_id=${compareGame}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(statsArray => {
      const statsDiv = document.getElementById('stats');
      let statsHTML = '';
      statsArray.forEach(stats => {
        statsHTML += `
          <div>
            <p>Player ID: ${stats.player_id}</p>
            <p>Game ID: ${stats.game_id}</p>
            <p>Name: ${stats.PlayerName}</p>
            <p>Hits: ${stats.hits}</p>
            <p>Catches: ${stats.catches}</p>
            <p>Total Eliminations: ${stats.totalEliminations}</p>
            <p>Single Ball Eliminations: ${stats.singleBallEliminations}</p>
            <p>Team Eliminations: ${stats.teamEliminations}</p>
            <p>Dodges: ${stats.dodges}</p>
            <p>Times Hit: ${stats.timesHit}</p>
            <p>Single Out: ${stats.singleOut}</p>
            <p>Team Out: ${stats.teamOut}</p>
            <p>Misc Out: ${stats.miscOut}</p>
            <p>Times Caught: ${stats.timesCaught}</p>
            <p>Times Eliminated: ${stats.timesEliminated}</p>
            <p>KD: ${stats.KD.$numberDecimal}</p>
            <p>Sets Off: ${stats.setsOff}</p>
          </div>
        `;
      });
      statsDiv.innerHTML = statsHTML;
    })
    .catch(error => {
      console.error(error);
    });
}