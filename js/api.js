import {getAll, getDetail} from "./db.js";

const base_url = "https://api.football-data.org/v2/";
const header = "0f365ede2cd440c4a70aae4f7ae3f9c9";

const fetchUrl = (base_url, type, header) => {
	return fetch(base_url + type, {
		headers: {
			"X-Auth-Token": header
		}
	})
}

// Blok kode yang akan dipanggil jika fetch berhasil
function status(response) {
	if (response.status !== 200) {
		console.log(`Error ${response.status}`);
		// Method reject akan membuat blok catch terpanggil
		return Promise.reject(new Error(response.statusText));
	} else {
		// Mengubah suatu objek menjadi Promise agar bisa di then-kan
		return Promise.resolve(response);
	}
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
	return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
	// parameter error berasal dari Promise.reject()
	console.log(`Error: ${error}`);
}

const type_scorers = "competitions/2021/scorers";
function getScorers() {
	if ("caches" in window) {
		caches.match(base_url + type_scorers).then(function(response) {
			if (response) {
				response.json().then(function(data) {
					document.getElementById("scorers").innerHTML = "";
					data.scorers.forEach(function(scorer) {
						const clubScorerElement = document.createElement("get-scorers");
						clubScorerElement.scorers = scorer;
						document.getElementById("scorers").appendChild(clubScorerElement);
					});
				})
				.catch(error);
			}
		})
	}

	fetchUrl(base_url, type_scorers, header)
	.then(status)
	.then(json)
	.then(function(data) {
		document.getElementById("scorers").innerHTML = "";
		data.scorers.forEach(function(scorer) {
			const clubScorerElement = document.createElement("get-scorers");
			clubScorerElement.scorers = scorer;
			document.getElementById("scorers").appendChild(clubScorerElement);
		});
	})
	.catch(error);
}

const type_standings = "competitions/2021/standings";
function getStandings() {
	if ("caches" in window) {
		caches.match(base_url + type_standings).then(function(response) {
			if (response) {
				response.json().then(function(data) {
					let standing = data.standings[0];
					let standingsHTML = "";
					standing.table.forEach(function(table) {
						standingsHTML += `
							<tr>
								<td>
									<a href="/match.html?id=${table.team.id}">
										<i class="material-icons purple-text text-lighten-3 hover-style-2">zoom_in</i>
									</a>
								</td>
								<td>${table.position}.</td>
								<td>${table.team.name}</td>
								<td>${table.playedGames}</td>
								<td>${table.won}</td>
								<td>${table.draw}</td>
								<td>${table.lost}</td>
								<td>${table.goalDifference}</td>
								<td>${table.points}</td>
							</tr>
						`;
						document.getElementById("standings").innerHTML = standingsHTML;
					});
				})
				.catch(error);
			}
		})
	}

	fetchUrl(base_url, type_standings, header)
	.then(status)
	.then(json)
	.then(function(data) {
		let standing = data.standings[0];
		let standingsHTML = "";
		standing.table.forEach(function(table) {
			standingsHTML += `
				<tr>
					<td>
						<a href="/match.html?id=${table.team.id}">
							<i class="material-icons purple-text text-lighten-3 hover-style-2">zoom_in</i>
						</a>
					</td>
					<td>${table.position}.</td>
					<td>${table.team.name}</td>
					<td>${table.playedGames}</td>
					<td>${table.won}</td>
					<td>${table.draw}</td>
					<td>${table.lost}</td>
					<td>${table.goalDifference}</td>
					<td>${table.points}</td>
				</tr>
			`;
			document.getElementById("standings").innerHTML = standingsHTML;
		});
	})
	.catch(error);
}

function getMatches() {
	// Ambil nilai query parameter (?id=)
	const urlParams = new URLSearchParams(window.location.search);
	const idParam = urlParams.get("id");
	const type_matches = `teams/${idParam}/matches?status=SCHEDULED`;

	if ("caches" in window) {
		caches.match(base_url + type_matches).then(function(response) {
			if (response) {
				response.json().then(function(data) {
					document.getElementById("body-content").innerHTML = "";
					data.matches.forEach(function(match) {
						const matchesELement = document.createElement("get-matches");
						matchesELement.matches = match;
						document.getElementById("body-content").appendChild(matchesELement);
					});
				})
				.catch(error);
			}
		})
	}

	fetchUrl(base_url, type_matches, header)
	.then(status)
	.then(json)
	.then(function(data) {
		document.getElementById("body-content").innerHTML = "";
		data.matches.forEach(function(match) {
			const matchesELement = document.createElement("get-matches");
			matchesELement.matches = match;
			document.getElementById("body-content").appendChild(matchesELement);
		});
	})
	.catch(error);
}

