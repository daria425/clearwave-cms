import { useContext } from "react";
import { loginContext } from "../../../App";
import ProfileIcon from "../Icons/ProfileIcon";
export default function Profile() {
  const { user } = useContext(loginContext);
  return (
    <section className="sidebar--profile">
      <ProfileIcon />
      <p className="sidebar--profile--fullname">
        {user.first_name} {user.last_name}
      </p>
      <p className="sidebar--profile--username">@{user.username}</p>
      <p className="sidebar--profile--email">{user.email}</p>
    </section>
  );
}
