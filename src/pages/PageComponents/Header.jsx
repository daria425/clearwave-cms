import MenuButton from "./Icons/MenuButton";
export default function Header({ handleSidebarOpen }) {
  return (
    <header className="header">
      <MenuButton handleSidebarOpen={handleSidebarOpen} />
      <h1>ClearWave</h1>
    </header>
  );
}
