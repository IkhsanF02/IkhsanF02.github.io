class GetScorers extends HTMLElement {

	set scorers(scorer) {
		this._scorer = scorer;
		this.render();
	}

	render() {
		this.innerHTML = `
			<li>
				<div class="collapsible-header cursor">
					<i class="material-icons green-text">expand_less</i>
					${this._scorer.player.name} | ${this._scorer.team.name}<br>${this._scorer.numberOfGoals} Goal
				</div>
			</li>
		`;
	}

}

customElements.define("get-scorers", GetScorers);
