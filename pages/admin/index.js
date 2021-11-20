import { observer } from "mobx-react-lite";
import AdminUserManagement from "../../components/layout/admin/content/adminUserManagement";

import AdminLayout from "../../components/layout/admin/adminLayout";
import { useAdminStore } from "../../store/admin-Content-Store";
import AdminProductManagement from "../../components/layout/admin/content/adminProductManagement";
import AdminReportManagement from "../../components/layout/admin/content/adminReportManagement";

function Admin() {
  const { contentState } = useAdminStore();
  return (
    <AdminLayout>
      {contentState === "USER" && <AdminUserManagement />}
      {contentState === "PRODUCT" && <AdminProductManagement />}
      {contentState === "REPORT" && <AdminReportManagement />}
    </AdminLayout>
  );
}

export default observer(Admin);
