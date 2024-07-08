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
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => 
{
  const [current_user, setCurrentUser] = useState<User | null>(null);
  const [token_pair, setTokenPair] = useState<TokenPair | null>(null);
  const [isSignup, setIsSignup] = useState<boolean>(false);

  
  useEffect(() => {
    const getAuthTokens = async () => {
      try {
        const tokens = await AsyncStorage.getItem('TOKEN_PAIR');
        if (tokens) {
          setTokenPair(JSON.parse(tokens));
          console.log("UseEffect");
          
        }
      } catch (error) {
        console.error('Failed to load auth tokens', error);
      }
    };

    getAuthTokens();
  }, []);


  
  console.log("TOKEn ",token_pair);
// AsyncStorage.removeItem("TOKEN_PAIR");


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
        console.log(data);
        
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
    console.log('====================================');
    console.log("Logout called");
    console.log('====================================');
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
              });
      }
    
  }, [token_pair?.access]);



  console.log("current_user ", current_user);
  
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
  if (!context) {
    throw Toast.error('useAuth must be used within an AuthProvider', "top");
  }
  return context;
  
};
