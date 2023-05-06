import React from "react";

export interface ILoadingScreenProps {
  zIndex: number;
  showBackground?: boolean;
}

const LoadingScreen: React.FunctionComponent<ILoadingScreenProps> = ({
  zIndex,
  showBackground = true
}) => {
  return (
    <div
      style={{ zIndex: zIndex }}
      className={`position-absolute top-0 start-0 h-100 w-100 ${showBackground === true && "bg-secondary bg-opacity-50"}`}
    >
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <div
          style={{ width: 100, height: 100 }}
          className="spinner-border text-secondary"
          role="status"
        >
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
