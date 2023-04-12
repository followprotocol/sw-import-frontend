import { Login, Import, Captcha } from "./components/index";
import useBearStore from "./state/State";

function App() {

  const currentPage = useBearStore((state) => state.currentPage);

  return ( 
    <>     
      {
        (() => {
          if(currentPage === "Login") {return (<Login/>)}
          else if (currentPage === "Captcha") {return (<Captcha/>)}
          else if (currentPage === "Import") {return (<Import/>)}
          else{return}
        })()  
      }  
    </>  
)}

export default App;
 