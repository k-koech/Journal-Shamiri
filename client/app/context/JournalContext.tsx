import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { server_url } from '../../config.json';
import { AuthContext, useAuthContext } from './AuthContext';
import { Toast } from 'toastify-react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the Journal  type
export type JournalEntry = {
  id: number;
  title: string;
  content: string;
  category: 'Personal' | 'Work' | 'Travel' | 'Other';
  date: string;
};

// Define the Summary type
export type Summary = {
  start_date: string;
  end_date: string;
  total_entries: number;
  entries_by_category: { category: string; total: number }[];
  entries: JournalEntry[];
};



interface JournalContextType {
  journals: JournalEntry[];
  createJournal: (form_data: JournalEntry ) => void;
  updateJournal: (entryId: number, data: Partial<JournalEntry>) => void;
  deleteJournal: (entryId: number) => void;
  // getSummaryBetweenDates: (startDate: string, endDate: string) => void;

  onJournalChange: boolean;
 setOnJournalChange: (value: boolean) => void;
}

export type RootStackParamList = {
  Home: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export const JournalContext = createContext<JournalContextType | undefined>(undefined);



export const JournalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const navigation =useNavigation<HomeScreenNavigationProp>();

  const [journals, setJournals] = useState<JournalEntry[]>([]);

  const [onJournalChange, setOnJournalChange] = useState<boolean>(false);

  const {token_pair} =useAuthContext();



  // Function to create a new journal entry
  const createJournal = (form_data: JournalEntry) => {
    fetch(`${server_url}/journal-entry`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token_pair?.access}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form_data),
    })
    .then(res => res.json())
    .then((response)=> {
        if(response.success){
            Toast.success('Journal created successfully');
            setOnJournalChange(!onJournalChange);
        }
        else if(response.error){
            Toast.error(response.error, 'top');
        }
        else{
            Toast.error('Error creating journal entry:', 'top');
        }

    }) 
    .catch(error => Toast.error('Error creating journal entry:', "top"));
  };

  

  // Function to edit a journal
  const updateJournal = (entryId: number, data: Partial<JournalEntry>) => {
    
    fetch(`${server_url}/journal-entry/${entryId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token_pair?.access}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then((response)=> {
        if(response.success){
            Toast.success('Journal updated successfully');
            setOnJournalChange(!onJournalChange);
            navigation.navigate('JournalDetail', { id: entryId });
        }
        else if(response.error){
            Toast.error(response.error, 'top');
        }
        else{
            Toast.error('Error creating journal entry:', 'top');
        }
       
    })
    .catch(error => Toast.error('Error editing journal entry:', "top"));
  };


  // Function to delete a journal entry
  const deleteJournal = (entryId: number) => {
    fetch(`${server_url}/journal-entry/${entryId}/delete`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token_pair?.access}`,
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then((response)=> {
        if(response.success){
            Toast.success('Journal deleted successfully');
            setOnJournalChange(!onJournalChange);
            navigation.navigate('Home')
        }
        else if(response.error){
            Toast.error(response.error, 'top');
        }
        else{
            Toast.error('Error deleting journal entry:', 'top');
        }
    }) 
    .catch(error => Toast.error('Error deleting journal entry:', "top"));
  };




    // Fetch all journal entries
    useEffect(() => {
        if(token_pair?.access)
        {
            fetch(`${server_url}/journal-entries`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token_pair?.access}`,
                  'Content-Type': 'application/json',
                },
              })
              .then(response => response.json())
              .then(data => {
                 data instanceof Array &&  setJournals(data)

              })
              .catch(error => Toast.error('Error fetching journal entries:', "top"));
        }

      }, [token_pair, onJournalChange]);

      console.log("ppppppp xx ", journals);
      

  return (
    <JournalContext.Provider
      value={{
        journals,
        createJournal,
        updateJournal,
        deleteJournal,

        onJournalChange,
        setOnJournalChange,

      }}
    >
      {children}
    </JournalContext.Provider>
  );
};

// Custom hook to use the JournalContext
export const useJournalContext = () => {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};
