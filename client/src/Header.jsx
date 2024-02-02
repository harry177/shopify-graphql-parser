import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="BaT-Logo-01.png" alt="Buildateam Logo" />
      </div>
      <div className="slogan">
        <h1 className="slogan-text">Buildateam, the Best Choice!</h1>
      </div>
    </header>
  );
}

export default Header;