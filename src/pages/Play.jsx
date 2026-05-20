import Nav from '../components/Nav'
import Footer from '../components/Footer'

function Play() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0c1324', color: '#dce1fb', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <main style={{ flex: 1, paddingTop: 64 }}>
      </main>
      <Footer />
    </div>
  )
}

export default Play
