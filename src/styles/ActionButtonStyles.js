export const actionButtonStyles = (isMobile, variant, backgroundColor, borderColor, textColor) => ({
  backgroundColor: variant === "contained" ? backgroundColor : "transparent",
  color: variant === "outlined" ? borderColor : textColor,
  borderColor: variant === "outlined" ? borderColor : "transparent",
  borderRadius: "6px",
  height: "46px",
  width: isMobile ? "100%" : "145px",
  marginBottom: isMobile ? "10px" : "0",
});
