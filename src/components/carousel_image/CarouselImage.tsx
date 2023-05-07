import { Carousel } from "react-responsive-carousel";
import NoImage from "../../images/noImage.png";

interface ICarouselImageProps {
  imageUrlArr: string[];
  autoPlay: boolean;
  carouselIndex: number;
  onChangeCarouselIndex: (index: number) => void;
}

function CarouselImage({
  imageUrlArr,
  autoPlay,
  carouselIndex,
  onChangeCarouselIndex,
}: ICarouselImageProps) {
  return (
    <div className="d-flex justify-content-center">
      <div style={{ width: 500 }}>
        <Carousel
          selectedItem={carouselIndex}
          autoPlay={autoPlay}
          dynamicHeight={false}
          showStatus={false}
          showArrows={imageUrlArr.length > 0 ? true : false}
          infiniteLoop={true}
          showThumbs={imageUrlArr.length > 0 ? true : false}
          showIndicators={imageUrlArr.length > 0 ? true : false}
          onChange={onChangeCarouselIndex}
        >
          {imageUrlArr.length > 0
            ? imageUrlArr.map((url, index) => (
                <div
                  key={url + index}
                  className="d-flex "
                  style={{ height: 600 }}
                >
                  <img
                    className="object-fit-contain rounded"
                    src={url}
                    alt=""
                    onError={(event) => {
                      event.currentTarget.src = NoImage;
                    }}
                  />
                </div>
              ))
            : [
                <div
                  key={NoImage + 0}
                  className="d-flex"
                  style={{ height: 600 }}
                >
                  <img
                    className="object-fit-contain rounded"
                    src={NoImage}
                    alt=""
                    onError={(event) => {
                      event.currentTarget.src = NoImage;
                    }}
                  />
                </div>,
              ]}
        </Carousel>
      </div>
    </div>
  );
}

export default CarouselImage;
