import { extendTheme } from '@chakra-ui/react'

export const chakraTheme = extendTheme({
  colors: {
    gray: {
      '900': '#181B23',
      '800': '#1F2029',
      '700': '#353646',
      '600': '#4B4D63',
      '500': '#616480',
      '400': '#797D9A',
      '300': '#9699B0',
      '200': '#B3B5C6',
      '100': '#D1D2DC',
      '50': '#EEEEF2',
    },
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
  styles: {},
})

export const theme = {
  colors: {
    darkGreen: '#27AE60',
    lightGreen: '#2ECC71',
    background: '#F0F2F5',
    textTitle: '#363f5f',
    textBody: '#969cb3',
    shape: '#FFFFFF',
    textGreen: '#33CC95',
  },
}
