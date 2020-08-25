class FootBar extends HTMLElement {

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer class="page-footer purple darken-2">
          <div class="container">
            <div class="row">
              <div class="col l8 s12">
                <h5 class="white-text"><img width="150" src="images/logo.webp" alt="logo"></h5>
                <p class="grey-text text-lighten-4">English Premier League is the most competitive league in the world.</p>
              </div>
              <div class="col l2 s6">
                <h5 class="white-text">More</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3 hover-style" href="#">VAR</a></li>
                  <li><a class="grey-text text-lighten-3 hover-style" href="#">Trophy</a></li>
                  <li><a class="grey-text text-lighten-3 hover-style" href="#">Transfers</a></li>
                  <li><a class="grey-text text-lighten-3 hover-style" href="#">Photos</a></li>
                </ul>
              </div>
              <div class="col l2 s6">
                <h5 class="white-text">Sosial</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3" href="#"><span class="hover-style">Youtube</a></li>
                  <li><a class="grey-text text-lighten-3" href="#"><span class="hover-style">Facebook</a></li>
                  <li><a class="grey-text text-lighten-3" href="#"><span class="hover-style">Instagram</a></li>
                  <li><a class="grey-text text-lighten-3" href="#"><span class="hover-style">Twitter</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright purple darken-3">
            <div class="container">
            © 2020 English Premier League
            <a class="grey-text text-lighten-4 right hover-style" href="#">Privacy Policy</a>
            </div>
          </div>
      </footer>
    `;
  }

}

customElements.define("foot-bar", FootBar);
