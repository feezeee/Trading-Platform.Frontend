import React from "react";

export interface IFloatRoundedButtonProps {
  onClick: () => void;
}

const FloatRoundedButton: React.FunctionComponent<IFloatRoundedButtonProps> = (
  props
) => {
  const radius = 36;
  const backgroundColor = "#292929";

  return (
    <div className="container position-fixed" style={{ bottom: 20 }}>
      <div className="w-100 d-flex justify-content-end">
        <div
          style={{
            height: radius * 2,
            width: radius * 2,
            backgroundColor: backgroundColor,
            cursor: "pointer",
            //   bottom: 20,
            //   right: 20,
          }}
          className="rounded-circle d-flex justify-content-center align-items-center me-3"
          onClick={props.onClick}
        >
          <div>
            <i
              style={{ fontSize: "2em", lineHeight: "0.5em", color: "white" }}
              className="bi bi-plus w-100 h-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatRoundedButton;
