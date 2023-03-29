import { Types } from 'mongoose';
const ObjectId = Types.ObjectId('63f6887692f21f7fab622501');

fetch(`/api/stats/${ObjectId}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(stats => {
    const statsDiv = document.getElementById('stats');
    statsDiv.innerHTML = `
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
      <p>KD: ${stats.KD}</p>
      <p>Sets Off: ${stats.setsOff}</p>
    `;
  })
  .catch(error => {
    console.error(error);
  });

