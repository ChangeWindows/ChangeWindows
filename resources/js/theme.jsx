import { extendTheme } from '@mui/joy/styles';

import cwColors from './colors';
import {
  createDarkHueDarkModeVariantVariables,
  createDarkHueLightModeVariantVariables,
  createLightHueDarkModeVariantVariables,
  createLightHueLightModeVariantVariables
} from './generateColor';

const cwTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        borderChannel: '220 220 220',
        deepPurple: {
          ...cwColors.deepPurple,
          ...createDarkHueLightModeVariantVariables('deepPurple')
        },
        red: {
          ...cwColors.red,
          ...createDarkHueLightModeVariantVariables('red')
        },
        orange: {
          ...cwColors.orange,
          ...createLightHueLightModeVariantVariables('orange')
        },
        amber: {
          ...cwColors.amber,
          ...createLightHueLightModeVariantVariables('amber')
        },
        lime: {
          ...cwColors.lime,
          ...createLightHueLightModeVariantVariables('lime')
        },
        lightGreen: {
          ...cwColors.lightGreen,
          ...createLightHueLightModeVariantVariables('lightGreen')
        },
        green: {
          ...cwColors.green,
          ...createDarkHueLightModeVariantVariables('green')
        },
        teal: {
          ...cwColors.teal,
          ...createDarkHueLightModeVariantVariables('teal')
        },
        cyan: {
          ...cwColors.cyan,
          ...createDarkHueLightModeVariantVariables('cyan')
        }
      },
    },
    dark: {
      palette: {
        borderChannel: '37 37 45',
        deepPurple: {
          ...cwColors.deepPurple,
          ...createDarkHueDarkModeVariantVariables('deepPurple')
        },
        red: {
          ...cwColors.red,
          ...createDarkHueDarkModeVariantVariables('red')
        },
        orange: {
          ...cwColors.orange,
          ...createLightHueDarkModeVariantVariables('orange')
        },
        amber: {
          ...cwColors.amber,
          ...createLightHueDarkModeVariantVariables('amber')
        },
        lime: {
          ...cwColors.lime,
          ...createLightHueDarkModeVariantVariables('lime')
        },
        lightGreen: {
          ...cwColors.lightGreen,
          ...createDarkHueDarkModeVariantVariables('lightGreen')
        },
        green: {
          ...cwColors.green,
          ...createDarkHueDarkModeVariantVariables('green')
        },
        teal: {
          ...cwColors.teal,
          ...createDarkHueDarkModeVariantVariables('teal')
        },
        cyan: {
          ...cwColors.cyan,
          ...createDarkHueDarkModeVariantVariables('cyan')
        }
      },
    },
  },
  fontFamily: {
    body: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Text', 'Segoe UI', Roboto, Helvetica Neue, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    display:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Roboto, Helvetica Neue, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
  },
  components: {
  },
});

export default cwTheme;
