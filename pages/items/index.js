import Layout from "../../components/layout/layout";
import SingleItem from "../../components/pages/single_item/single_item";

const DUMMY_ITEMS = [
  {
    img: "/images/items/keyboard.jpg",
    title: "Keychron",
    seller: "gorgias",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mollis lorem neque, et rhoncus ex ornare sit amet. Nam posuere rhoncus purus, malesuada interdum orci molestie efficitur. Sed at dui elit. Suspendisse ultrices justo et ante varius pretium. Maecenas non.",
    resPrice: 1990,
    endTime: 1629115200000,
    watched: true,
  },
];
function SingleItemPage() {
  return (
    <Layout>
      <SingleItem item={DUMMY_ITEMS[0]} />
    </Layout>
  );
}

export default SingleItemPage;
