function displayStats() {
  $.ajax({
    url: '/routes/api',
    type: 'GET',
    success: function(response) {
      let output = '';
      for (let i = 0; i < response.length; i++) {
        output += `
          <tr>
            <td>${response[i].PlayerName}</td>
            <td>${response[i].hits}</td>
            <td>${response[i].catches}</td>
            <td>${response[i].totalEliminations}</td>
            <td>${response[i].singleBallEliminations}</td>
            <td>${response[i].teamEliminations}</td>
            <td>${response[i].dodges}</td>
            <td>${response[i].timesHit}</td>
            <td>${response[i].singleOut}</td>
            <td>${response[i].teamOut}</td>
            <td>${response[i].miscOut}</td>
            <td>${response[i].timesCaught}</td>
            <td>${response[i].timesEliminated}</td>
            <td>${response[i].KD}</td>
            <td>${response[i].setsOff}</td>
          </tr>
        `;
      }
      $('#player-stats').html(output);
    }
  });
}