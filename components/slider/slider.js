import { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

function Slider(props) {
  const { items } = props;

  const [current, setCurrent] = useState(0);
  const length = items.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  //   console.log(current);

  if (!Array.isArray(items) || items.length <= 0) {
    return <div className="glabel">Somethings went wrong!</div>;
  }

  return (
    <div className="slider">
      <FaArrowAltCircleLeft
        className="slider__left-arrow"
        onClick={prevSlide}
      />
      <FaArrowAltCircleRight
        className="slider__right-arrow"
        onClick={nextSlide}
      />
      {items.map((item, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <img src={item.uri} alt={"img"} className="slider__img" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Slider;
