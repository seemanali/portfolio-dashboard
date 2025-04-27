import React, { useState } from 'react';
import { Mail, Lock, LogIn, Loader } from 'lucide-react';
import authservice from "../AppwriteService/authservice"
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {login} from "../Redux_STORE/Reducers"

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate login process
      let Loginstatus = await authservice.LoginAsAdmin(email , password);
      if(Loginstatus.success){
        dispatch(login())
       navigate("/");
      }
      else{
        setError(Loginstatus.error);
      }

    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-600 text-white p-3 rounded mb-4 text-center">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="pl-10 w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="pl-10 w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin mr-2" />
            ) : (
              <LogIn className="mr-2" />
            )}
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
