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
    let statsHTML = '<table>';
    let i = 0;
    statsArray.forEach(stats => {
      // Create a new table row every three statistics
      if (i % 3 === 0) {
        statsHTML += '<tr>';
      }
      statsHTML += `
        <td>
          <table>
            <tr>
              <th colspan="2" style="color:white">${stats.GameName}</th>
            </tr>
            <tr>
              <th colspan="2" style="color:white">${stats.PlayerName}</th>
            </tr>
            <tr>
              <td style="color:white">Hits:</td>
              <td style="color:white">${stats.hits}</td>
            </tr>
            <tr>
              <td style="color:white">Catches:</td>
              <td style="color:white">${stats.catches}</td>
            </tr>
            <tr>
              <td style="color:white">Total Eliminations:</td>
              <td style="color:white">${stats.totalEliminations}</td>
            </tr>
            <tr>
              <td style="color:white">Single Ball Eliminations:</td>
              <td style="color:white">${stats.singleBallEliminations}</td>
            </tr>
            <tr>
              <td style="color:white">Team Eliminations:</td>
              <td style="color:white">${stats.teamEliminations}</td>
            </tr>
            <tr>
              <td style="color:white">Dodges:</td>
              <td style="color:white">${stats.dodges}</td>
            </tr>
            <tr>
              <td style="color:white">Times Hit:</td>
              <td style="color:white">${stats.timesHit}</td>
            </tr>
            <tr>
              <td style="color:white">Single Out:</td>
              <td style="color:white">${stats.singleOut}</td>
            </tr>
            <tr>
              <td style="color:white">Team Out:</td>
              <td style="color:white">${stats.teamOut}</td>
            </tr>
            <tr>
              <td style="color:white">Misc Out:</td>
              <td style="color:white">${stats.miscOut}</td>
            </tr>
            <tr>
              <td style="color:white">Times Caught:</td>
              <td style="color:white">${stats.timesCaught}</td>
            </tr>
            <tr>
              <td style="color:white">Times Eliminated:</td>
              <td style="color:white">${stats.timesEliminated}</td>
            </tr>
            <tr>
              <td style="color:white">KD:</td>
              <td style="color:white">${stats.KD.$numberDecimal}</td>
            </tr>
            <tr>
              <td style="color:white">Sets Off:</td>
              <td style="color:white">${stats.setsOff}</td>
            </tr>
          </table>
        </td>
      `;
      // Close the table row every three statistics
      if (i % 3 === 2) {
        statsHTML += '</tr>';
      }
      i++;
    });
    // Close the table row if the last set of statistics is not a multiple of three
    if (i % 3 !== 0) {
      statsHTML += '</tr>';
    }
    statsHTML += '</table>';
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

// Fetch all stats data from API
fetch('/api/Stats')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(statsArray => {
    const statsDiv = document.getElementById('stats');
    const playerNames = [...new Set(statsArray.map(stats => stats.PlayerName))];
    const gameIDs = [...new Set(statsArray.map(stats => stats.game_id))];
    
    // Create dropdown menu for selecting player
    const playerSelect = document.createElement('select');
    playerSelect.id = 'playerSelect';
    playerSelect.addEventListener('change', updateChart);
    playerNames.forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      option.text = name;
      playerSelect.appendChild(option);
    });
    statsDiv.appendChild(playerSelect);
    
    // Create line chart
    const chartCanvas = document.createElement('canvas');
    chartCanvas.id = 'chart';
    statsDiv.appendChild(chartCanvas);
    
    const chartData = {
      labels: gameIDs,
      datasets: []
    };
    
    playerNames.forEach(name => {
      const playerStats = statsArray.filter(stats => stats.PlayerName === name);
      const data = [];
      const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
      
      // Push the data for each game into the data array
      gameIDs.forEach(gameID => {
        const gameStats = playerStats.find(stats => stats.game_id === gameID);
        data.push(gameStats ? gameStats.hits : 0);
      });
      
      chartData.datasets.push({
        label: name,
        data: data,
        borderColor: color,
        backgroundColor: `${color}33`,
        borderWidth: 1,
        fill: false
      });
    });
    
    const chartOptions = {
      responsive: true,
      title: {
        display: true,
        text: 'Player Stats by Game'
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Game ID'
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Stat Value'
          },
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
    
    const chart = new Chart(chartCanvas, {
      type: 'line',
      data: chartData,
      options: chartOptions
    });
    
    function updateChart() {
      const selectedPlayer = playerSelect.value;
      const selectedStats = statsArray.filter(stats => stats.PlayerName === selectedPlayer);
      
      // Update the data for each dataset in the chart
      chartData.datasets.forEach(dataset => {
        const data = [];
        
        gameIDs.forEach(gameID => {
          const gameStats = selectedStats.find(stats => stats.game_id === gameID);
          data.push(gameStats ? gameStats[dataset.label.toLowerCase()] : 0);
        });
        
        dataset.data = data;
      });
      
      chart.update();
    }
  })
  .catch(error => {
    console.error(error);
  });

  