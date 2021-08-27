import Layout from "../../components/layout/layout";
import SingleItem from "../../components/pages/single_item/single_item";

const DUMMY_ITEMS = [
  {
    images: [
      { uri: "/images/items/keyboard.jpg" },
      { uri: "/images/items/keyboard2.jpg" },
      { uri: "/images/items/keyboard3.jpg" },
      { uri: "/images/items/keyboard4.jpg" },
    ],
    title: "Keychron",
    seller: "piterpasma",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mollis lorem neque, et rhoncus ex ornare sit amet. Nam posuere rhoncus purus, malesuada interdum orci molestie efficitur. Sed at dui elit. Suspendisse ultrices justo et ante varius pretium. Maecenas non.",
    resPrice: 1900,
    endTime: 1630060200000,
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
