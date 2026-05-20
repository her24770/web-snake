import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

function Layout() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0c1324', color: '#dce1fb', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
