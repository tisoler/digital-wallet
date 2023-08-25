import GlobalProvider from "../context/globalContext";
import Dashboard from "./dashboard";

export default function App() {
  return (
    <GlobalProvider>
      <Dashboard />
    </GlobalProvider>
  )
}
