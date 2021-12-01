import { useContext } from "react";
import EditProfileForm from "../../components/EditProfileForm";
import { useAuthenticated } from "../../hooks";
import UserContext from "../../UserContext";

const ProfilePage = () => {
  const [auth, redirect] = useAuthenticated("/login");
  const { currentUser, editUser } = useContext(UserContext);
  if (!auth) return redirect;

  return (
  <main>
    <h1>Profile</h1>
    <EditProfileForm submitCallback={editUser} currentUser={currentUser} />
  </main>)
}

export default ProfilePage;