import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { server_url } from '../../config.json';
import { AuthContext } from './AuthContext';
import { Toast } from 'toastify-react-native';

// Define the Journal Entry type
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

// Define the context value type
interface JournalContextType {
  journals: JournalEntry[];
  createJournal: (form_data: JournalEntry ) => void;
  updateJournal: (entryId: number, data: Partial<JournalEntry>) => void;
  deleteJournalEntry: (entryId: number) => void;
  getSummaryBetweenDates: (startDate: string, endDate: string) => void;
}

// Create the JournalContext
const JournalContext = createContext<JournalContextType | undefined>(undefined);



export const JournalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const {token_pair} = useContext(AuthContext);


  // Function to create a new journal entry
  const createJournal = (form_data: JournalEntry) => {
    fetch(`${server_url}/journal-entry/`, {
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
        }
        else if(response.error){
            Toast.error(response.error, 'top');
        }
        else{
            Toast.error('Error creating journal entry:', 'top');
        }

    }) 
    .catch(error => Toast.error('Error creating journal entry:', error));
  };

  

  // Function to edit a journal entry
  const updateJournal = (entryId: number, data: Partial<JournalEntry>) => {
    fetch(`${server_url}/journal-entry/${entryId}/`, {
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
        }
        else if(response.error){
            Toast.error(response.error, 'top');
        }
        else{
            Toast.error('Error creating journal entry:', 'top');
        }
       
    })
    .catch(error => console.error('Error editing journal entry:', error));
  };


  // Function to delete a journal entry
  const deleteJournalEntry = (entryId: number) => {
    fetch(`${server_url}/journal-entry/${entryId}/`, {
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
        }
        else if(response.error){
            Toast.error(response.error, 'top');
        }
        else{
            Toast.error('Error creating journal entry:', 'top');
        }
    }) 
    .catch(error => console.error('Error deleting journal entry:', error));
  };




    // Fetch all journal entries
    useEffect(() => {
        fetch(`${server_url}/journal-entries/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token_pair?.access}`,
            'Content-Type': 'application/json',
          },
        })
        .then(response => response.json())
        .then(data => setJournals(data))
        .catch(error => console.error('Error fetching journal entries:', error));
      }, [token_pair]);

  return (
    <JournalContext.Provider
      value={{
        journals,
        createJournal,
        updateJournal,
        deleteJournalEntry,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};

// Custom hook to use the JournalContext
export const useJournal = () => {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};
