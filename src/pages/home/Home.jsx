import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Hero from '../../components/home/Hero'
import RankingPreview from '../../components/home/RankingPreview'
import Instructions from '../../components/home/Instructions'
import './Home.css'

function Home() {
  return (
    <div className="home-wrapper">
      <div className="home-bg">
        <div className="grid-bg grid-perspective" style={{ opacity: 0.2 }}></div>
        <div className="scanline" style={{ position: 'absolute', inset: 0, opacity: 0.3 }}></div>
        <div className="home-glow"></div>
      </div>

      <Nav />
      <Hero />
      <RankingPreview />
      <Instructions />
      <Footer />
    </div>
  )
}

export default Home
