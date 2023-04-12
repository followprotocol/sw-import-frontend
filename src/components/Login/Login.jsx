import {useState} from "react"
import toast, {Toaster} from "react-hot-toast"
import useBearStore from "../../state/State";
import axios from "axios";
import "./Login.css"
import logo from "../../assets/logo.png"

const Login = () => {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const setsessionID = useBearStore((state) => state.setsessionID)
  const setcurrentPage = useBearStore((state) => state.setcurrentPage)

  const displayFAQ = () => {
    toast(
     "Why do we need your account details?\n\nWe don't have access to minimania backend/database so we have to fetch your account data using your credentials. \nThis project's code is open source and is available to anyone to see \nRest assured your sensitive details are safe!",
     {
       duration: 18000,
     }
   );
 }

  const loginFormHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    toast.dismiss()
    const myToast = toast.loading("Processing your request..");

    try {
        const resp = await axios({
            method: "POST",
            url: `https://api.minimania.app/api/auth/login`,
            data: {
              "email": email,
              "password": password,
              "remeberMe": "false",
              "token": "false"
            }
          });

        if (resp.data.success === true){
          toast.success("success", {id: myToast});
          setsessionID(resp.data.swsid)
          console.log(resp.data.swsid)
          setTimeout(() => {
            setcurrentPage("Captcha")
          }, 2000)
        }
        else{
          throw new Error("Incorrect details, try again");
        }
    } catch (err) {
        console.log(err)
        toast.dismiss()
        toast.error(err.toString());
    }
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }


  return (
    <div className="login-container">
        <div className="header">
          <img src={logo} alt="Logo" />
        </div>
        <div className="body">
          <h1 className="h1">
            Import your minimania account
          </h1>
          <div className="info">
            <p className="p" style={{textDecorationLine: 'underline'}}>Some important information:</p>
            <p className="p">
              * login using your minimania account.<br></br>
              * disable authenticator if you have it enabled.<br></br>
              * Place all your items inside your inventory.<br></br>
              * We will NOT store your password.
            </p>
          </div>
          <form className="form" id="loginForm" onSubmit={loginFormHandler}>
            <li className="li">
              <label className="label">Email:</label>
              <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required="True" id="email" name="email"/>
            </li>
            <li className="li">
              <label className="label">Passowrd:</label>
              <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" required="True" name="password"/>
            </li>
            <a className="a" onClick={() => {displayFAQ()}}>Why do we need your account details?</a>
          </form>
        </div>
        <div className="footer">
          <button className="orange-button" form="loginForm" type="submit" disabled={loading}>Continue </button>
        </div>
        <Toaster/>
    </div>
  );
}

export default Login;