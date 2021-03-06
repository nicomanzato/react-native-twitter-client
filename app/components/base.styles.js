const colorReferences = {
  white: '#ffffff',
  blackPearl: '#041322',
  grayChateau: '#A2AAB3',
  skyBlue: '#76D7EA',
  scienceBlue: '#0066CC',
  transparent: 'rgba(255, 255, 255, 0)',

};

const colors = {
  backgroundPrimary: colorReferences.white,
  backgroundSecondary: colorReferences.scienceBlue,
  backgroundTransparent: colorReferences.transparent,
  iconPrimary: colorReferences.skyBlue,
  iconSecondary: colorReferences.grayChateau,
  iconTertiary: colorReferences.white,
  iconHighlight: colorReferences.scienceBlue,
  textPrimary: colorReferences.blackPearl,
  textSecondary: colorReferences.grayChateau,
  textTertiary: colorReferences.white,
  borderPrimary: colorReferences.grayChateau,
  borderSecondary: colorReferences.scienceBlue,
};

const spacings = {
  XS: 4,
  S: 10,
  M: 16,
  L: 24,
  XL: 30,
  XXL: 45
};

const zIndexes = {
  top: 3,
  normal: 2,
  bottom: 1,
};

const fontSizes = {
  normal: 16,
  title: 18,
  subtitle: 14,
  headline: 24,
  smallIcon: 18,
  mediumIcon: 32,
  bigIcon: 44,
}

export default {
  colors,
  spacings,
  zIndexes,
  fontSizes,
};
