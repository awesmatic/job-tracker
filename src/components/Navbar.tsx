import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <h1 className="logo">Job Application Tracker</h1>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Navbar;
