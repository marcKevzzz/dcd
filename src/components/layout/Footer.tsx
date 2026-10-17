interface FooterProps {
  onOpenMenu: () => void
}

export function Footer({ onOpenMenu }: FooterProps) {
  return (
    <footer className="site-footer section-shell" id="contact">
      <div className="grid-12 footer-top">
        <p className="footer-claim">
          Got a brief that needs to move?{' '}
          <a href="mailto:hello@dcd.dev" className="link--inline accent">
            Let's talk.
          </a>
        </p>
        <div className="footer-col">
          <p className="note">Site</p>
          <ul>
            <li><a href="#work" className="link">Work</a></li>
            <li><a href="#services" className="link">Services</a></li>
            <li><a href="#approach" className="link">Approach</a></li>
            <li><a href="#team" className="link">Team</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <p className="note">Elsewhere</p>
          <ul>
            <li>
              <a href="https://github.com/marcKevzzz/dcd" target="_blank" rel="noopener noreferrer" className="link">
                GitHub <span className="arrow" aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a href="mailto:hello@dcd.dev" className="link">
                Direct Contact <span className="arrow" aria-hidden="true">↗</span>
              </a>
            </li>
            <li><a href="#home" className="link">Overview</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <p className="note">Contact</p>
          <ul>
            <li><a href="mailto:hello@dcd.dev" className="link">Send a brief</a></li>
            <li>
              <a href="mailto:hello@dcd.dev" className="link">
                Schedule intro <span className="arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-sign">
        <p className="footer-mark" aria-hidden="true">We Decide<span className="accent">.</span></p>
      </div>

      <div className="footer-bottom note">
        <p className="copy">
          <span>© 2026 dcd<span className="accent">.</span></span>
          <span>DECIDE &amp; DESIGN · CODE · DEPLOY</span>
        </p>
        <span className="hint">
          Press <kbd role="button" tabIndex={0} onClick={onOpenMenu} className="kbd-btn">⌘K</kbd> for quick navigation &amp; actions
        </span>
        <nav className="legal-links" aria-label="Legal">
          <a href="#home" className="link">Privacy</a>
          <a href="#home" className="link">Terms</a>
          <a href="#home" className="link">Accessibility</a>
        </nav>
      </div>
    </footer>
  )
}
