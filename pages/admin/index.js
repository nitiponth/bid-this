import { observer } from "mobx-react-lite";

import AdminLayout from "../../components/layout/admin/adminLayout";
import { useAdminStore } from "../../store/admin-Content-Store";
import AdminUserManagement from "../../components/layout/admin/content/userManagement/adminUserManagement";
import AdminProductManagement from "../../components/layout/admin/content/productManagement/adminProductManagement";
import AdminReportManagement from "../../components/layout/admin/content/reportManagement/adminReportManagement";
import AdminUserDetial from "../../components/layout/admin/content/userManagement/adminUserManagementDetail";

function Admin() {
  const { contentState, userId } = useAdminStore();
  return (
    <div className="adminPage">
      <AdminLayout>
        {contentState === "USER" && <AdminUserManagement />}
        {contentState === "PRODUCT" && <AdminProductManagement />}
        {contentState === "REPORT" && <AdminReportManagement />}
        {contentState === "USER_DETAIL" && <AdminUserDetial userId={userId} />}
      </AdminLayout>
    </div>
  );
}

export default observer(Admin);
