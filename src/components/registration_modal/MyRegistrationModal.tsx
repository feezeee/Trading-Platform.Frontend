// import * as bootstrap from "bootstrap";

import React, { useEffect, useRef, useState } from "react";

import CarouselImage from "../carousel_image/CarouselImage";
import { CreateUserEntity } from "../../core/entities/user/CreateUserEntity";
import { GetImageEntity } from "../../core/entities/image/GetImageEntity";
import { ImageService } from "../../core/services/ImageService";
import { Modal } from "react-bootstrap";
import NoImage from "../../images/noImage.png";
import { UserService } from "../../core/services/UserService";
import localStorageKeys from "../../core/localStorageKeys";

export interface IMyRegistrationModalProps {
  modalShow: boolean;
  hideModal: () => void;
}

interface FormValues {
  registrationFirstName: string;
  registrationLastName: string;
  registrationNickname: string;
  registrationPassword: string;
  registrationImageUrl: string | null;
}

const MyRegistrationModal: React.FunctionComponent<
  IMyRegistrationModalProps
> = (props) => {
  const [formValues, setFormValues] = useState<FormValues>({
    registrationFirstName: "",
    registrationLastName: "",
    registrationNickname: "",
    registrationPassword: "",
    registrationImageUrl: null,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setDataIncorrect(false);
  };

  const [registrationProcessIsStarted, setRegistrationProcessIsStarted] =
    useState(false);

  const [dataIncorrect, setDataIncorrect] = useState(false);

  const [currentImageUrl, setCurrenImageUrl] = useState<string>(NoImage);
  const [currentImage, setCurrentImage] = useState<File | null>(null);

  const [imageExist, setImageExist] = useState(false);

  const [nicknameIsFree, setNicknameIsFree] = useState<boolean | null>(null);

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    setCurrentImage(selectedFiles?.[0]);
    setCurrenImageUrl(URL.createObjectURL(selectedFiles?.[0]));
    setImageExist(true);
  };

  const clearImage = () => {
    (document.getElementById("loadedFile") as HTMLInputElement).value = "";
    setCurrenImageUrl(NoImage);
    setImageExist(false);
    setCurrentImage(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRegistrationProcessIsStarted(true);
    let imageService = new ImageService();
    let userService = new UserService();
    if (imageExist && currentImage !== null) {
      let response = await imageService.uploadImage(currentImage, null);
      formValues.registrationImageUrl =
        response == null ? null : response.imageUrl;
    }

    const user: CreateUserEntity = {
      firstName: formValues.registrationFirstName,
      lastName: formValues.registrationLastName,
      nickname: formValues.registrationNickname,
      password: formValues.registrationPassword,
      profileImageUrl: formValues.registrationImageUrl,
    };
    let response = await userService.registrateUser(user);
    if (response === true) {
      props.hideModal();
    } else {
      setDataIncorrect(true)
    }

    setRegistrationProcessIsStarted(false);
  };

  const previewImageError = () => {
    setCurrenImageUrl(NoImage);
  };

  useEffect(() => {
    let checkNickname = async () => {
      if (formValues.registrationNickname.length === 0) {
        setNicknameIsFree(null);
        return;
      }
      let userService = new UserService();
      setNicknameIsFree(null);
      let isFree = await userService.nicknameIsFree(
        formValues.registrationNickname
      );
      if (isFree == null) {
        setNicknameIsFree(null);
      } else {
        setNicknameIsFree(isFree.isFree);
      }
    };
    checkNickname();
  }, [formValues.registrationNickname]);

  return (
    <Modal size="lg" show={props.modalShow} centered>
      <Modal.Body>
        <button
          type="button"
          style={{ top: 5, right: 5, zIndex: 1 }}
          className="btn-close position-absolute"
          onClick={props.hideModal}
        />
        <div className="d-flex">
          <div className="d-flex flex-column justify-content-center">
            <div>
              <CarouselImage autoPlay={false} carouselIndex={0} imageUrlArr={[currentImageUrl]} height={480} width={330} onChangeCarouselIndex={() => {}}/>
              {/* <img
                className="rounded"
                width={329}
                height={438}
                src={currentImageUrl}
                onError={previewImageError}
                alt=""
              /> */}
            </div>
            <div className="d-flex justify-content-center my-3">
              <input
                className="d-none"
                id="loadedFile"
                type="file"
                accept="image/*"
                onChange={selectImage}
              />
              <input
                className="btn btn-success"
                type="button"
                value="Выберите изображение"
                onClick={() => {
                  (
                    document.getElementById("loadedFile") as HTMLInputElement
                  ).click();
                }}
              />
            </div>
            <div className="d-flex justify-content-center">
              <input
                className="btn border-0"
                type="button"
                value="Очистить изображение"
                onClick={clearImage}
                disabled={!imageExist ? true : false}
              />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="w-100 p-3">
            <div className="container">
              <div className="row">
                <label
                  htmlFor="registrationLastName"
                  className="form-label  p-0"
                >
                  Фамилия
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="registrationLastName"
                  id="registrationLastName"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="row mt-2">
                <label
                  htmlFor="registrationFirstName"
                  className="form-label p-0"
                >
                  Имя
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="registrationFirstName"
                  id="registrationFirstName"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="row mt-2">
                <label
                  htmlFor="registrationNickname"
                  className="form-label  p-0"
                >
                  Псевдоним
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    nicknameIsFree != null &&
                    (nicknameIsFree ? "is-valid" : "is-invalid")
                  }`}
                  name="registrationNickname"
                  id="registrationNickname"
                  required
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback p-0 ">Псевдоним уже занят</div>
              </div>
              <div className="row mt-2">
                <label
                  htmlFor="registrationPassword"
                  className="form-label  p-0"
                >
                  Пароль
                </label>
                <input
                  type="password"
                  minLength={8}
                  className={`form-control`}
                  name="registrationPassword"
                  id="registrationPassword"
                  required
                  onChange={handleInputChange}
                />
              </div>
              {dataIncorrect && (
                <div className="row mt-2">
                  <div className="d-flex justify-content-center">
                    <p className="text-danger m-0">
                      Ошибка при регистрации
                    </p>
                  </div>
                </div>
              )}

              <div className="row mt-3">
                <div className="d-flex justify-content-center">
                  <button className="btn btn-success" type="submit">
                    Зарегистрироваться
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        {registrationProcessIsStarted && (
          <div
            style={{ zIndex: 2 }}
            className="position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-secondary bg-opacity-50"
          >
            <div
              style={{ width: 100, height: 100 }}
              className="spinner-border text-secondary"
              role="status"
            >
              <span className="visually-hidden">Загрузка...</span>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default MyRegistrationModal;
