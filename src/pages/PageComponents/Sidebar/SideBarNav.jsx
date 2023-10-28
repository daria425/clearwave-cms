import SideBarNavLinks from "./SideBarNavLinks";
import Profile from "./Profile";
import Overlay from "../Overlay";
export default function SideBarNav({ sidebarOpen }) {
  return (
    <>
      <nav className="sidebar" style={{ width: sidebarOpen ? "250px" : "0px" }}>
        <Profile />
        <SideBarNavLinks />
      </nav>
      {sidebarOpen ? <Overlay /> : null}
    </>
  );
}
