import React from 'react'

const Header = () => {
  return (
    <div style={{position:"fixed", zIndex:"999999", width:"100vw"}}>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark px-5">
            <a className="navbar-brand text-info" href="#"><img height={40} width={40} src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png" alt="" /> openWeather</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav" style={{marginLeft:"73%"}}>
                <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link text-light" style={{fontSize:"1vw"}} href="#">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-light" href="https://www.google.com/search?q=Forcost&oq=Forcost&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDExMTJqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8" target="_blank" style={{fontSize:"1vw"}} >Forecast</a>
                </li>
                <li className="nav-item">
                <a className="nav-link text-light" href="https://blog.worldweatheronline.com/" target="_blank" style={{fontSize:"1vw"}} >News & Blog</a>
            </li>
        </ul>
  </div>
</nav>
    </div>
  )
}

export default Header
