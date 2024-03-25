import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.jpg" alt="Buildateam Logo" />
      </div>
      <div className="slogan">
        <h1 className="slogan-text">Shopify GraphQL Parser</h1>
      </div>
    </header>
  );
}

export default Header;