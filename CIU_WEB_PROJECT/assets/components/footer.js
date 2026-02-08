
class Footer extends HTMLElement {
	connectedCallback() {
	  this.innerHTML = `
		<footer class="footer">
			<div class="container">
				<div class="footer_inner">
				
					<section class="footer_section">
						<h2 class="section__title">Our Team</h2>
						<ul class="section__item">
							<li><span>Nikolai Piatnov</span> // Team Lead & Frontend Developer</li>
							<li><span>Maksim Kalmykov</span> // Full Stack Developer</li>
							<li><span>Ruslan Zhunusbaev</span> // Frontend Developer</li>
						</ul>
					</section>

					<section class="footer_section">
						<h2 class="section__title">Navigation</h2>
						<ul class="section__item">
							<li><a href="home.html">Home Page</a></li>
							<li><a href="index.html">Online Shopping</a></li>
							<li><a href="calculate.html">Calculate Page</a></li>
							<li><a href="contact.html">Contact us</a></li>
						</ul>
					</section>

					<section class="footer__section">
						<h2 class="section__title">Statistics</h2>
						<ul class="section__item">
							<li><span>GitHub:</span> 100+ commits</li>
							<li><span>Kanban:</span> 85 tasks</li>
							<li><span>Time:</span> 14 days</li>
						</ul>
					</section>
					
					<section class="footer__section">
						<h2 class="section__title">Stack</h2>
						<ul class="section__item">
							<li><span>Frontend:</span> HTML, CSS, JavaScript (NO Frameworks)</li>
							<li><span>Backend:</span> Java, Spring, PostgreSQL / h2SQL</li>
							<li><span>Technologies:</span> Git, GitHub, Scrum, Kanban Board</li>
						</ul>
					</section>				
				</div>
				<span class="footer__copyrights">© 2025 Shopping Hunter (CIU Web-Project for CMPE233)</span>
			</div>
		</footer>
	  `;
	}
}

customElements.define('footer-component', Footer);