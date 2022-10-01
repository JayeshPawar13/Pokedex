import './Header.scss';

const Header = () => {
  return (
    <>
      <div className="header-container-desktop">
        <span className="header-title">Pokémon</span>
        <span className="vertical-line"></span>
        <span className="header-subtitle">
          Search for any Pokémon that exists on the planet
        </span>
      </div>
      <div className="header-container-mobile">
        <span className="header-title">Pokémon</span>
        <hr />
        <span className="header-subtitle">
          Search for any Pokémon that exists on the planet
        </span>
      </div>
    </>
  );
};

export default Header;
