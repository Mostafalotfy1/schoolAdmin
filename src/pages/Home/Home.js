import react from 'react';
import Container from 'react-bootstrap/Container';
import { Button } from '@material-ui/core'
import './Home.css';
import { useHistory } from "react-router-dom"
import TittleLoginAndSignUpCards from '../../components/TittleLoginAndSignUpCards/TittleLoginAndSignUpCards'
const Home = () => {
  const history = useHistory()

  const LoginPage = () => {
    history.push("/Login")
  };
  const token = localStorage.getItem('token')
  token != null ?  history.push("/dashboard") : console.log(" ")

  return (
    <>
      <Container fluid className="HomeDashbord">
        <div className="overlay"></div>
        <div className="containerbtns">
          <div className="tittle">
            <TittleLoginAndSignUpCards tittleValue="Welcome To MMNP - dashboard" />
          </div>
          <Button variant="contained" color="secondary" className="hometbnl" onClick={LoginPage}>
            Login
          </Button>

        </div>
      </Container>
    </>
  );
};
export default Home;
