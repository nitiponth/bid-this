import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import NoSideLayout from "../../components/layout/no-sidebar-layout/no-sidebar-layout";
import EditProfile from "../../components/pages/profile/edit-profile";

import AuthContext from "../../store/auth-context";

function EditPages() {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
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
      <EditProfile />
    </NoSideLayout>
  );
}

export default EditPages;
