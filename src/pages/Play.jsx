import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Game from '../game/Game'

function Play() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0c1324', color: '#dce1fb', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 48px' }}>
        <Game />
      </main>
      <Footer />
    </div>
  )
}

export default Play
