import './App.css'

function App() {
  return (
    <main className="container py-5">
      <section className="row align-items-center g-4">
        <div className="col-lg-7">
          <p className="text-uppercase fw-semibold text-primary mb-3">OctoFit Tracker</p>
          <h1 className="display-4 fw-bold mb-3">Modern fitness tracking for teams and individuals.</h1>
          <p className="lead text-muted mb-4">
            Log activities, monitor progress, and keep every workout goal visible in one place.
          </p>
          <div className="d-flex gap-3">
            <a className="btn btn-primary btn-lg" href="#features">Explore features</a>
            <a className="btn btn-outline-secondary btn-lg" href="#api">API health</a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="h4 fw-semibold">Ready for multi-tier growth</h2>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item px-0">React 19 + Vite frontend</li>
                <li className="list-group-item px-0">Express + TypeScript API</li>
                <li className="list-group-item px-0">MongoDB + Mongoose data access</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="row mt-5 g-4">
        <div className="col-md-4">
          <div className="p-4 border rounded-3 h-100">
            <h3 className="h5">Workout logging</h3>
            <p className="text-muted mb-0">Capture sessions and compare trends over time.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 border rounded-3 h-100">
            <h3 className="h5">Team challenges</h3>
            <p className="text-muted mb-0">Create friendly competitions with a shared leaderboard.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 border rounded-3 h-100">
            <h3 className="h5">Smart suggestions</h3>
            <p className="text-muted mb-0">Surface personal guidance for future progress.</p>
          </div>
        </div>
      </section>

      <section id="api" className="mt-5">
        <p className="text-muted">Backend API is available at port 8000 with a health endpoint.</p>
      </section>
    </main>
  )
}

export default App
