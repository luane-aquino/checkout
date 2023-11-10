import { Outlet } from "react-router-dom";
import Tabs from "./components/molecules/Tabs";

const App = () => {
  return ( 
    <>
      <Tabs/>
      <Outlet/>
    </>
  );
}
 
export default App;