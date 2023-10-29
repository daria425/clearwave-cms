import MenuButton from "./Icons/MenuButton";
export default function Header({ isDesktop, handleSidebarOpen }) {
  return (
    <header className="header">
      {isDesktop ? <MenuButton handleSidebarOpen={handleSidebarOpen} /> : null}
      <h1 className="header--title">ClearWave</h1>
    </header>
  );
}
