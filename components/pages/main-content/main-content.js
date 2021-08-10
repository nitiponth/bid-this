import ItemCard from "./item_card";
import ItemHero from "./item_hero";

const DUMMY_ITEMS = [
  {
    img: "/images/items/model1.jpg",
    title: "Luffy Samurai",
    seller: "johndoe",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis metus quis nibh sodales consectetur ac id turpis. Nulla nec facilisis libero, a fermentum arcu. Nullam mollis lacus varius erat pulvinar mattis. Vestibulum congue hendrerit nunc id suscipit. Nullam fermentum.",
    resPrice: 500,
    hour: 0,
    min: 52,
    sec: 12,
    watched: true,
  },
  {
    img: "/images/items/item2.jpg",
    title: "Skateboard",
    seller: "oliver",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a consectetur ligula. In varius magna ac sapien dapibus, vehicula finibus felis mollis. Morbi ac enim dignissim, semper risus ut, dictum ligula. Proin nisl elit, laoreet non fermentum ac, posuere sed leo. Praesent maximus ac est mattis convallis. Aliquam erat volutpat.",
    resPrice: 1000,
    hour: 1,
    min: 18,
    sec: 11,
    watched: false,
  },
  {
    img: "/images/items/item3.jpg",
    title: "Macintosh ED",
    seller: "PabloMartinez",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consectetur sed justo non aliquam. Phasellus quam felis, fermentum condimentum lectus sed, iaculis tempus risus. Sed id pellentesque metus. Nullam sagittis",
    resPrice: 3000,
    hour: 3,
    min: 12,
    sec: 16,
    watched: false,
  },
  {
    img: "/images/items/model4.jpg",
    title: "Gibson Les Paul",
    seller: "NeonBRAND",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia nisl a commodo pulvinar. Integer dapibus vestibulum egestas. Mauris sed faucibus quam. Donec congue urna eu iaculis pharetra. Maecenas dui.",
    resPrice: 10000,
    hour: 6,
    min: 59,
    sec: 55,
    watched: false,
  },
  {
    img: "/images/items/model5.jpg",
    title: "NIKE Off-Whie",
    seller: "ChrisHenry",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non nisl dapibus, volutpat est non, vestibulum augue. Pellentesque sed ante vestibulum leo convallis mattis sit amet facilisis mi. Duis non ipsum vitae nisi volutpat dictum.",
    resPrice: 4888,
    hour: 0,
    min: 12,
    sec: 9,
    watched: true,
  },
  {
    img: "/images/items/keyboard.jpg",
    title: "Keychron",
    seller: "gorgias",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mollis lorem neque, et rhoncus ex ornare sit amet. Nam posuere rhoncus purus, malesuada interdum orci molestie efficitur. Sed at dui elit. Suspendisse ultrices justo et ante varius pretium. Maecenas non.",
    resPrice: 1990,
    hour: 2,
    min: 11,
    sec: 32,
    watched: true,
  },
];

function MainContent() {
  return (
    <div className="main-content">
      <div className="main-content__hero">
        <ItemHero item={DUMMY_ITEMS[5]} />
      </div>
      <ItemCard item={DUMMY_ITEMS[0]} />
      <ItemCard item={DUMMY_ITEMS[1]} />
      <ItemCard item={DUMMY_ITEMS[2]} />
      <ItemCard item={DUMMY_ITEMS[3]} />
      <ItemCard item={DUMMY_ITEMS[4]} />
    </div>
  );
}

export default MainContent;