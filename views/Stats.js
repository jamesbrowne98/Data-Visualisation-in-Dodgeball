function displayStats() {
    $.ajax({
      url: '/api/stats',
      type: 'GET',
      success: function(stats) {
        // use the stats data to update the DOM
        var tableBody = $('#player-stats tbody');
        for (var i = 0; i < stats.length; i++) {
          var row = $('<tr>');
          row.append($('<td>').text(stats[i].playerName));
          row.append($('<td>').text(stats[i].hits));
          row.append($('<td>').text(stats[i].catches));
          row.append($('<td>').text(stats[i].totalEliminations));
          row.append($('<td>').text(stats[i].singleBallEliminations));
          row.append($('<td>').text(stats[i].teamElimination));
          row.append($('<td>').text(stats[i].dodgesBlocks));
          row.append($('<td>').text(stats[i].timesHit));
          row.append($('<td>').text(stats[i].singleOut));
          row.append($('<td>').text(stats[i].teamOut));
          row.append($('<td>').text(stats[i].miscOut));
          row.append($('<td>').text(stats[i].timesCaught));
          row.append($('<td>').text(stats[i].timesEliminated));
          row.append($('<td>').text(stats[i].kd));
          row.append($('<td>').text(stats[i].setOff));
          tableBody.append(row);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error(errorThrown);
      }
    });
  }
  