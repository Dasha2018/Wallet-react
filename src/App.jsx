import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import { GlobalStyles } from "../src/assets/GlobalStyles";
import { ExpenseProvider } from "../src/ExpenseContext";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <ExpenseProvider>
        <GlobalStyles />
        <Header />
        <AppRoutes />
      </ExpenseProvider>
    </BrowserRouter>
  );
}

export default App;
