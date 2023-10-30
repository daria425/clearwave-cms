import SideBarNavLinks from "./SideBarNavLinks";
import Profile from "./Profile";
import Overlay from "../Overlay";
export default function SideBarNav({
  sidebarOpen,
  handleSidebarClose,
  dimensions,
}) {
  if (dimensions.width > dimensions.breakpoint) {
    return (
      <>
        <nav className="sidebar" style={{ width: "250px" }}>
          <Profile dimensions={dimensions} />
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
          <Profile
            dimensions={dimensions}
            handleSidebarClose={handleSidebarClose}
          />
          <SideBarNavLinks />
        </nav>
        {sidebarOpen ? <Overlay /> : null}
      </>
    );
}

//if not on mobile show overlay and set sidebar open always true.
