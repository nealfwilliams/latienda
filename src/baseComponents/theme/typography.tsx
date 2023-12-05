export enum FONT {
  BRANDED = 'branded',
  BRANDED2 = 'branded2',
  SERIF = 'serif',
  NORMAL = 'normal',
}

export enum FONT_SIZE {
  XXS = 'xxs',
  XS = 'xs',
  SM = 'sm',
  MS = 'ms',
  MD = 'md',
  ML = 'ml',
  LG = 'lg',
  XL = 'xl',
  XXL = 'xxl',
}

export const getIconSize = (fontSize: FONT_SIZE): FONT_SIZE => {
  return {
    [FONT_SIZE.XXS]: FONT_SIZE.XS,
    [FONT_SIZE.XS]: FONT_SIZE.SM,
    [FONT_SIZE.SM]: FONT_SIZE.SM,
    [FONT_SIZE.MS]: FONT_SIZE.MD,
    [FONT_SIZE.MD]: FONT_SIZE.MD,
    [FONT_SIZE.ML]: FONT_SIZE.LG,
    [FONT_SIZE.LG]: FONT_SIZE.LG,
    [FONT_SIZE.XL]: FONT_SIZE.XXL,
    [FONT_SIZE.XXL]: FONT_SIZE.XXL,
  }[fontSize]
}

export enum FONT_WEIGHT {
  NORMAL = 'normal',
  HEADING = 'heading',
  BOLD = 'bold',
}

export enum LINE_HEIGHT {
  NORMAL = 'normal',
  CONDENSED = 'condensed',
}

export const fontSizeMap = {
  [FONT_SIZE.XXS]: '0.675rem',
  [FONT_SIZE.XS]: '0.75rem',
  [FONT_SIZE.SM]: '0.875rem',
  [FONT_SIZE.MS]: '1rem',
  [FONT_SIZE.MD]: '1.25rem',
  [FONT_SIZE.ML]: '1.5rem',
  [FONT_SIZE.LG]: '1.75rem',
  [FONT_SIZE.XL]: '2.0rem',
  [FONT_SIZE.XXL]: '2.25rem',
}

export const fontStyles = {
  fonts: {
    [FONT.BRANDED]: 'GPMed, sans-serif',
    [FONT.BRANDED2]: 'GPCMed, sans-serif',
    [FONT.SERIF]: '"Sumana", Georgia, "Times New Roman", Times, serif;',
    [FONT.NORMAL]:
      '"Libre Franklin", "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;',
  },
  fontSizes: fontSizeMap,
  lineHeights: {
    [LINE_HEIGHT.NORMAL]: 1.625,
    [LINE_HEIGHT.CONDENSED]: 1.3,
  },
  fontWeights: {
    [FONT_WEIGHT.NORMAL]: 400,
    [FONT_WEIGHT.HEADING]: 600,
    [FONT_WEIGHT.BOLD]: 700,
  },
  // letterSpacings: {
  //   [LETTER_SPACING.NORMAL]: 'none',
  //   [LETTER_SPACING.EXTRA]: '0.5px'
  // }
}

export enum TYPOGRAPHY_TYPE {
  PARAGRAPH_XSMALL = 'paragraphXSmall',
  PARAGRAPH_SMALL = 'paragraphSmall',
  PARAGRAPH_MEDIUM = 'paragraphMedium',
  PARAGRAPH_LARGE = 'paragraphLarge',
  CONDENSED_TEXT_XSMALL = 'condensedTextXSmall',
  CONDENSED_TEXT_SMALL = 'condensedTextSmall',
  CONDENSED_TEXT_MEDIUM = 'condensedTextMedium',
  CONDENSED_TEXT_LARGE = 'condensedTextLarge',
  HEADING_SMALL = 'headingSmall',
  HEADING_MEDIUM = 'headingMedium',
  HEADING_LARGE = 'headingLarge',
  HEADING_XLARGE = 'headingXLarge',
  CONTROL_SMALL = 'controlSmall',
  CONTROL_MEDIUM = 'controlMedium',
  CONTROL_LARGE = 'controlLarge',
  HEADLINE_SMALL = 'headlineSmall',
  HEADLINE_MEDIUM = 'headlineMedium',
  HEADLINE_LARGE = 'headlineLarge',
}

