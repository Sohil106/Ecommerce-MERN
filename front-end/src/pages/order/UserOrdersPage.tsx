
import UserOrders from "../../features/user/components/UserOrders";
import Navbar from "../../features/navbar/Navbar";

const UserOrdersPage = () => {
  return (
    <div>
      <Navbar>
        <h1 className="text-2xl">My Orders</h1>
        <UserOrders />
      </Navbar>
    </div>
  );
};

export default UserOrdersPage;
