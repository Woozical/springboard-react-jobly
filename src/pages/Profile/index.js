import Placeholder from "../../components/placeholder";
import { useAuthenticated } from "../../hooks";

const ProfilePage = () => {
  const [auth, redirect] = useAuthenticated("/login");
  if (!auth) return redirect;

  return <Placeholder text="Profile Page" />;
}

export default ProfilePage;