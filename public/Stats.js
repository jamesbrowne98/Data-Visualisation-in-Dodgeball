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
  comparisonDiv.innerHTML = `
    <h2>Comparing ${playerName1} and ${playerName2}</h2>
    <canvas id="comparisonChart"></canvas>
  `;
  
  const comparisonChart = new Chart(document.getElementById('comparisonChart'), {
    type: 'bar',
    data: {
      labels: ['Hits', 'Catches', 'Eliminations', 'Dodges', 'Times Hit', 'Times Caught', 'Times Eliminated'],
      datasets: [
        {
          label: playerName1,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: [player1Stats.hits, player1Stats.catches, player1Stats.totalEliminations, player1Stats.dodges, player1Stats.timesHit, player1Stats.timesCaught, player1Stats.timesEliminated]
        },
        {
          label: playerName2,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          data: [player2Stats.hits, player2Stats.catches, player2Stats.totalEliminations, player2Stats.dodges, player2Stats.timesHit, player2Stats.timesCaught, player2Stats.timesEliminated]
        }
      ]
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

// Add a click event listener to the compare button
compareButton.addEventListener('click', function() {
  // Get the graph canvas element
  const graphCanvas = document.querySelector('#graph-canvas');

  // Set the background color of the graph canvas to white
  graphCanvas.style.backgroundColor = 'white';
});

