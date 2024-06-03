import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes/Routes'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource/poppins';
import '@fontsource/croissant-one';
import AuthProvider from './Providers/AuthProvider/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const fonts = {
  logo: {
    croissant: `'Croissant One', system-ui`
  },
  body: `'Poppins', sans-serif`,
}

const colors = {
  primary: {
    50: '#FFE6EB',
    100: '#FCDDE0',
    200: '#FABACB',
    300: '#F6969F',
    400: '#F4716A',
    500: '#FF1949',
    600: '#E0003C',
    700: '#B30030',
    800: '#860025',
    900: '#59001A',
  },
};

const queryClient = new QueryClient()

const theme = extendTheme({ colors, fonts })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
