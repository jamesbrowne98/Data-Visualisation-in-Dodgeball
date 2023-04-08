/*
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

  */

// fetch the stats from the API
// Fetch stats data from API
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
    
    // Get players' names and create dropdown options
    const playerSelect = document.createElement('select');
    const playerSelectContainer = document.getElementById('playerSelectContainer');
    const playerNames = [...new Set(statsArray.map(stats => stats.PlayerName))];
    playerNames.forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      option.text = name;
      playerSelect.add(option);
    });
    
    // Create comparison dropdowns
    const compareSelectContainer = document.getElementById('compareSelectContainer');
    compareSelectContainer.innerHTML = '';
    const compareSelect1 = document.createElement('select');
    const compareSelect2 = document.createElement('select');
    playerNames.forEach(name => {
      const option1 = document.createElement('option');
      option1.value = name;
      option1.text = name;
      compareSelect1.add(option1);
      
      const option2 = document.createElement('option');
      option2.value = name;
      option2.text = name;
      compareSelect2.add(option2);
    });
    
    const compareButton = document.createElement('button');
    compareButton.innerText = 'Compare';
    compareButton.addEventListener('click', () => {
      compareStats(statsArray, compareSelect1.value, compareSelect2.value);
    });
    
    playerSelectContainer.appendChild(playerSelect);
    compareSelectContainer.appendChild(compareSelect1);
    compareSelectContainer.appendChild(compareSelect2);
    compareSelectContainer.appendChild(compareButton);
  })
  .catch(error => {
    console.error(error);
  });

// Compare two players' stats
function compareStats(statsArray, playerName1, playerName2) {
  const player1Stats = statsArray.filter(stats => stats.PlayerName === playerName1)[0];
  const player2Stats = statsArray.filter(stats => stats.PlayerName === playerName2)[0];
  
  const comparisonDiv = document.getElementById('comparison');
  if (comparisonDiv) {
  comparisonDiv.innerHTML = `
    <h2>Comparing ${playerName1} and ${playerName2}</h2>
    <div class="comparison-row">
      <div class="comparison-item">
        <h3>Hits</h3>
        <p>${playerName1}: ${player1Stats.hits}</p>
        <p>${playerName2}: ${player2Stats.hits}</p>
      </div>
      <div class="comparison-item">
        <h3>Catches</h3>
        <p>${playerName1}: ${player1Stats.catches}</p>
        <p>${playerName2}: ${player2Stats.catches}</p>
      </div>
      <div class="comparison-item">
        <h3>Eliminations</h3>
        <p>${playerName1}: ${player1Stats.totalEliminations}</p>
        <p>${playerName2}: ${player2Stats.totalEliminations}</p>
      </div>
    </div>
    <div class="comparison-row">
      <div class="comparison-item">
        <h3>Dodges</h3>
        <p>${playerName1}: ${player1Stats.dodges}</p>
        <p>${playerName2}: ${player2Stats.dodges}</p>
      </div>
      <div class="comparison-item">
        <h3>Times Hit</h3>
        <p>${playerName1}: ${player1Stats.timesHit}</p>
        <p>${playerName2}: ${player2Stats.timesHit}</p>
      </div>
      <div class="comparison-item">
        <h3>Times Caught</h3>
        <p>${playerName1}: ${player1Stats.timesCaught}</p>
        <p>${playerName2}: ${player2Stats.timesCaught}</p>
      </div>
    </div>
    <div class="comparison-row">
      <div class="comparison-item">
        <h3>Times Eliminated</h3>
        <p>${playerName1}: ${player1Stats.timesEliminated}</p>
        <p>${playerName2}: ${player2Stats.timesEliminated}</p>
      </div>
      <div class="comparison-item">
        <h3>KD</h3>
        <p>${playerName1}: ${player1Stats.KD.$numberDecimal}</p>
        <p>${playerName2}: ${player2Stats.KD.$numberDecimal}</p>
      </div>
      <div class="comparison-item">
        <h3>Sets Off</h3>
        <p>${playerName1}: ${player1Stats.setsOff}</p>
        <p>${playerName2}: ${player2Stats.setsOff}</p>
      </div>
    </div>
  `;
} else {
  console.error('Could not find comparisonDiv element in DOM');
}
}

