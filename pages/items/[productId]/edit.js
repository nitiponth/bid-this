import { useRouter } from "next/router";
import NoSideLayout from "../../../components/layout/no-sidebar-layout/no-sidebar-layout";
import EditItem from "../../../components/pages/single_item/edit-item";
function EditProduct() {
  const router = useRouter();
  const { productId } = router.query;
  return (
    <NoSideLayout height={"minheight"}>
      <EditItem prodId={productId} />
    </NoSideLayout>
  );
}

export default EditProduct;
