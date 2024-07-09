import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from './types';
import { server_url } from '../../config.json'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'toastify-react-native';



interface TokenPair {
  access: string;
  refresh: string;
}
interface AuthContextType {
  isSignup: boolean;
  current_user: User | null;
  token_pair?: TokenPair | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (userData: Partial<User>) => void;
  updateProfile: (userData: Partial<User>) => void;

  onChange: boolean;
  setOnchange: (value: boolean) => void;
  setIsSignup: (value: boolean) => void;
  onUpdateSuccess: boolean;
  onUpdateError: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => 
{
  const [current_user, setCurrentUser] = useState<User | null>(null);
  const [token_pair, setTokenPair] = useState<TokenPair | null>(null);
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [onChange, setOnchange] = useState<boolean>(false);

  const [onUpdateSuccess, setOnUpdateSuccess] = useState<boolean>(false);
  const [onUpdateError, setOnUpdateError] = useState<boolean>(false);

  useEffect(() => {
    const getAuthTokens = async () => {
      try {
        const tokens = await AsyncStorage.getItem('TOKEN_PAIR');
        if (tokens) {
          setTokenPair(JSON.parse(tokens));
          
        }
      } catch (error) {
      }
    };

    getAuthTokens();
  }, []);


  
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
       
        if (data.access) 
        {
            Toast.success('Login Success')
            setTokenPair(data);

            AsyncStorage.setItem('TOKEN_PAIR', JSON.stringify(data));
        }
        else if(data.error){
            Toast.error(data.error, "top")
        }
        else
        {
            Toast.error('Login Failed', "top")

        }

    });
  };

  // Logout function
  const logout = () => {
    // fetch(`${server_url}/user/logout`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token_pair?.access}`
    //   }
    // })
    //   .then(response => response.json())
    //   .then(() => {
    //     Toast.success('Logout Success')
    //     AsyncStorage.removeItem("TOKEN_PAIR");
    //     setCurrentUser(null);
    //   });
    Toast.success('Logout Success')
    AsyncStorage.removeItem("TOKEN_PAIR");
    setCurrentUser(null);
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
        Authorization: `Bearer ${token_pair?.access}`
      },
      body: userData as any
    })
      .then(response => response.json())
      .then(data => {
        setOnchange(!onChange);

        if (data.success) 
            {
                Toast.success('Profile Update Success')
                setOnUpdateSuccess(true)
                setOnUpdateError(false)
            }
        else if(data.error){
                Toast.error(data.error, "top")
                setOnUpdateSuccess(false)
                setOnUpdateError(true)

           }
        else
        {
            Toast.error('Failed to update profile!', "top")

        }
        
      });
  };

    // fetch current user
  useEffect(()=>{
      if(token_pair?.access)   
      {
          fetch(`${server_url}/user/current_user`, {
          headers: {
              Authorization: `Bearer ${token_pair?.access}`
          }
          })
              .then(response => response.json())
              .then(data => {
                if(data.email)
                  {
                  setCurrentUser(data);
                  }
                else{
                  logout();
                }
              });
      }
    
  }, [token_pair?.access, onChange]);


  
  const contextData = {
    current_user,
    login,
    logout,
    register,
    updateProfile,
    isSignup,
    setIsSignup,
    token_pair,

    onChange,
    setOnchange,
    onUpdateError,
    onUpdateSuccess
  }

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Toast.error('useAuth must be used within an AuthProvider', "top");
  }
  return context;
  
};
