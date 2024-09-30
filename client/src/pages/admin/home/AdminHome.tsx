import AdminProductList from "../../../features/admin/components/AdminProductList";
import Navbar from "../../../features/navbar/Navbar";

const AdminHome = () => {
  return (
    <div>
      <Navbar>
        <AdminProductList />
      </Navbar>
    </div>
  );
};

export default AdminHome;
