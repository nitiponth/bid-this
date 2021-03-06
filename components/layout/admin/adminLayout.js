import AdminHeader from "./adminHeader";
import AdminSidebar from "./adminSidebar";

function AdminLayout(props) {
  return (
    <div className="adminContainer" style={{ backgroundColor: "whitesmoke" }}>
      <AdminHeader />
      <div className="admin__body">
        <AdminSidebar />
        {props.children}
      </div>
    </div>
  );
}

export default AdminLayout;
