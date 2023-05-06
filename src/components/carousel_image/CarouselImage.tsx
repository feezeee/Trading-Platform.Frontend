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
          showArrows={true}
          infiniteLoop={true}
          onChange={onChangeCarouselIndex}
        >
          {imageUrlArr.length > 0
            ? imageUrlArr.map((url, index) => (
                <div
                  key={url + index}
                  className="rounded overflow-hidden"
                  style={{ maxHeight: 600 }}
                >
                  <img
                    className="h-100"
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
                  className="rounded overflow-hidden"
                  style={{ maxHeight: 600 }}
                >
                  <img
                    className="h-100"
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
