import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import NoSideLayout from "../../components/layout/no-sidebar-layout/no-sidebar-layout";
import AddProduct from "../../components/pages/profile/add-product";
import AuthContext from "../../store/auth-context";

const ME_CHECK = gql`
  query {
    me {
      id
    }
  }
`;

function AddItem() {
  const router = useRouter();

  const { data, loading, error } = useQuery(ME_CHECK, {
    ssr: false,
  });

  useEffect(() => {
    if (loading === false && error) {
      router.push("/");
    }
  }, [data, loading]);

  return (
    <NoSideLayout height={"minheight"}>
      <AddProduct />
    </NoSideLayout>
  );
}

export default AddItem;
