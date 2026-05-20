import { NavLink } from 'react-router-dom'
import './Nav.css'

function Nav() {
  const linkClass = ({ isActive }) => 'nav-link' + (isActive ? ' active' : '')

  return (
    <nav className="nav">
      <div className="nav-links">
        <NavLink to="/" end className={linkClass}>HOME</NavLink>
        <NavLink to="/play" className={linkClass}>PLAY</NavLink>
        <NavLink to="/ranking" className={linkClass}>RANKING</NavLink>
      </div>
    </nav>
  )
}

export default Nav
