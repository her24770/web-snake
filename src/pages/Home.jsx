import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const mockTop3 = [
  { rank: 1, name: 'ACE', score: 4820 },
  { rank: 2, name: 'ZER', score: 3210 },
  { rank: 3, name: 'NXS', score: 2780 },
]

function Home() {
  const navigate = useNavigate()
  const [gridRef, setGridRef] = useState(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!gridRef) return
      const x = (window.innerWidth / 2 - e.pageX) / 100
      const y = (window.innerHeight / 2 - e.pageY) / 100
      gridRef.style.transform = `rotateX(${60 + y}deg) rotateZ(${x}deg) translateY(-200px)`
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [gridRef])

  const topPlayer = mockTop3[0]

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#0c1324', color: '#dce1fb' }}>

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="grid-bg grid-perspective" ref={setGridRef} style={{ opacity: 0.2 }}></div>
        <div className="scanline absolute inset-0" style={{ opacity: 0.3 }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: 800, height: 800, background: 'rgba(221,183,255,0.05)', filter: 'blur(120px)' }}></div>
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-center items-center px-12 h-16">
        <div className="flex items-center gap-12">
          <a className="text-xs tracking-widest font-bold border-b-2 pb-1 cursor-pointer" style={{ color: '#ddb7ff', borderColor: '#ddb7ff', fontFamily: 'JetBrains Mono' }}>HOME</a>
          <a className="text-xs tracking-widest cursor-pointer transition-colors hover:text-[#ddb7ff]" style={{ color: '#cfc2d6', fontFamily: 'JetBrains Mono' }} onClick={() => navigate('/play')}>PLAY</a>
          <a className="text-xs tracking-widest cursor-pointer transition-colors hover:text-[#ddb7ff]" style={{ color: '#cfc2d6', fontFamily: 'JetBrains Mono' }} onClick={() => navigate('/ranking')}>RANKING</a>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center select-none">
          <div className="relative inline-block mb-12">
            <h1
              className="hover-glitch font-extrabold tracking-tighter leading-none transition-all duration-300"
              style={{ fontSize: 'clamp(80px, 15vw, 200px)', color: '#ddb7ff', fontFamily: 'Space Grotesk' }}
            >
              SNAKE
            </h1>
            <div
              className="absolute -top-4 -right-4 px-3 py-1 font-bold text-xs rounded-sm transform rotate-12"
              style={{ backgroundColor: '#ddb7ff', color: '#490080', fontFamily: 'JetBrains Mono' }}
            >
              NANDEZ
            </div>
          </div>

          <div className="flex flex-col items-center gap-8">
            <button
              onClick={() => navigate('/play')}
              className="relative font-bold uppercase tracking-widest rounded-lg active:scale-95 transition-all duration-150 group"
              style={{ backgroundColor: '#ddb7ff', color: '#490080', fontFamily: 'Space Grotesk', fontSize: 22, padding: '20px 56px' }}
            >
              START GAME
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
            </button>

            <div className="flex items-center gap-12 py-4" style={{ opacity: 0.5 }}>
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.2em]" style={{ color: '#ddb7ff', fontFamily: 'JetBrains Mono' }}>High Score</p>
                <p className="text-3xl font-bold" style={{ fontFamily: 'Space Grotesk' }}>{topPlayer.score.toLocaleString()}</p>
              </div>
              <div className="w-px h-8" style={{ backgroundColor: '#2e3447' }}></div>
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.2em]" style={{ color: '#ddb7ff', fontFamily: 'JetBrains Mono' }}>Top Player</p>
                <p className="text-3xl font-bold" style={{ fontFamily: 'Space Grotesk' }}>{topPlayer.name}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Top 3 Ranking */}
      <section className="relative z-10" style={{ backgroundColor: '#070d1f', borderTop: '1px solid #2e3447', padding: '96px 24px' }}>
        <div style={{ maxWidth: 896, margin: '0 auto' }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#dce1fb' }}>Top 3</h2>
              <p className="text-xs mt-1" style={{ color: '#cfc2d6', fontFamily: 'JetBrains Mono' }}>Mejores puntajes registrados</p>
            </div>
            <button
              onClick={() => navigate('/ranking')}
              className="text-xs tracking-widest transition-colors hover:text-[#ddb7ff]"
              style={{ color: '#cfc2d6', fontFamily: 'JetBrains Mono' }}
            >
              VER TODO →
            </button>
          </div>

          {/* #1 — destacado */}
          <div
            className="flex items-center justify-between mb-3 rounded-xl"
            style={{
              background: 'linear-gradient(120deg, rgba(221,183,255,0.1) 0%, rgba(221,183,255,0.03) 100%)',
              border: '1px solid rgba(221,183,255,0.25)',
              boxShadow: '0 0 40px rgba(221,183,255,0.06)',
              padding: '24px 32px',
            }}
          >
            <div className="flex items-center gap-6">
              <span style={{ fontFamily: 'Space Grotesk', fontSize: 56, fontWeight: 900, color: '#ddb7ff', lineHeight: 1, opacity: 0.9 }}>1</span>
              <div>
                <p style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#ddb7ff', letterSpacing: '0.2em', marginBottom: 6 }}>PRIMER LUGAR</p>
                <p style={{ fontFamily: 'Space Grotesk', fontSize: 26, fontWeight: 700, color: '#dce1fb' }}>{mockTop3[0].name}</p>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#988d9f', letterSpacing: '0.15em', marginBottom: 6 }}>SCORE</p>
              <p style={{ fontFamily: 'Space Grotesk', fontSize: 36, fontWeight: 700, color: '#ddb7ff' }}>{mockTop3[0].score.toLocaleString()}</p>
            </div>
          </div>

          {/* #2 y #3 */}
          <div className="grid grid-cols-2 gap-3">
            {mockTop3.slice(1).map(entry => (
              <div
                key={entry.rank}
                className="flex items-center justify-between rounded-xl"
                style={{
                  backgroundColor: '#191f31',
                  border: '1px solid #2e3447',
                  padding: '18px 24px',
                }}
              >
                <div className="flex items-center gap-4">
                  <span style={{ fontFamily: 'Space Grotesk', fontSize: 32, fontWeight: 900, color: '#4d4354', lineHeight: 1 }}>{entry.rank}</span>
                  <p style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: '#cfc2d6' }}>{entry.name}</p>
                </div>
                <p style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700, color: '#dce1fb' }}>{entry.score.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instrucciones */}
      <section className="relative z-10" style={{ backgroundColor: '#0c1324', borderTop: '1px solid #2e3447', padding: '96px 24px' }}>
        <div style={{ maxWidth: 896, margin: '0 auto' }}>
          <div className="mb-8">
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#dce1fb' }}>Instrucciones</h2>
            <p className="text-xs mt-1" style={{ color: '#cfc2d6', fontFamily: 'JetBrains Mono' }}>Cómo jugar</p>
          </div>
          <div
            className="rounded-xl border border-dashed flex items-center justify-center py-20"
            style={{ borderColor: '#2e3447', backgroundColor: '#191f31' }}
          >
            <p className="text-sm tracking-widest" style={{ color: 'rgba(207,194,214,0.3)', fontFamily: 'JetBrains Mono' }}>
              // TODO: agregar instrucciones del juego
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10" style={{ backgroundColor: '#070d1f', borderTop: '1px solid #2e3447', padding: '20px 24px' }}>
        <div style={{ maxWidth: 896, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 14, letterSpacing: '0.1em', color: '#ddb7ff' }}>SNAKE</span>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#cfc2d6' }}>Josue Hernandez</p>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'rgba(207,194,214,0.3)', marginTop: 2 }}>© 2024 ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Home
