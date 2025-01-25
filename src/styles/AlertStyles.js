import { Colors, popAnimation } from "./theme";

export const alertStyles = (isMobile, error) => ({
  position: isMobile ? "absolute" : "fixed",
  bottom: isMobile ? "-40px" : "0px",
  top: isMobile ? "unset" : "150px", // Fixed invalid value
  left: isMobile ? "3.5%" : "unset", // Fixed invalid value
  right: isMobile ? "unset" : "20%",
  transform: isMobile ? "none" : "translateX(-50%)",
  width: isMobile ? "85%" : "auto",
  zIndex: 1000,
  paddingTop: "16px",
  height: isMobile ? "auto" : "46px",
  animation: `${popAnimation} 0.5s ease-out`,
  fontFamily: "Lato, sans-serif",
  fontSize: "18px",
  fontWeight: 700,
  lineHeight: "24px",
  letterSpacing: "0.15px",
  textAlign: "left",
  color: Colors.grey,
  backgroundColor: error ? Colors.error : Colors.success,
});
