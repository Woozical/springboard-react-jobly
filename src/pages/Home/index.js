import UserContext from "../../UserContext";
import BackgroundVideo from "../../components/BackgroundVideo";
import splashVid from "../../media/videos/AdobeStock_97955626.mov";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const HomePage = () => {
  const { currentUser, firstTimeLogin } = useContext(UserContext);
  return (
    <main className="pt-3 pb-2 text-center">
      <BackgroundVideo videoSrc={splashVid} opacity={0.2} />
      <div className="HomePage container mt-5 col-md-8 offset-md-2">
        <h1 >Jobly</h1>
        <p >All the jobs in one convenient place.</p>
        <br />
        { currentUser ?
          <h3>Welcome{firstTimeLogin ?  "" : " back"}, {currentUser.firstName}!</h3>
          :
          <div className="row">
            <Link className="col-sm-3 offset-sm-2 mt-2 btn btn-lg btn-primary mr-2" to="/login">Login</Link>
            <Link className="col-sm-3 offset-sm-2 mt-2 btn btn-lg btn-primary ml-2" to="/signup">Signup</Link>
          </div>
        }
      </div>
    </main>
  )
}

export default HomePage;