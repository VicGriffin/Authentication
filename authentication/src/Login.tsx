import { useState } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login() {

  const auth = getAuth();
  const navigate = useNavigate();

  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleGoogleLogin = async () => {
    setAuthing(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/'); // Redirect to home page after successful login
    } catch (err) {
      setError('Google login failed. Please try again.');
    } finally {
      setAuthing(false);
    }
  }
  return (
    <>
      <h1>You are logged in!</h1>
    </>
  )
}

export default Login;
