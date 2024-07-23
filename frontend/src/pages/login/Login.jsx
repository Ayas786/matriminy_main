import { useState, useEffect, useContext} from 'react';
import img1 from '../../assets/pexels-edmond-dantes-4344677.jpg';
import img2 from '../../assets/pexels-n-voitkevich-6214471.jpg';
import img3 from '../../assets/pexels-rocsana99-948185.jpg';
// import { loginCall } from '../../context/customHooks/Api';
import google from '../../assets/New folder/google.png'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
// import { AuthContext } from '../../context/customHooks/AuthContext';
import { toast } from 'react-toastify';


const images = [img1, img2, img3];



function Login() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
 
 
  // const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate()
  const handleGoogleSignup = () => {
    window.location.href = 'http://localhost:8083/api/auth/google';
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [currentImageIndex]);


  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMethod, setLoginMethod] = useState('email'); // 'phone' or 'email'

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  // const handleLogin = async () => {
  //   const loginData = loginMethod === 'phone' ? { phoneNumber, password } : { email, password };
  //   try {
  //     await loginCall(loginData, dispatch);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleLogin = async () => {
    try {
      const loginData = loginMethod === 'phone' ? { phoneNumber, password } : { email, password };
      console.log(loginData);
      const response = await axios.post('http://localhost:8083/api/auth/login', loginData, { withCredentials: true });
      console.log(response);
      const token = response.data
      console.log(token);
      if (response.data.message === "login successful") {
        navigate('/home');
      } else {
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      alert('Login failed. Please check your credentials and try again.');
      console.error('Login error:', error);
    }
  };


    



  const createAccount = () => {
    navigate('/google')
   };

  return (
    <div className="flex items-center justify-center min-h-90vh h-fit">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome back</span>
          <span className="font-light text-gray-400 mb-8">
            Welcome back! Please enter your details
          </span>
          {loginMethod === 'phone' ? (
            <div className="py-4">
              <input
                type="tel"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="phoneNumber"
                value={phoneNumber}
                id="email"
                placeholder="Enter your phoneNumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          ) : (
            <div className="py-4">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
                value={email}
                placeholder="Enter your e-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}
          <div className="py-4">
            <input
              type="password"
              name="pass"
              id="pass"
              placeholder="Password"
              value={password}
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between w-full py-4">
            <div className="mr-24">
              <input type="checkbox" name="ch" id="ch" className="mr-2" />
              <span className="text-md">Remember for 30 days</span>
            </div>
            <span className="font-bold text-md">Forgot password</span>
          </div>
          <button
            className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
            onClick={handleLogin}
          >
            {/* {isFetching ? "Signing in..." :"Sign in"} */}
            Sign in
          </button>
          <button className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white" onClick={handleGoogleSignup}>
            <img src={google} alt="img" className="w-6 h-6 inline mr-2"/>
            Sign in with Google
          </button>
          <div className="text-center text-gray-400">
            Don't have an account?
            <span className="font-bold text-black" onClick={createAccount}>
              Sign up for free
            </span>
          </div>
        </div>

        <div className="relative image-section">
          <img
            src={images[currentImageIndex]}
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
