import { Fragment, useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

function BCarousel(props) {
  const { items, configSize } = props;

  const [current, setCurrent] = useState(0);
  const length = items.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(items) || items.length <= 0) {
    return <div className="glabel">Somethings went wrong!</div>;
  }

  let slideClasses = "slide";
  let sliderClasses = "slider";
  if (configSize === "small") {
    slideClasses = "slide slide--small";
    sliderClasses = "slider slider--small";
  }

  return (
    <div className={sliderClasses}>
      {length !== 1 && (
        <Fragment>
          {configSize === "small" ? (
            <FaArrowAltCircleLeft
              className="slider__left-arrow"
              style={{ fontSize: "2rem", left: "4rem" }}
              onClick={prevSlide}
            />
          ) : (
            <FaArrowAltCircleLeft
              className="slider__left-arrow"
              onClick={prevSlide}
            />
          )}
          {configSize === "small" ? (
            <FaArrowAltCircleRight
              className="slider__right-arrow"
              style={{ fontSize: "2rem", right: "4rem" }}
              onClick={nextSlide}
            />
          ) : (
            <FaArrowAltCircleRight
              className="slider__right-arrow"
              onClick={nextSlide}
            />
          )}
        </Fragment>
      )}
      {items.map((item, index) => {
        return (
          <div
            className={
              index === current ? `${slideClasses} active` : slideClasses
            }
            key={index}
          >
            {index === current && (
              <img src={item} alt={"img"} className="slider__img" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default BCarousel;
