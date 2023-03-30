import { extendTheme } from "@mui/joy/styles";

import cwColors from "./colors";
import {
  createDarkHueDarkModeVariantVariables,
  createDarkHueLightModeVariantVariables,
  createLightHueDarkModeVariantVariables,
  createLightHueLightModeVariantVariables,
} from "./generateColor";

const cwTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        borderChannel: "220 220 220",
        primary: cwColors.blue,
        neutral: cwColors.grey,
        purple: {
          ...cwColors.purple,
          ...createDarkHueLightModeVariantVariables("purple"),
        },
        red: {
          ...cwColors.red,
          ...createDarkHueLightModeVariantVariables("red"),
        },
        orange: {
          ...cwColors.orange,
          ...createLightHueLightModeVariantVariables("orange"),
        },
        amber: {
          ...cwColors.amber,
          ...createLightHueLightModeVariantVariables("amber"),
        },
        rio: {
          ...cwColors.rio,
          ...createLightHueLightModeVariantVariables("rio"),
        },
        lime: {
          ...cwColors.lime,
          ...createLightHueLightModeVariantVariables("lime"),
        },
        green: {
          ...cwColors.green,
          ...createDarkHueLightModeVariantVariables("green"),
        },
        teal: {
          ...cwColors.teal,
          ...createDarkHueLightModeVariantVariables("teal"),
        },
        sky: {
          ...cwColors.sky,
          ...createDarkHueLightModeVariantVariables("sky"),
        },
      },
    },
    dark: {
      palette: {
        borderChannel: "37 37 45",
        primary: cwColors.blue,
        neutral: cwColors.grey,
        purple: {
          ...cwColors.purple,
          ...createDarkHueDarkModeVariantVariables("purple"),
        },
        red: {
          ...cwColors.red,
          ...createDarkHueDarkModeVariantVariables("red"),
        },
        orange: {
          ...cwColors.orange,
          ...createLightHueDarkModeVariantVariables("orange"),
        },
        amber: {
          ...cwColors.amber,
          ...createLightHueDarkModeVariantVariables("amber"),
        },
        rio: {
          ...cwColors.rio,
          ...createLightHueDarkModeVariantVariables("rio"),
        },
        lime: {
          ...cwColors.lime,
          ...createLightHueDarkModeVariantVariables("lime"),
        },
        green: {
          ...cwColors.green,
          ...createDarkHueDarkModeVariantVariables("green"),
        },
        teal: {
          ...cwColors.teal,
          ...createDarkHueDarkModeVariantVariables("teal"),
        },
        sky: {
          ...cwColors.sky,
          ...createDarkHueDarkModeVariantVariables("sky"),
        },
      },
    },
  },
  fontFamily: {
    body: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Text', 'Segoe UI', Roboto, Helvetica Neue, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    display:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Roboto, Helvetica Neue, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
  },
  components: {
    JoyChip: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "outlined" && {
            backgroundColor: `rgba(var(--joy-palette-${ownerState.color}-mainChannel) / .1)`,
          }),
        }),
      },
    },
  },
});

export default cwTheme;
