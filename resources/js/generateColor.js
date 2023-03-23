const createDarkHueLightModeVariantVariables = (color) => ({
  contrastText: '#fff',

  plainColor: `var(--joy-palette-${color}-600)`,
  plainHoverBg: `var(--joy-palette-${color}-100)`,
  plainActiveBg: `var(--joy-palette-${color}-200)`,
  plainDisabledColor: `var(--joy-palette-${color}-200)`,

  outlinedColor: `var(--joy-palette-${color}-500)`,
  outlinedBorder: `var(--joy-palette-${color}-200)`,
  outlinedHoverBg: `var(--joy-palette-${color}-100)`,
  outlinedHoverBorder: `var(--joy-palette-${color}-300)`,
  outlinedActiveBg: `var(--joy-palette-${color}-200)`,
  outlinedDisabledColor: `var(--joy-palette-${color}-100)`,
  outlinedDisabledBorder: `var(--joy-palette-${color}-100)`,

  softColor: `var(--joy-palette-${color}-600)`,
  softBg: `var(--joy-palette-${color}-100)`,
  softHoverBg: `var(--joy-palette-${color}-200)`,
  softActiveBg: `var(--joy-palette-${color}-300)`,
  softDisabledColor: `var(--joy-palette-${color}-300)`,
  softDisabledBg: `var(--joy-palette-${color}-50)`,

  solidColor: '#fff',
  solidBg: `var(--joy-palette-${color}-500)`,
  solidHoverBg: `var(--joy-palette-${color}-600)`,
  solidActiveBg: `var(--joy-palette-${color}-700)`,
  solidDisabledColor: `#fff`,
  solidDisabledBg: `var(--joy-palette-${color}-200)`
});

const createLightHueLightModeVariantVariables = (color) => ({
  contrastText: '#000',

  plainColor: `var(--joy-palette-${color}-800)`,
  plainHoverBg: `var(--joy-palette-${color}-100)`,
  plainActiveBg: `var(--joy-palette-${color}-200)`,
  plainDisabledColor: `var(--joy-palette-${color}-200)`,

  outlinedColor: `var(--joy-palette-${color}-700)`,
  outlinedBorder: `var(--joy-palette-${color}-200)`,
  outlinedHoverBg: `var(--joy-palette-${color}-100)`,
  outlinedHoverBorder: `var(--joy-palette-${color}-300)`,
  outlinedActiveBg: `var(--joy-palette-${color}-200)`,
  outlinedDisabledColor: `var(--joy-palette-${color}-100)`,
  outlinedDisabledBorder: `var(--joy-palette-${color}-100)`,

  softColor: `var(--joy-palette-${color}-800)`,
  softBg: `var(--joy-palette-${color}-100)`,
  softHoverBg: `var(--joy-palette-${color}-200)`,
  softActiveBg: `var(--joy-palette-${color}-300)`,
  softDisabledColor: `var(--joy-palette-${color}-300)`,
  softDisabledBg: `var(--joy-palette-${color}-50)`,

  solidColor: '#000',
  solidBg: `var(--joy-palette-${color}-500)`,
  solidHoverBg: `var(--joy-palette-${color}-600)`,
  solidActiveBg: `var(--joy-palette-${color}-700)`,
  solidDisabledColor: `#fff`,
  solidDisabledBg: `var(--joy-palette-${color}-200)`
});

const createDarkHueDarkModeVariantVariables = (color) => ({
  contrastText: '#fff',

  plainColor: `var(--joy-palette-${color}-300)`,
  plainHoverBg: `var(--joy-palette-${color}-800)`,
  plainActiveBg: `var(--joy-palette-${color}-700)`,
  plainDisabledColor: `var(--joy-palette-${color}-800)`,

  outlinedColor: `var(--joy-palette-${color}-200)`,
  outlinedBorder: `var(--joy-palette-${color}-700)`,
  outlinedHoverBg: `var(--joy-palette-${color}-800)`,
  outlinedHoverBorder: `var(--joy-palette-${color}-600)`,
  outlinedActiveBg: `var(--joy-palette-${color}-900)`,
  outlinedDisabledColor: `var(--joy-palette-${color}-800)`,
  outlinedDisabledBorder: `var(--joy-palette-${color}-800)`,

  softColor: `var(--joy-palette-${color}-200)`,
  softBg: `var(--joy-palette-${color}-900)`,
  softHoverBg: `var(--joy-palette-${color}-800)`,
  softActiveBg: `var(--joy-palette-${color}-700)`,
  softDisabledColor: `var(--joy-palette-${color}-800)`,
  softDisabledBg: `var(--joy-palette-${color}-900)`,

  solidColor: `#fff`,
  solidBg: `var(--joy-palette-${color}-600)`,
  solidHoverBg: `var(--joy-palette-${color}-700)`,
  solidActiveBg: `var(--joy-palette-${color}-800)`,
  solidDisabledColor: `var(--joy-palette-${color}-700)`,
  solidDisabledBg: `var(--joy-palette-${color}-900)`
});

const createLightHueDarkModeVariantVariables = (color) => ({
  contrastText: '#000',

  plainColor: `var(--joy-palette-${color}-300)`,
  plainHoverBg: `var(--joy-palette-${color}-800)`,
  plainActiveBg: `var(--joy-palette-${color}-700)`,
  plainDisabledColor: `var(--joy-palette-${color}-800)`,

  outlinedColor: `var(--joy-palette-${color}-200)`,
  outlinedBorder: `var(--joy-palette-${color}-700)`,
  outlinedHoverBg: `var(--joy-palette-${color}-800)`,
  outlinedHoverBorder: `var(--joy-palette-${color}-600)`,
  outlinedActiveBg: `var(--joy-palette-${color}-900)`,
  outlinedDisabledColor: `var(--joy-palette-${color}-800)`,
  outlinedDisabledBorder: `var(--joy-palette-${color}-800)`,

  softColor: `var(--joy-palette-${color}-200)`,
  softBg: `var(--joy-palette-${color}-900)`,
  softHoverBg: `var(--joy-palette-${color}-800)`,
  softActiveBg: `var(--joy-palette-${color}-700)`,
  softDisabledColor: `var(--joy-palette-${color}-800)`,
  softDisabledBg: `var(--joy-palette-${color}-900)`,

  solidColor: `#000`,
  solidBg: `var(--joy-palette-${color}-600)`,
  solidHoverBg: `var(--joy-palette-${color}-700)`,
  solidActiveBg: `var(--joy-palette-${color}-800)`,
  solidDisabledColor: `var(--joy-palette-${color}-700)`,
  solidDisabledBg: `var(--joy-palette-${color}-900)`
});

export {
  createDarkHueLightModeVariantVariables,
  createLightHueLightModeVariantVariables,
  createDarkHueDarkModeVariantVariables,
  createLightHueDarkModeVariantVariables
};
