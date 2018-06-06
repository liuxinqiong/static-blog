import React from 'react'
import Link from 'gatsby-link'
import './header.css'

const Header = ({ siteTitle }) => (
  <div className='header'>
    <div className="constr">
        <div className="nav">
            <h3 className="nav-list">
              <Link to="/" className="nav-a">{siteTitle}</Link>
            </h3>
            <h3 className="nav-list">
            	<Link to="/tags" className="nav-a">tags</Link>
            </h3>
            <h3 className="nav-list">
            	<Link to="/contact" className="nav-a">contact</Link>
            </h3>
            <h3 className="nav-list">
            	<Link to="/about" className="nav-a">about</Link>
            </h3>
        </div>
    </div>
  </div>
)

export default Header
