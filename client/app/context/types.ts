export interface User {
    email: string;
    username: string;
    name: string;
    picture: string;
    password: string;
  }
  

  // for navigation to update/reuse the add journal form
export type RootStackParamList = {
  JournalList: undefined; // No parameters expected for this screen
  AddJournal: { journal?: { id: string; title: string; content: string; category: string } }; // Define `journal` parameter as optional
};
