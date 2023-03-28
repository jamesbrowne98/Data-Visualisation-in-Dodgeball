import axios from 'axios';
import axios from '/axios.min.js';

const playerId = 'replace_with_actual_player_id';

axios.get(`/stats/${playerId}`)
  .then(response => {
    const stats = response.data;
    const statsDiv = document.getElementById('stats');
    statsDiv.innerHTML = `
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
      <p>KD: ${stats.KD}</p>
      <p>Sets Off: ${stats.setsOff}</p>
    `;
  })
  .catch(error => {
    console.error(error);
  });
