export interface User {
    email: string;
    username: string;
    name: string;
    picture: string;
    password: string;
  }
  

  // for navigation to update/reuse the add journal form
export type RootStackParamList = {
  Home: undefined;
  JournalList: undefined; 
  AddJournal: { journal?: { id: string; title: string; content: string; category: string } }; // Define `journal` parameter as optional
  JournalDetail: { id: any };
  Summary: any;
  Auth: undefined;
  Journal: undefined;
  tabs: undefined;
};



