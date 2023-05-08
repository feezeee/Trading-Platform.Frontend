import API_URLS from "../../core/apiUrls";
import CarouselImage from "../carousel_image/CarouselImage";
import { GetFullUserEntity } from "../../core/entities/user/GetFullUserEntity";
import React from "react";

export interface IProfileInfProps {
  user: GetFullUserEntity;
  countOfProducts: number;
}

const ProfileInf: React.FunctionComponent<IProfileInfProps> = (props) => {
  return (
    <div className="d-flex flex-column h-100">
      <div className="row">
        <div className="col-auto">
          <div className="d-flex flex-column justify-content-center">
            <CarouselImage
              width={500}
              height={600}
              onChangeCarouselIndex={() => {}}
              autoPlay={false}
              carouselIndex={0}
              imageUrlArr={
                props.user.profileImageUrl === null
                  ? []
                  : [
                      API_URLS.REACT_APP_IMAGES_API_URL +
                        props.user.profileImageUrl,
                    ]
              }
            />
          </div>
        </div>
        <div className="col">
          <div className="row">
            <p className="text-break">
              <strong>
                {props.user.lastName + " " + props.user.firstName}
              </strong>
            </p>
          </div>
          <div className="row">
            <div>
              <span>Псевдоним: </span>
              <strong>{props.user.nickname}</strong>
            </div>
          </div>
          <div className="row">
            <div>
              <span>Дата регистрации: </span>
              <strong>
                {props.user.registrationDate.toLocaleString("ru-Ru", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </strong>
            </div>
          </div>
          <div className="row">
            <div className="w-100">
              <span>Количество размещенных объявлений: </span>
              <strong>{props.countOfProducts}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileInf;
