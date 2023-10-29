import SideBarNavLinks from "./SideBarNavLinks";
import Profile from "./Profile";
import Overlay from "../Overlay";
export default function SideBarNav({ isDesktop, sidebarOpen }) {
  if (isDesktop) {
    return (
      <>
        <nav className="sidebar" style={{ width: "250px" }}>
          <Profile />
          <SideBarNavLinks />
        </nav>
      </>
    );
  } else
    return (
      <>
        <nav
          className="sidebar"
          style={{ width: sidebarOpen ? "250px" : "0px" }}
        >
          <Profile />
          <SideBarNavLinks />
        </nav>
        {sidebarOpen ? <Overlay /> : null}
      </>
    );
}

//if not on mobile show overlay and set sidebar open always true.
