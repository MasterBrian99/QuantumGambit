import { ThemeProvider } from './components/theme-provider'
import CustomRouter from './router/router'

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <CustomRouter />
      </ThemeProvider>
    </>
  )
}

export default App
