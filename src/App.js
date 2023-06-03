import { ThemeProvider } from "styled-components";
import GlobalStyle from "./Styles/global";
import { useTheme } from "./context/ThemeContxt";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";

function App() {
  const { theme } = useTheme()


  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <GlobalStyle />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/user' element = {<UserPage/>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
