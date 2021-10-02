import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import NoSideLayout from "../../components/layout/no-sidebar-layout/no-sidebar-layout";
import AddProduct from "../../components/pages/profile/add-product";
import AuthContext from "../../store/auth-context";

function AddItem() {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    if (!authCtx.isLogin) {
      router.push("/");
    } else {
      setIsLoad(false);
    }
  });

  if (isLoad) {
    return <div></div>; //show nothing or a loader
  }

  return (
    <NoSideLayout height={"minheight"}>
      <AddProduct />
    </NoSideLayout>
  );
}

export default AddItem;
