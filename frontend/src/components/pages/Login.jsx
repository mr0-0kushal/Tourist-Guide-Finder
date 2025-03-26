import React, { useState ,useContext} from 'react'
import { Container, Row , Col, Form , FormGroup ,Button } from 'reactstrap';
import { Link ,useNavigate} from 'react-router-dom';
import '../../styles/login.css'
import loginImg from '../../assets/images/login.png'
import userIcon from '../../assets/images/user.png'
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

const Login = () => {
   
  const [credentials, setCredentials] = useState({
    email:undefined,
    password: undefined
    })


    const {dispatch} =useContext(AuthContext)
    const navigate= useNavigate()

  const handleChange = e => {
    setCredentials(prev =>({...prev , [e.target.id] : e.target.value }))
   };

   const handleClick = async e=>{
    e.preventDefault();
    dispatch({ type:'LOGIN_START' });

    try{
      const res=await fetch(`${BASE_URL}/auth/login`,{
        method:'post',
        headers:{
          'content-type' : 'application/json'
        },
        credentials:'include',
        body:JSON.stringify(credentials),
      })

      const result= await res.json();

      if(!res.ok) alert(result.message);
      console.log(result.data);

      dispatch({type:'LOGIN_SUCCESS', payload:result.data})
      navigate('/');

    }catch(err){
      dispatch({type:'LOGIN_FAILURE', payload:err.message})
    }
   }
   
  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className="m-auto">
            <div className="login__container d-flex justify-content-between flex flex-col md:flex-row md:w-[70%] justify-content-between rounded-2xl mx-auto">
             <div className="login__img md:w-full">
              <img src={loginImg} alt='' className="md:h-full mx-auto " />
             </div>
             <div className="login__form w-full rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">
              <div className="user">
                <img src={userIcon} alt="" />
              </div>
              <h2>Login</h2>
              <Form onSubmit={handleClick}>
                <FormGroup>
                  <input type="email" placeholder="Email" required id="email"
                  onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <input type="password" placeholder="Password" required id="password"
                  onChange={handleChange} />
                </FormGroup>
                <Button className="btn secondary__btn auth__btn" type="submit">
                  Login
                </Button>
              </Form>
              <p> Don't have an account? <Link to='/register'> Register Here!</Link></p>
             </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login
