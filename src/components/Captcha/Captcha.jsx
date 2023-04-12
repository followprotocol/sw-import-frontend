import "./Captcha.css"
import { useEffect, useState } from "react"
import ReactRecaptcha3 from "react-google-recaptcha3"
import axios from "axios"
import useBearStore from "../../state/State"
import logo from "../../assets/logo.png"

// https://github.com/google/recaptcha/issues/269

function Captcha() {

  const [captchaQuestion, setcaptchaQuestion] = useState("")
  const [captchaList, setcaptchaList] = useState([])

  const setcurrentPage = useBearStore((state) => state.setcurrentPage)
  const setauthToken = useBearStore((state) => state.setauthToken)

  const getCaptcha = async () => {
    try {
        const resp = await axios({
            method: "GET",
            url: import.meta.env.VITE_API_URL + `/captcha`,
            withCredentials: true,
          })

        if (resp.data.success === "true"){
          setcaptchaQuestion(resp.data.solution)
          setcaptchaList(resp.data.captchas)
        }
        else{
          throw new Error("success from api was false")
        }

    } catch (err) {
        setcaptchaQuestion("Captcha service is not working properly, please try again later.")
        console.log(err)
    }
  }

  const checkCaptcha = async (token, index) => {
    try {
        const resp = await axios({
            method: "POST",
            url: import.meta.env.VITE_API_URL + `/captcha/${index}/${token}`,
            withCredentials: true,
          })

        if (resp.data.success === "true"){
          setauthToken(resp.data.token)
          setcurrentPage("Import")
        }

        else {
          getCaptcha()
        }

    } catch (err) {
      setcaptchaQuestion("Captcha service is not working properly, please try again later.")
      setcaptchaList([])
      console.log(err)
    }
  }

  const captchaHandler = (index) => {
    ReactRecaptcha3.getToken().then((token) => {
        checkCaptcha(token, index)
      },
      (error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    ReactRecaptcha3.init(import.meta.env.VITE_RECAPTCHA_V3_SITEKEY)
    getCaptcha()
  }, [])

  return (
    <div className="captcha-container">
      <div className="header">
        <img src={logo} alt="Logo" />
      </div>
      <div className="body">
        <p>Human Verification</p>
        <p>{captchaQuestion}</p>
      </div>
      <div className="footer">
          {captchaList.map((captcha, index) => <img key={index} src={captcha} alt="captcha solution" onClick={() => {captchaHandler(index)}} />)}
      </div>
    </div>
  )
}

export default Captcha