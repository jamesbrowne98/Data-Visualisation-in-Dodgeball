fetch('/api/Stats')
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
