import MenuButton from "./Icons/MenuButton";
export default function Header({ dimensions, handleSidebarOpen }) {
  return (
    <header className="header">
      {dimensions.width < dimensions.breakpoint ? (
        <MenuButton handleSidebarOpen={handleSidebarOpen} />
      ) : null}
      <h1 className="header--title">ClearWave</h1>
    </header>
  );
}
