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
  const [stats, setStats] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const playerRef = useRef(null);

  useEffect(() => {
    fetch("/api/Stats")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((statsArray) => {
        setStats(statsArray);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePlayerChange = () => {
    setSelectedPlayer(playerRef.current.value);
  };

  const filteredStats = stats.filter((s) => s.PlayerName === selectedPlayer);

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
  const y = d3.scaleLinear().rangeRound([height, 0]);

  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    if (filteredStats.length > 0) {
      x.domain(filteredStats.map((d) => d.game_id));
      y.domain([0, d3.max(filteredStats, (d) => d.KD.$numberDecimal)]);

      svg
        .select(".x-axis")
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${height})`);

      svg.select(".y-axis").call(d3.axisLeft(y));

      svg.selectAll(".bar").remove();

      svg
        .selectAll(".bar")
        .data(filteredStats)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.game_id))
        .attr("y", (d) => y(d.KD.$numberDecimal))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.KD.$numberDecimal));
    } else {
      svg.selectAll(".bar").remove();
    }
  }, [filteredStats]);
  
  return (
    <>
      <div>
        <label htmlFor="playerSelect">Select a player:</label>
        <select id="playerSelect" ref={playerRef} onChange={handlePlayerChange}>
          <option value="">All players</option>
          {stats.map((s) => (
            <option key={s.player_id} value={s.PlayerName}>
              {s.PlayerName}
            </option>
          ))}
        </select>
      </div>
      <svg ref={svgRef} width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </>
  );
}

export default Stats;
