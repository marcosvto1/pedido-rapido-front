import { Outlet } from "react-router-dom";
import LayoutAdmin from "../../components/Admin/Layout";

const AdminPage = () => {
  return <>
    <LayoutAdmin>
      <Outlet />

    </LayoutAdmin>
  </>
}

export default AdminPage;