import NoSideLayout from "../../components/layout/no-sidebar-layout/no-sidebar-layout";
import EditProfile from "../../components/pages/profile/edit-profile";

function EditPages() {
  return (
    <NoSideLayout height={"minheight"}>
      <EditProfile />
    </NoSideLayout>
  );
}

export default EditPages;
