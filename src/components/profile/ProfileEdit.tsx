import React, { useState } from "react";

import API_URLS from "../../core/apiUrls";
import CarouselImage from "../carousel_image/CarouselImage";
import { GetFullUserEntity } from "../../core/entities/user/GetFullUserEntity";
import { GetRoleEntity } from "../../core/entities/role/GetRoleEntity";
import LoadingScreen from "../loading_screen/LoadingScreen";
import RoleClickable from "../role_clickable/RoleClickable";
import { UserService } from "../../core/services/UserService";

export interface IProfileEditProps {
  user: GetFullUserEntity;
  currentUser: GetFullUserEntity;
  onCancel: () => void;
  onSave: (profileEdit: ProfileEditResult) => void;
  roles: GetRoleEntity[];
}

export interface ProfileEditResult {
  userId: string;
  profileImageUrl: string | null;
  profileImageFile: File | null;
  firstName: string;
  lastName: string;
  nickname: string;
  roleIdArr: string[];
}

const ProfileEdit: React.FunctionComponent<IProfileEditProps> = (props) => {
  const userService = new UserService();

  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(
    props.user.profileImageUrl
  );
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const [firstName, setFirstName] = useState<string>(props.user.firstName);
  const [firstNameIsValid, setFirstNameIsValid] = useState(true);

  const firstNameOnChange = (firstNameChange: string) => {
    setFirstName(firstNameChange);
    if (firstNameChange.length === 0) {
      setFirstNameIsValid(false);
    } else {
      setFirstNameIsValid(true);
    }
  };

  const [lastName, setLastName] = useState<string>(props.user.lastName);
  const [lastNameIsValid, setLastNameIsValid] = useState(true);

  const lastNameOnChange = (lastNameChange: string) => {
    setLastName(lastNameChange);
    if (lastNameChange.length === 0) {
      setLastNameIsValid(false);
    } else {
      setLastNameIsValid(true);
    }
  };

  const [nickname, setNickname] = useState<string>(props.user.nickname);
  const [nicknameIsFree, setNicknameIsFree] = useState<boolean>(true);

  const checkNickname = async (newNickname: string) => {
    if (newNickname.length === 0) {
      setNicknameIsFree(false);
      return;
    }
    if (newNickname === props.user.nickname) {
      setNicknameIsFree(true);
      return;
    }
    const isFree = await userService.nicknameIsFree(newNickname);
    if (isFree === null) {
      setNicknameIsFree(false);
    } else {
      setNicknameIsFree(isFree.isFree);
    }
  };

  const nicknameOnChange = async (nicknameChange: string) => {
    setNickname(nicknameChange);
    await checkNickname(nicknameChange);
  };

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    if (selectedFiles != null && selectedFiles.length > 0) {
      setProfileImageFile(selectedFiles?.[0]);
      setProfileImageUrl(null);
    }
    event.target.value = "";
  };

  const removeImage = () => {
    setProfileImageFile(null);
    setProfileImageUrl(null);
  };

  const onSave = () => {
    const editUserProfile: ProfileEditResult = {
      userId: props.user.id,
      firstName: firstName,
      lastName: lastName,
      nickname: nickname,
      profileImageFile: profileImageFile,
      profileImageUrl: profileImageUrl,
      roleIdArr: editRoles,
    };
    props.onSave(editUserProfile);
  };

  const [editRoles, setEditRoles] = useState<string[]>(
    props.user.roles.map((it) => it.id)
  );

  const roleClick = (id: string, isCheck: boolean) => {
    if (isCheck === true) {
      setEditRoles([...editRoles, id]);
    } else {
      const newRoles = [...editRoles];
      newRoles.splice(newRoles.indexOf(id), 1);
      setEditRoles(newRoles);
    }
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="row">
        <div className="col-auto">
          <div className="d-flex flex-column justify-content-center w-auto">
            <CarouselImage
              width={330}
              height={480}
              onChangeCarouselIndex={() => {}}
              autoPlay={false}
              carouselIndex={0}
              imageUrlArr={
                profileImageUrl === null
                  ? profileImageFile === null
                    ? []
                    : [URL.createObjectURL(profileImageFile)]
                  : [API_URLS.REACT_APP_IMAGES_API_URL + profileImageUrl]
              }
            />
            <div>
              <div className="d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-center mt-2">
                  <input
                    className="d-none"
                    id="loadedFile"
                    type="file"
                    accept="image/*"
                    onChange={selectImage}
                  />
                  <button
                    className="btn btn-success my-2"
                    onClick={() => {
                      (
                        document.getElementById(
                          "loadedFile"
                        ) as HTMLInputElement
                      ).click();
                    }}
                  >
                    Установить изображение
                  </button>
                </div>
                <div className="d-flex justify-content-center my-2">
                  <button
                    disabled={
                      profileImageUrl === null && profileImageFile === null
                        ? true
                        : false
                    }
                    className="btn border-0"
                    onClick={removeImage}
                  >
                    Удалить изображение
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="row">
            <div className="col-xl-6">
              <label className="form-label" htmlFor="inputLastName">
                <strong>Фамилия</strong>
              </label>
              <input
                id="inputLastName"
                className={`form-control ${
                  lastNameIsValid !== true ? "is-invalid" : "is-valid"
                }`}
                type="text"
                required
                minLength={1}
                value={lastName}
                onChange={(e) => lastNameOnChange(e.target.value)}
              />
            </div>
            <div className="col-xl-6">
              <label className="form-label" htmlFor="inputFirstName">
                <strong>Имя</strong>
              </label>
              <input
                id="inputFirstName"
                className={`form-control ${
                  firstNameIsValid !== true ? "is-invalid" : "is-valid"
                }`}
                type="text"
                required
                minLength={1}
                value={firstName}
                onChange={(e) => firstNameOnChange(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label" htmlFor="inputLastName">
                <strong>Псевдоним</strong>
              </label>
              <input
                id="inputLastName"
                className={`form-control ${
                  nicknameIsFree !== null &&
                  (nicknameIsFree === true && nickname.length > 0
                    ? "is-valid"
                    : "is-invalid")
                }`}
                type="text"
                required
                minLength={1}
                value={nickname}
                onChange={(e) => nicknameOnChange(e.target.value)}
              />
            </div>
          </div>
          {props.currentUser.roles.find((role) => role.name === "admin") && (
            <div className="row">
              <div className="d-flex flex-column">
                <div className="row">
                  <p className="py-2 m-0">
                    <strong>Роли</strong>
                  </p>
                </div>
                <div className="d-flex flex-wrap">
                  {props.roles.map((role, index) => (
                    <RoleClickable
                      isCheck={
                        editRoles.find((t) => role.id === t) !== undefined
                          ? true
                          : false
                      }
                      roleId={role.id}
                      roleName={role.name}
                      onClick={roleClick}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="row py-3"></div>
      <div className="row mt-auto">
        <div className="col d-flex">
          <button
            disabled={
              nicknameIsFree === false ||
              firstNameIsValid === false ||
              lastNameIsValid === false
            }
            className="btn btn-success m-auto"
            onClick={onSave}
          >
            Сохранить
          </button>
        </div>
        <div className="col p-0 d-flex">
          <button className="btn btn-danger m-auto" onClick={props.onCancel}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProfileEdit;
