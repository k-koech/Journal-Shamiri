import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from './types';
import { server_url } from '../../config.json'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'toastify-react-native';



interface AuthContextType {
  isSignup: boolean;
  current_user: User | null;
  token_pair: { access_token: string, refresh_token: string };
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (userData: Partial<User>) => void;
  updateProfile: (userData: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => 
{
  const [current_user, setCurrentUser] = useState<User | null>(null);
  const [token_pair, setTokenPair] = useState( AsyncStorage.getItem("TOKEN_PAIR")? AsyncStorage.getItem("TOKEN_PAIR"): { access_token: '', refresh_token: '' });

  const [isSignup, setIsSignup] = useState<boolean>(true);


  // Login function
  const login = (email: string, password: string) => {
    fetch(`${server_url}/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.access_token) 
        {
            Toast.success('Login Success')
            setTokenPair(data);
            AsyncStorage.setItem("TOKEN_PAIR", data);
        }
        else
        {
            Toast.error('Login Failed', "top")

        }

    });
  };

  // Logout function
  const logout = () => {
    fetch(`${server_url}/user/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token_pair?.access_token}`
      }
    })
      .then(response => response.json())
      .then(() => {
        Toast.success('Logout Success')
        AsyncStorage.removeItem("TOKEN_PAIR");
        setCurrentUser(null);
      });
  };


  // Register user function
  const register = (userData: Partial<User>) => {
    fetch(`${server_url}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(data => {
        if(data.success){
            Toast.success(data.success)

            setIsSignup(false);

        }
        else if(data.error){
            Toast.error(data.error, "top")
        }
        else{
            Toast.error('Registration Failed', "top")
        }
     
        
      });
  };

  // Update profile function
  const updateProfile = (userData: Partial<User>) => {
    fetch(`${server_url}/user/update`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token_pair.access_token}`
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) 
            {
                Toast.success('Profile Update Success')
            }
            else
            {
                Toast.error('Login Failed', "top")
    
            }
        
      });
  };

//   fetch current user
// useEffect(()=>{
//     if(token_pair.access_token)   
//     {
//         fetch(`${server_url}/user/current_user`, {
//         headers: {
//             Authorization: `Bearer ${token_pair.access_token}`
//         }
//         })
//             .then(response => response.json())
//             .then(data => {
//                 setCurrentUser(data.user);
//             });
//     }
//     else
//     {
//         setCurrentUser(null);
//         setTokenPair({ access_token: '', refresh_token: '' });
//     }
// }, [token_pair]);


  const contextData = {
    current_user,
    login,
    logout,
    register,
    updateProfile,

    isSignup,
    setIsSignup
  }

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