function getMatchDetail() {
	return new Promise(function(resolve, reject) {
		const urlParams = new URLSearchParams(window.location.search);
		const idParam = urlParams.get("id");
		const type_matchDetail = `matches/${idParam}`;

		if ("caches" in window) {
			caches.match(base_url + type_matchDetail).then(function(response) {
				if (response) {
					response.json().then(function(data) {
						let matchDetailHTML = `
							<div class="card padding-style-2">
								<div class="row">
									<div class="card-content">
										<div class="col l12 s12 center grey-text text-darken-2 light">
											<p>Matchday ${data.match.matchday}</p>
										</div>
										<div class="col l5 s12 center light">
											<h5>${data.match.homeTeam.name}</h5>
										</div>
										<div class="col l2 s12 center light">
											<h4>VS</h4>
										</div>
										<div class="col l5 s12 center light">
											<h5>${data.match.awayTeam.name}</h5>
										</div>
										<div class="col l12 s12 center grey-text text-darken-2 light">
											<p>${data.match.venue}</p>
										</div>
										<div class="col l12 s12 center margin-style-2 white-text green lighten-1 bgTime">
											<h6>${data.match.utcDate}</h6>
										</div>
									</div>
									<div class="card-content margin-style-2">
										<table class="centered striped">
											<thead>
												<tr>
													<th colspan="3">Head To Head</th>
												</tr>
												<tr>
													<th>${data.head2head.homeTeam.name}</th>
													<th>VS</th>
													<th>${data.head2head.awayTeam.name}</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>${data.head2head.numberOfMatches}</td>
													<td>Number Of Matches</td>
													<td>${data.head2head.numberOfMatches}</td>
												</tr>
												<tr>
													<td>${data.head2head.homeTeam.wins}</td>
													<td>Wins</td>
													<td>${data.head2head.awayTeam.wins}</td>
												</tr>
												<tr>
													<td>${data.head2head.homeTeam.draws}</td>
													<td>Draws</td>
													<td>${data.head2head.awayTeam.draws}</td>
												</tr>
												<tr>
													<td>${data.head2head.homeTeam.losses}</td>
													<td>Losses</td>
													<td>${data.head2head.awayTeam.losses}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						`;
						// Sisipkan komponen card ke dalam elemen dengan di #body-content
						document.getElementById("body-content").innerHTML = matchDetailHTML;
						// Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
						resolve(data);
					})
					.catch(error);
				}
			})
		}

		fetchUrl(base_url, type_matchDetail, header)
		.then(status)
		.then(json)
		.then(function(data) {
			let matchDetailHTML = `
				<div class="card padding-style-2">
					<div class="row">
						<div class="card-content">
							<div class="col l12 s12 center grey-text text-darken-2 light">
								<p>Matchday ${data.match.matchday}</p>
							</div>
							<div class="col l5 s12 center light">
								<h5>${data.match.homeTeam.name}</h5>
							</div>
							<div class="col l2 s12 center light">
								<h4>VS</h4>
							</div>
							<div class="col l5 s12 center light">
								<h5>${data.match.awayTeam.name}</h5>
							</div>
							<div class="col l12 s12 center grey-text text-darken-2 light">
								<p>${data.match.venue}</p>
							</div>
							<div class="col l12 s12 center margin-style-2 white-text green lighten-1 bgTime">
								<h6>${data.match.utcDate}</h6>
							</div>
						</div>
						<div class="card-content margin-style-2">
							<table class="centered striped">
								<thead>
									<tr>
										<th colspan="3">Head To Head</th>
									</tr>
									<tr>
										<th>${data.head2head.homeTeam.name}</th>
										<th>VS</th>
										<th>${data.head2head.awayTeam.name}</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>${data.head2head.numberOfMatches}</td>
										<td>Number Of Matches</td>
										<td>${data.head2head.numberOfMatches}</td>
									</tr>
									<tr>
										<td>${data.head2head.homeTeam.wins}</td>
										<td>Wins</td>
										<td>${data.head2head.awayTeam.wins}</td>
									</tr>
									<tr>
										<td>${data.head2head.homeTeam.draws}</td>
										<td>Draws</td>
										<td>${data.head2head.awayTeam.draws}</td>
									</tr>
									<tr>
										<td>${data.head2head.homeTeam.losses}</td>
										<td>Losses</td>
										<td>${data.head2head.awayTeam.losses}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			`;
			// Sisipkan komponen card ke dalam elemen dengan di #body-content
			document.getElementById("body-content").innerHTML = matchDetailHTML;
			// Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
			resolve(data);
		})
		.catch(error);
	})
}

