import { ThemeConfig, theme } from "antd";
import { hexToRgb } from "scripts";

// project main colors
export const __COLORS = {
  primary: "#05D37E",
  black: "#1E1E1E",
  black2: "#3F3B3A",
  gray1: "#B7B1B0",
  gray2: "#F7F7F7",
  green: "#18D061",
};

// Theme to setup antd styles
export const __theme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  components: {
    Button: {
      controlHeight: 44,
      controlHeightLG: 52,
      controlHeightSM: 36,
    },
    Input: {
      controlHeight: 44,
      controlHeightLG: 52,
      controlHeightSM: 36,
    },
  },
  token: {
    colorBgContainer: `${hexToRgb("#ffffff", 0.5)}`,
    colorText: __COLORS.black,
    colorTextPlaceholder: __COLORS.gray1,
    colorPrimary: __COLORS.primary,
    colorBorder: hexToRgb(__COLORS.primary, 0.15),
    controlHeight: 48,
    fontSize: 16,
    borderRadius: 10,
    paddingContentHorizontal: 20,
    fontFamily: "dana",
  },
};
