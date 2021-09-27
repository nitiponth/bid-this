import { useRouter } from "next/router";
import { useQuery, gql, useSubscription } from "@apollo/client";
import ItemCard from "./item_card";
import ItemHero from "./item_hero";

const DUMMY_ITEMS = [
  {
    img: "/images/items/keyboard.jpg",
    title: "Keychron",
    seller: "piterpasma",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mollis lorem neque, et rhoncus ex ornare sit amet. Nam posuere rhoncus purus, malesuada interdum orci molestie efficitur. Sed at dui elit. Suspendisse ultrices justo et ante varius pretium. Maecenas non.",
    resPrice: 1900,
    endTime: 1630060200000,
    category: "electronics",

    watched: true,
  },

  {
    img: "/images/items/item2.jpg",
    title: "Skateboard",
    seller: "oliver",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a consectetur ligula. In varius magna ac sapien dapibus, vehicula finibus felis mollis. Morbi ac enim dignissim, semper risus ut, dictum ligula. Proin nisl elit, laoreet non fermentum ac, posuere sed leo. Praesent maximus ac est mattis convallis. Aliquam erat volutpat.",
    resPrice: 1000,
    endTime: 1630062000000,
    category: "others",

    watched: false,
  },
  {
    img: "/images/items/item3.jpg",
    title: "Macintosh ED",
    seller: "PabloMartinez",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consectetur sed justo non aliquam. Phasellus quam felis, fermentum condimentum lectus sed, iaculis tempus risus. Sed id pellentesque metus. Nullam sagittis",
    resPrice: 3000,
    endTime: 1630067400000,
    category: "electronics",

    watched: false,
  },
  {
    img: "/images/items/model4.jpg",
    title: "Gibson Les Paul",
    seller: "NeonBRAND",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia nisl a commodo pulvinar. Integer dapibus vestibulum egestas. Mauris sed faucibus quam. Donec congue urna eu iaculis pharetra. Maecenas dui.",
    resPrice: 10000,
    endTime: 1630069200000,
    category: "others",

    watched: false,
  },
  {
    img: "/images/items/model5.jpg",
    title: "NIKE Off-Whie",
    seller: "ChrisHenry",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non nisl dapibus, volutpat est non, vestibulum augue. Pellentesque sed ante vestibulum leo convallis mattis sit amet facilisis mi. Duis non ipsum vitae nisi volutpat dictum.",
    resPrice: 4888,
    endTime: 1630072799000,
    category: "clothing",

    watched: true,
  },
  {
    img: "/images/items/model1.jpg",
    title: "Luffy Samurai",
    seller: "johndoe",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis metus quis nibh sodales consectetur ac id turpis. Nulla nec facilisis libero, a fermentum arcu. Nullam mollis lacus varius erat pulvinar mattis. Vestibulum congue hendrerit nunc id suscipit. Nullam fermentum.",
    resPrice: 500,
    endTime: 1630076400000,
    category: "figures",
    watched: true,
  },
];

const QUERY = gql`
  query {
    getProducts {
      id
      title
      desc
      start
      end
      price {
        initial
        current
      }
      seller {
        username
      }
    }
  }
`;

function MainContent() {
  const router = useRouter();
  const { cate } = router.query;

  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const products = data.getProducts
    .filter((product) => product.end > new Date().toLocaleString("en-US"))
    .map((product) => {
      return {
        key: product.id,
        productId: product.id,
        title: product.title,
        img: "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
        desc: product.desc,
        price: product.price.initial,
        lastPrice: product.price.current,
        endTime: product.end,
        seller: product.seller.username,
      };
    });

  let filteredItems = products;

  if (filteredItems.length === 0) {
    return (
      <div className="main-content">
        {!cate && (
          <div className="main-content__hero">
            <p style={{ textAlign: "center" }}>No product for auction</p>
          </div>
        )}
      </div>
    );
  }

  if (cate) {
    filteredItems = DUMMY_ITEMS.filter((item) => item.category === cate);
  }
  // if (cate === "watchlists") {
  //   filteredItems = DUMMY_ITEMS.filter((item) => item.watched);
  //   console.log(filteredItems);
  // }
  // const itemLists = filteredItems
  //   .slice(1, filteredItems.length - 1)
  //   .map((product) => <ItemCard item={product} />);

  let itemLists = filteredItems
    .slice(1, filteredItems.length)
    .map((product) => <ItemCard item={product} />);
  if (cate) {
    itemLists = filteredItems.map((product) => <ItemCard item={product} />);
  }

  return (
    <div className="main-content">
      {!cate && (
        <div className="main-content__hero">
          <ItemHero item={filteredItems[0]} />
        </div>
      )}

      {itemLists}
    </div>
  );
}

export default MainContent;
