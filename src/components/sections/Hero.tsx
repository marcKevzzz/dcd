import { Arrow } from '../common/Arrow'

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-title-ink">
            We Decide<span className="accent">.</span>
          </span>
          <span className="hero-title-wire" aria-hidden="true">
            We Decide<span className="accent">.</span>
          </span>
        </h1>
        <p className="hero-statement">
          <span className="hero-statement-text">
            Web &amp; systems engineering for creative agencies and enterprises, when the idea is hard to build.
          </span>
        </p>
        <div className="hero-telemetry mono">
          <span>
            <i className="dot" /> HUMAN / BUILT TOGETHER
          </span>
          <span>
            <i className="diamond" /> SYSTEM / DESIGNED TO CONNECT
          </span>
          <span className="telemetry-note">NO BLACK BOXES</span>
        </div>
        <div className="hero-bottom">
          <p>
            Four developers. From the first decision to deployment.
            <br /> We design and build systems that work together.
          </p>
          <div className="hero-actions flex gap-3">
            <a href="#work" className="button button-primary">
              See the systems <Arrow />
            </a>
            <a href="#team" className="button">
              Meet the collective <Arrow diagonal />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
