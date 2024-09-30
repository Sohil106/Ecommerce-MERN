import Navbar from "../../features/navbar/Navbar";
import UserProfile from "../../features/user/components/UserProfile";

const UserProfilePage = () => {
  return (
    <div>
      <Navbar>
        <h1 className="text-2xl">My Profile</h1>
        <UserProfile />
      </Navbar>
    </div>
  );
};

export default UserProfilePage;
