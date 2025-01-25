import { keyframes } from "@emotion/react";

export const textFieldStyle = { width: "100%", height: "50px" };
export const typographyFontStyle = {
  fontFamily: "Lato, sans-serif",
  fontSize: "16px",
  fontWeight: 700,
  lineHeight: "24px",
  letterSpacing: "0.15px",
  textAlign: "left",
  margin: "16px 0px 0px 0px",
};

// Animation keyframe for pop effect
export const popAnimation = keyframes`
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

export const styles = {
    formHeader: {
      margin: "0 auto",
      padding: 2,
      marginTop: "45px",
      justifyContent: "center",
      alignItems: "center"
    },
    fromBody: {
      margin: "0 auto",
      padding: 2,
      backgroundColor: "#fff",
      boxShadow: "0px 4px 30px 0px #00000014",
      borderRadius: "8px", marginTop: "15px",
    },
    inputValidationRequired: {
      color: "#DA1E28",
      position: "absolute",
      left: 0,
      fontSize: "12px",
      paddingTop: "2px"
    },
    inputValidationerror: {
      color: "#DA1E28",
      position: "absolute",
      top: "100%",
      left: 0,
      fontSize: "12px"
    }
  };

export const Colors = {
    primary: "#252F3D",
    secondary: "#127C95",
    error: "#FFC0C0",
    success: "#CDFADC",
    warning: "#DA1E28",
    grey:"#333333",
    white: "#FFFFFF",
  };
  