function getSavedMatches() {
	getAll().then(function(matches) {
		console.log(matches);
		// Menyusun komponen card artikel secara dinamis
		let savedMatches = "";
		matches.forEach(function(match) {
			savedMatches += `
				<div class="container padding-style-3">
					<div class="row">
					    <div class="col l2"></div>
						<div class="col l8 s12">
							<div class="card padding-style-2">
								<div class="row">
									<div class="card-content">
										<div class="col l12 s12 center grey-text text-darken-2 light">
											<p>Matchday ${match.matchday}</p>
										</div>
										<div class="col l5 s12 center light">
											<h5>${match.homeTeam.name}</h5>
										</div>
										<div class="col l2 s12 center light">
											<h4>VS</h4>
										</div>
										<div class="col l5 s12 center light">
											<h5>${match.awayTeam.name}</h5>
										</div>
										<div class="col l12 s12 center grey-text text-darken-2 light">
											<p>${match.venue}</p>
										</div>
										<div class="col l12 s12 center margin-style-2 white-text green lighten-1 bgTime">
											<h6>${match.utcDate}</h6>
										</div>
										<div class="col l12 s12 center margin-3">
											<a href="/matchDetail.html?id=${match.id}&saved_matches=true">
												<i class="material-icons small purple-text text-lighten-3 hover-style-2">zoom_in</i>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col l2"></div>
					</div>
				</div>
			`;
			document.getElementById("body-content").innerHTML = savedMatches;
		})
	})
}

function getSavedMatchDetail() {
	return new Promise(function(resolve, reject) {
		const urlParams = new URLSearchParams(window.location.search);
		const idParam = urlParams.get("id");
		resolve(idParam);
		const type_matchDetail = `matches/${idParam}`;

		getDetail(idParam).then(function(matches) {
			let savedMatchDetail = `
				<div class="card padding-style-2">
					<div class="row">
						<div class="card-content">
							<div class="col l12 s12 center grey-text text-darken-2 light">
								<p>Matchday ${matches.match.matchday}</p>
							</div>
							<div class="col l5 s12 center light">
								<h5>${matches.match.homeTeam.name}</h5>
							</div>
							<div class="col l2 s12 center light">
								<h4>VS</h4>
							</div>
							<div class="col l5 s12 center light">
								<h5>${matches.match.awayTeam.name}</h5>
							</div>
							<div class="col l12 s12 center grey-text text-darken-2 light">
								<p>${matches.match.venue}</p>
							</div>
							<div class="col l12 s12 center margin-style-2 white-text green lighten-1 bgTime">
								<h6>${matches.match.utcDate}</h6>
							</div>
						</div>
						<div class="card-content margin-style-2">
							<table class="centered striped">
								<thead>
									<tr>
										<th colspan="3">Head To Head</th>
									</tr>
									<tr>
										<th>${matches.head2head.homeTeam.name}</th>
										<th>VS</th>
										<th>${matches.head2head.awayTeam.name}</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>${matches.head2head.numberOfMatches}</td>
										<td>Number Of Matches</td>
										<td>${matches.head2head.numberOfMatches}</td>
									</tr>
									<tr>
										<td>${matches.head2head.homeTeam.wins}</td>
										<td>Wins</td>
										<td>${matches.head2head.awayTeam.wins}</td>
									</tr>
									<tr>
										<td>${matches.head2head.homeTeam.draws}</td>
										<td>Draws</td>
										<td>${matches.head2head.awayTeam.draws}</td>
									</tr>
									<tr>
										<td>${matches.head2head.homeTeam.losses}</td>
										<td>Losses</td>
										<td>${matches.head2head.awayTeam.losses}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			`;
			document.getElementById("body-content").innerHTML = savedMatchDetail;
		})
		.catch(error);
	});
}

export default getMatches;
export {getScorers, getSavedMatches, getStandings, getSavedMatchDetail, getMatchDetail};
