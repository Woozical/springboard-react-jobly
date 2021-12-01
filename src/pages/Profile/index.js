import { useContext } from "react";
import EditProfileForm from "../../components/EditProfileForm";
import { useAuthenticated } from "../../hooks";
import UserContext from "../../UserContext";

const ProfilePage = () => {
  const [auth, redirect] = useAuthenticated("/login");
  const { currentUser, editUser } = useContext(UserContext);
  if (!auth) return redirect;

  return (
    <main className="pt-5 text-start">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h1>Profile</h1>
        <EditProfileForm submitCallback={editUser} currentUser={currentUser} />
      </div>
  </main>)
}

export default ProfilePage;