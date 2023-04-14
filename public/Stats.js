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
const gameSelect = document.getElementById('gameSelect');
let selectedGame;
let statsArray;

// Fetch the stats data for the selected game ID
fetch(`/api/Stats?game_id=${selectedGame}`)
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
    const playerSelectContainer = document.getElementById('playerSelectContainer');
    const playerNames = [...new Set(statsArray.map(stats => stats.PlayerName))];
    playerNames.forEach(name => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = name;
      checkbox.value = name;
      playerSelectContainer.appendChild(checkbox);
      const label = document.createElement('label');
      label.htmlFor = name;
      label.appendChild(document.createTextNode(name));
      playerSelectContainer.appendChild(label);
    });
    
    // Create comparison checkboxes and button
    const compareSelectContainer = document.getElementById('compareSelectContainer');
    const compareButton = document.createElement('button');
    compareButton.innerText = 'Compare';
    compareButton.addEventListener('click', () => {
      selectedGame = gameSelect.value;
      const selectedPlayers = Array.from(playerSelectContainer.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
      if (selectedPlayers.length > 1) {
        compareStats(statsArray, selectedPlayers, selectedGame);
      } else {
        alert('Please select at least 2 players to compare');
      }
    });
    
    compareSelectContainer.appendChild(playerSelectContainer);
    compareSelectContainer.appendChild(compareButton);
  })
  .catch(error => {
    console.error(error);
  });

  compareButton.addEventListener('click', () => {
    const selectedPlayers = Array.from(playerSelectContainer.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
    if (selectedPlayers.length >= 2) {
      compareStats(statsArray, selectedPlayers, selectedGame);
    } else {
      alert('Please select at least 2 players to compare');
    }
  });
  
  
  function compareStats(statsArray, selectedPlayers, selectedGame) {
    const comparisonDiv = document.getElementById('comparison');
    comparisonDiv.innerHTML = `
      <h2>Comparing ${selectedPlayers} in Game ${selectedGame}</h2>
      <canvas id="comparisonChart"></canvas>
    `;
  
    const colors = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'];
  
    const filteredStatsArray = statsArray.filter(stats => stats.game_id === selectedGame);
  
    const comparisonChart = new Chart(document.getElementById('comparisonChart'), {
      type: 'bar',
      data: {
        labels: ['Hits', 'Catches', 'Eliminations', 'Dodges', 'Times Hit', 'Times Caught', 'Times Eliminated'],
        datasets: selectedPlayers.map((playerName, index) => {
          const playerStats = filteredStatsArray.filter(stats => stats.PlayerName === playerName)[0];
          return {
            label: playerName,
            backgroundColor: colors[index % colors.length],
            borderColor: colors[index % colors.length],
            borderWidth: 1,
            data: [playerStats.hits, playerStats.catches, playerStats.totalEliminations, playerStats.dodges, playerStats.timesHit, playerStats.timesCaught, playerStats.timesEliminated]
          };
        })
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
  
  
  
// Get the compare button element
const compareButton = document.querySelector('#compare-button');


