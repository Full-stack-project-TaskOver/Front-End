import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider} from 'react-redux'
import cardsStore from './store/cardsStore'
import theme from './config/theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Provider store={cardsStore} >
          <App />
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
  
)
