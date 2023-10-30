import { useContext } from "react";
import { loginContext } from "../../../App";
import ProfileIcon from "../Icons/ProfileIcon";
import CloseButton from "../Icons/CloseButton";
import LogoutBtn from "./LogoutBtn";
export default function Profile({ handleSidebarClose, dimensions }) {
  const { user } = useContext(loginContext);
  return (
    <section className="sidebar--profile">
      <div className="sidebar--icons">
        <ProfileIcon />
        {dimensions.width < dimensions.breakpoint ? (
          <CloseButton handleSidebarClose={handleSidebarClose} />
        ) : null}
      </div>
      <p className="sidebar--profile--fullname">
        {user.first_name} {user.last_name}
      </p>
      <p className="sidebar--profile--username">@{user.username}</p>
      <p className="sidebar--profile--email">{user.email}</p>
      <LogoutBtn />
    </section>
  );
}
