import { useRouter } from "next/dist/client/router";
import { Fragment } from "react";
import AuctionDropdownItem from "./auction-dropdown-item";

const DUMMY_ITEMS = [
  {
    img: "/images/items/keyboard.jpg",
    title: "Keychron",
    seller: "gorgias",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mollis lorem neque, et rhoncus ex ornare sit amet. Nam posuere rhoncus purus, malesuada interdum orci molestie efficitur. Sed at dui elit. Suspendisse ultrices justo et ante varius pretium. Maecenas non.",
    resPrice: 1990,
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

function AuctionDropdown(props) {
  const router = useRouter();
  const toItemPage = () => {
    router.push("/items");
  };

  return (
    <Fragment>
      <div className="user-dropdown user-dropdown--auction">
        <AuctionDropdownItem
          auctionImg={DUMMY_ITEMS[0].img}
          auctionTime={DUMMY_ITEMS[0].endTime}
          onClickHandler={toItemPage}
        >
          {DUMMY_ITEMS[0].title}
        </AuctionDropdownItem>
        <AuctionDropdownItem
          auctionImg={DUMMY_ITEMS[4].img}
          auctionTime={DUMMY_ITEMS[4].endTime}
          onClickHandler={toItemPage}
        >
          {DUMMY_ITEMS[4].title}
        </AuctionDropdownItem>
      </div>
    </Fragment>
  );
}

export default AuctionDropdown;
