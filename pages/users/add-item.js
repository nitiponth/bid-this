import NoSideLayout from "../../components/layout/no-sidebar-layout/no-sidebar-layout";
import AddProduct from "../../components/pages/profile/add-product";

function AddItem() {
  return (
    <NoSideLayout height={"minheight"}>
      <AddProduct />
    </NoSideLayout>
  );
}

export default AddItem;
