import { observer } from "mobx-react-lite";

import AdminLayout from "../../components/layout/admin/adminLayout";
import { useAdminStore } from "../../store/admin-Content-Store";
import AdminUserManagement from "../../components/layout/admin/content/userManagement/adminUserManagement";
import AdminProductManagement from "../../components/layout/admin/content/productManagement/adminProductManagement";
import AdminReportManagement from "../../components/layout/admin/content/reportManagement/adminReportManagement";
import AdminUserDetial from "../../components/layout/admin/content/userManagement/adminUserManagementDetail";
import AdminProductDetail from "../../components/layout/admin/content/productManagement/detail/adminProductDetail";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import { useRouter } from "next/router";
import AdminReportProduct from "../../components/layout/admin/content/reportManagement/adminReportProduct";

function Admin() {
  const router = useRouter();

  const { contentState, userId, productId, reportId } = useAdminStore();
  const authCtx = useContext(AuthContext);

  const { isLogin, user } = authCtx;

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!isLogin || user.role !== "ADMIN") {
      router.push("/");
    }
    if (user.role === "ADMIN") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [isLogin, user]);

  return (
    <div className="adminPage">
      {isAdmin ? (
        <AdminLayout>
          {contentState === "USER" && <AdminUserManagement />}
          {contentState === "PRODUCT" && <AdminProductManagement />}
          {contentState === "REPORT" && <AdminReportManagement />}
          {contentState === "USER_DETAIL" && (
            <AdminUserDetial userId={userId} />
          )}
          {contentState === "PRODUCT_DETAIL" && (
            <AdminProductDetail productId={productId} />
          )}
          {contentState === "PRODUCT_REPORT_DETAIL" && (
            <AdminReportProduct reportId={reportId} />
          )}
        </AdminLayout>
      ) : (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading...
        </div>
      )}
    </div>
  );
}

export default observer(Admin);
