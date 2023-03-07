function displayStats() {
  $.ajax({
    url: "/stats",
    type: "GET",
    dataType: "json",
    success: function(data) {
      // This code will be executed when the request is successful
      // You can access the player stats data in the 'data' parameter
      // and use it to update the table in your HTML file
      var playerStatsTable = $("#player-stats");
      for (var i = 0; i < data.length; i++) {
        var playerStats = data[i];
        var row = $("<tr>");
        row.append($("<td>").text(playerStats.name));
        row.append($("<td>").text(playerStats.hits));
        row.append($("<td>").text(playerStats.catches));
        row.append($("<td>").text(playerStats.eliminations));
        row.append($("<td>").text(playerStats.single_ball_eliminations));
        row.append($("<td>").text(playerStats.team_elimination));
        row.append($("<td>").text(playerStats.dodges_blocks));
        row.append($("<td>").text(playerStats.times_hit));
        row.append($("<td>").text(playerStats.single_out));
        row.append($("<td>").text(playerStats.team_out));
        row.append($("<td>").text(playerStats.misc_out));
        row.append($("<td>").text(playerStats.times_caught));
        row.append($("<td>").text(playerStats.times_eliminated));
        row.append($("<td>").text(playerStats.kd));
        row.append($("<td>").text(playerStats.set_off));
        playerStatsTable.append(row);
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // This code will be executed if the request fails
      console.log("Error: " + textStatus);
    }
  });
}


