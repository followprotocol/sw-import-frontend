import "./Import.css"
import { useEffect, useState, Fragment } from "react"
import useBearStore from "../../state/State";
import axios from "axios";

// ASSETS
import logo from "../../assets/logo.png"
import loading from "../../assets/loading.png"
import error from "../../assets/error.png"
import info from "../../assets/info.png"
import gold from "../../assets/gold.png"
import token from "../../assets/token.png"

const Import = () => {

  const [status, setStatus] = useState("Loading");

  const [snapshot, setsnapshot] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [sex, setsex] = useState("");
  const [cl, setcl] = useState("");
  const [itemsCount, setitemsCount] = useState("");
  const [totalItemsGoldValue, settotalItemsGoldValue] = useState("");
  const [totalItemsTokensValue, settotalItemsTokensValue] = useState("");

  const sessionId = useBearStore((state) => state.sessionId);
  const authToken = useBearStore((state) => state.authToken);
  
  const submitImportFormHandler = async (e) => {
    e.preventDefault();
    console.log("handle the data here");
  }

  const getPlayerInfo = async (sessionId) => {
    try {
        const resp = await axios({
            method: "POST",
            headers: {
              "Authorization": `${authToken}` 
            },
            url: import.meta.env.VITE_API_URL + `/getinfo/${sessionId}`,
          });

        if (resp.data.success === "true"){
          setsnapshot(resp.data.detail.snapUrl)
          setfirstName(resp.data.detail.firstName)
          setlastName(resp.data.detail.lastName)
          setsex(resp.data.detail.sex)
          setcl(resp.data.detail.cl)
          setitemsCount(resp.data.detail.itemsCount)
          settotalItemsGoldValue(resp.data.detail.totalItemsGoldValue)
          settotalItemsTokensValue(resp.data.detail.totalItemsTokensValue)
          setStatus("Success");
        }
        else{
          throw new Error();
        }

    } catch (err) {
        console.log(err)
        setStatus("Error");
    }
  }

  useEffect(() => {
    getPlayerInfo(sessionId)
  }, [])

  if (status === "Loading") {
  return (
    <Fragment>
      <div className="import-container">
        <div className="header">
          <img src={logo} alt="Logo" />
        </div>
          <div className="status">
            <img src={loading} id="loading" alt="Loading.." />
            <h1>Loading ..</h1>  
          </div>
      </div>
    </Fragment>
    );
  }

  else if (status === "Error") {
    return (
      <Fragment>
        <div className="import-container">
          <div className="header">
            <img src={logo} alt="Logo" />
          </div>
            <div className="status">
            <img src={error} id="error" alt="Error" />
              <h1>Unexpected error, try again later..</h1>  
            </div>
        </div>
      </Fragment>
      );
    }

  else return (
    <div className="import-container">
        <div className="header">
          <img src={logo} alt="Logo" />
        </div>
        <div className="body">
            <form className="form" id="submitImport" onSubmit={submitImportFormHandler}>
              <div className="avatar">
                <img src={snapshot} alt="avatar" />
              </div>
              <div className="details">
                <li className="li">
                  <img src={info} className="img" alt="info" />
                  <label className="label">First Name: {firstName}</label>
                </li>
                <li className="li">
                  <img src={info} className="img" alt="info" />
                  <label className="label">Last Name: {lastName}</label>
                </li>
                <li className="li">
                  <img src={info} className="img" alt="info" />
                  <label className="label">Sex: {sex}</label>
                </li>
                <li className="li">
                  <img src={info} className="img" alt="info" />
                  <label className="label">Total Items: {itemsCount}</label>
                </li>
                <li className="li">
                  <img src={info} className="img" alt="info" />
                  <label className="label">Citizen Level: {cl} (NOT ACCURATE, FIX IN API)</label>
                </li>
                <li className="li">
                  <img src={gold} className="img" alt="info" />
                  <label className="label">Total Gold Networth: {totalItemsGoldValue}</label>
                </li>
                <li className="li">
                  <img src={token} className="img" alt="info" />
                  <label className="label">Total Token Networth: {totalItemsTokensValue}</label>
                </li>
              </div>
            </form>
        </div>
          <div className="footer">
            <button className="orange-button" form="submitImport" type="submit" disabled={true}>DEMO ENDS HERE</button>
          </div>
    </div>
  );
}

export default Import;