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

  // Fetch stats for the first game
  import React, { useState, useEffect, useRef } from "react";
  import * as d3 from "d3";
  
  function Stats() {
    const [gameId, setGameId] = useState("");
    const [playerIds, setPlayerIds] = useState([]);
    const [stats, setStats] = useState([]);
    const svgRef = useRef();
  
    useEffect(() => {
      const fetchStats = async () => {
        if (gameId !== "" && playerIds.length > 0) {
          const response = await fetch(`/Stats/${gameId}`);
          const data = await response.json();
          const filteredStats = data.filter((stat) =>
            playerIds.includes(stat.player_id)
          );
          setStats(filteredStats);
        }
      };
      fetchStats();
    }, [gameId, playerIds]);
  
    useEffect(() => {
      if (stats.length > 0) {
        const svg = d3.select(svgRef.current);
        const margin = { top: 20, right: 20, bottom: 30, left: 50 };
        const width = +svg.attr("width") - margin.left - margin.right;
        const height = +svg.attr("height") - margin.top - margin.bottom;
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
  
        // Get an array of all the unique game IDs in the stats data
        const gameIds = [...new Set(stats.map((stat) => stat.game_id))];
  
        // Create a scale for the x-axis using the unique game IDs
        const x = d3.scaleBand().range([0, width]).domain(gameIds);
  
        // Create a scale for the y-axis using the maximum number of hits
        const y = d3
          .scaleLinear()
          .range([height, 0])
          .domain([0, d3.max(stats, (d) => d.hits)]);
  
        // Create a line generator function that uses the x and y scales
        const line = d3
          .line()
          .x((d) => x(d.game_id))
          .y((d) => y(d.hits));
  
        // Create an array of colors to use for each player's line
        const colors = d3.scaleOrdinal(d3.schemeCategory10);
  
        // Group the stats data by player ID
        const players = d3.group(stats, (d) => d.player_id);
  
        // Set the domain of the colors scale to the player IDs
        colors.domain(players.keys());
  
        // Add the x-axis to the chart
        g.append("g")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x));
  
        // Add the y-axis to the chart
        g.append("g").call(d3.axisLeft(y));
  
        // Loop through each player's stats and draw a line for each one
        players.forEach((playerStats, playerId) => {
          g.append("path")
            .datum(playerStats)
            .attr("fill", "none")
            .attr("stroke", colors(playerId))
            .attr("stroke-width", 1.5)
            .attr("d", line);
        });
      }
    }, [stats]);
  
    const handleGameIdChange = (event) => {
      setGameId(event.target.value);
    };
  
    const handlePlayerIdsChange = (event) => {
      setPlayerIds(
        Array.from(event.target.selectedOptions, (option) => option.value)
      );
    };
  
    return (
      <div>
        <select multiple={true} value={playerIds} onChange={handlePlayerIdsChange}>
          {players.map(player => <option key={player._id} value={player._id}>{player.name}</option>)}
        </select>
        <input type="text" value={gameId} onChange={handleGameIdChange} />
        <svg ref={svgRef} width={500} height={500}>
          <g></g>
        </svg>
      </div>
    );
     }
  
  export default Stats;
  