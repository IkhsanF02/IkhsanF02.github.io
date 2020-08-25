class GetMatches extends HTMLElement {

	set matches(match) {
		this._match = match;
		this.render();
	}

	render() {
		this.innerHTML = `
			<div class="card padding-style-2">
				<div class="row">
					<div class="card-content">
						<div class="col l12 s12 center grey-text text-darken-2 light">
							<p>Matchday ${this._match.matchday}</p>
						</div>
						<div class="col l5 s12 center light">
							<h5>${this._match.homeTeam.name}</h5>
						</div>
						<div class="col l2 s12 center light">
							<h4>VS</h4>
						</div>
						<div class="col l5 s12 center light">
							<h5>${this._match.awayTeam.name}</h5>
						</div>
						<div class="col l12 s12 center">
							<p class="center blue-text">${this._match.utcDate}</p>
						</div>
						<div class="col l12 s12 center margin-style-2">
							<a href="/matchDetail.html?id=${this._match.id}&match=true">
								<i class="material-icons small purple-text text-lighten-3 hover-style-2">zoom_in</i>
							</a>
						</div>
					</div>
				</div>
			</div>
		`;
	}

}

customElements.define("get-matches", GetMatches);