export const typographyStyleMap: {
  [key in TYPOGRAPHY_TYPE]: {
    fontFamily: FONT
    fontSize: FONT_SIZE
    fontWeight?: FONT_WEIGHT
    lineHeight: LINE_HEIGHT
  }
} = {
  [TYPOGRAPHY_TYPE.PARAGRAPH_XSMALL]: {
    fontFamily: FONT.NORMAL,
    fontSize: FONT_SIZE.XS,
    lineHeight: LINE_HEIGHT.NORMAL,
    fontWeight: FONT_WEIGHT.NORMAL,
  },
  [TYPOGRAPHY_TYPE.PARAGRAPH_SMALL]: {
    fontFamily: FONT.NORMAL,
    fontSize: FONT_SIZE.SM,
    lineHeight: LINE_HEIGHT.NORMAL,
    fontWeight: FONT_WEIGHT.NORMAL,
  },
  [TYPOGRAPHY_TYPE.PARAGRAPH_MEDIUM]: {
    fontFamily: FONT.NORMAL,
    fontSize: FONT_SIZE.MS,
    lineHeight: LINE_HEIGHT.NORMAL,
    fontWeight: FONT_WEIGHT.NORMAL,
  },
  [TYPOGRAPHY_TYPE.PARAGRAPH_LARGE]: {
    fontFamily: FONT.NORMAL,
    fontSize: FONT_SIZE.MD,
    lineHeight: LINE_HEIGHT.NORMAL,
    fontWeight: FONT_WEIGHT.NORMAL,
  },
  [TYPOGRAPHY_TYPE.CONDENSED_TEXT_XSMALL]: {
    fontFamily: FONT.NORMAL,
    fontSize: FONT_SIZE.XS,
    lineHeight: LINE_HEIGHT.CONDENSED,
    fontWeight: FONT_WEIGHT.NORMAL,
  },
  [TYPOGRAPHY_TYPE.CONDENSED_TEXT_SMALL]: {
    fontFamily: FONT.NORMAL,
    fontSize: FONT_SIZE.SM,
    lineHeight: LINE_HEIGHT.CONDENSED,
    fontWeight: FONT_WEIGHT.NORMAL,
  },
  [TYPOGRAPHY_TYPE.CONDENSED_TEXT_MEDIUM]: {
    fontFamily: FONT.NORMAL,
    fontSize: FONT_SIZE.MS,
    lineHeight: LINE_HEIGHT.CONDENSED,
    fontWeight: FONT_WEIGHT.NORMAL,
  },
  [TYPOGRAPHY_TYPE.CONDENSED_TEXT_LARGE]: {
    fontFamily: FONT.NORMAL,
    fontSize: FONT_SIZE.MD,
    lineHeight: LINE_HEIGHT.CONDENSED,
    fontWeight: FONT_WEIGHT.NORMAL,
  },

  [TYPOGRAPHY_TYPE.HEADING_SMALL]: {
    fontFamily: FONT.NORMAL,
    fontSize: FONT_SIZE.MD,
    fontWeight: FONT_WEIGHT.HEADING,
    lineHeight: LINE_HEIGHT.CONDENSED,
  },
  [TYPOGRAPHY_TYPE.HEADING_MEDIUM]: {
    fontFamily: FONT.BRANDED2,
    fontSize: FONT_SIZE.LG,
    fontWeight: FONT_WEIGHT.HEADING,
    lineHeight: LINE_HEIGHT.CONDENSED,
  },
  [TYPOGRAPHY_TYPE.HEADING_LARGE]: {
    fontFamily: FONT.BRANDED2,
    fontSize: FONT_SIZE.XL,
    fontWeight: FONT_WEIGHT.HEADING,
    lineHeight: LINE_HEIGHT.CONDENSED,
  },
  [TYPOGRAPHY_TYPE.HEADING_XLARGE]: {
    fontFamily: FONT.BRANDED2,
    fontSize: FONT_SIZE.XXL,
    fontWeight: FONT_WEIGHT.HEADING,
    lineHeight: LINE_HEIGHT.CONDENSED,
  },
  [TYPOGRAPHY_TYPE.CONTROL_SMALL]: {
    fontFamily: FONT.NORMAL,
    fontSize: FONT_SIZE.SM,
    fontWeight: FONT_WEIGHT.BOLD,
    lineHeight: LINE_HEIGHT.CONDENSED,
  },
  [TYPOGRAPHY_TYPE.CONTROL_MEDIUM]: {
    fontFamily: FONT.NORMAL,
    fontSize: FONT_SIZE.MS,
    fontWeight: FONT_WEIGHT.BOLD,
    lineHeight: LINE_HEIGHT.CONDENSED,
  },
  [TYPOGRAPHY_TYPE.CONTROL_LARGE]: {
    fontFamily: FONT.NORMAL,
    fontSize: FONT_SIZE.ML,
    fontWeight: FONT_WEIGHT.BOLD,
    lineHeight: LINE_HEIGHT.CONDENSED,
  },
  [TYPOGRAPHY_TYPE.HEADLINE_SMALL]: {
    fontFamily: FONT.SERIF,
    fontSize: FONT_SIZE.MD,
    fontWeight: FONT_WEIGHT.NORMAL,
    lineHeight: LINE_HEIGHT.CONDENSED,
  },
  [TYPOGRAPHY_TYPE.HEADLINE_MEDIUM]: {
    fontFamily: FONT.SERIF,
    fontSize: FONT_SIZE.ML,
    fontWeight: FONT_WEIGHT.NORMAL,
    lineHeight: LINE_HEIGHT.CONDENSED,
  },
  [TYPOGRAPHY_TYPE.HEADLINE_LARGE]: {
    fontFamily: FONT.SERIF,
    fontSize: FONT_SIZE.LG,
    fontWeight: FONT_WEIGHT.NORMAL,
    lineHeight: LINE_HEIGHT.CONDENSED,
  },
}

export const getTypographyStyles = (typography?: TYPOGRAPHY_TYPE) => {
  return typographyStyleMap[typography || TYPOGRAPHY_TYPE.PARAGRAPH_MEDIUM]
}
