import { createModel } from "@rematch/core";
import { RootModel } from ".";

export interface IMail {
  id: string;
  date: Date;
  subject: ISubject;
  sender: IAccount;
  receiver: IAccount;
  content: string;
  tags: string[];
  attachments?: number;
}

export interface IAccount {
  id: string;
  name: string;
  email: string;
}

export interface ISubject {
  id: string;
  code: string;
  name: string;
}

export interface State {
  unreadMails: IMail[];
  savedMails: IMail[];
  removedMails: IMail[];
  selectedIds?: string[];
}

const initialState = {
  unreadMails: [
    {
      id: 'abc123', 
      date: new Date('12 Jan 2021 03:41 pm'), 
      subject: {
        id: 'subject1',
        code: 'NEW-10707/1715',
        name: 'New project 3'
      }, 
      sender: {
        id: 'user1',
        name: 'Leo M\'anoban',
        email: 'sbtest.khr@gmail.com'
      },
      receiver: {
        id: 'user2',
        name: 'Isabel Bowen',
        email: 'sbtest.isabel@gmail.com'
      }, 
      content: 'Test',
      tags: ['New Project 3/admin', 'New Project 3', 'Mountain Homes Contruction/New Matter', 'Mountain Homes Construction'],
      attachments: 5
    },
    {
      id: 'def456', 
      date: new Date('12 Jan 2021 03:41 pm'),
      subject: {
        id: 'subject2',
        code: 'NEW-10708/1716',
        name: 'New project 1'
      }, 
      sender: {
        id: 'user1',
        name: 'Leo M\'anoban',
        email: 'sbtest.khr@gmail.com'
      },
      receiver: {
        id: 'user2',
        name: 'Isabel Bowen',
        email: 'sbtest.isabel@gmail.com'
      }, 
      content: 'Test',
      tags: ['Mountain Homes Contruction', 'New Project 1', 'test3', 'test4', 'test5', 'test6']
    },
    {
      id: 'ghi789', 
      date: new Date('12 Jan 2021 03:41 pm'),
      subject: {
        id: 'subject3',
        code: 'JON-9001/540',
        name: 'Related Email 学中文 Test_Barrister_Brief'
      }, 
      sender: {
        id: 'user1',
        name: 'Leo M\'anoban',
        email: 'sbtest.khr@gmail.com'
      },
      receiver: {
        id: 'user2',
        name: 'Isabel Bowen',
        email: 'sbtest.isabel@gmail.com'
      }, 
      content: 'Test',
      tags: ['Jona Alonzo/ABCD Inc. Dispute MES', 'Jona Alonzo', 'test3', 'test4'],
      attachments: 1
    },
  ],
  savedMails: [
    {
      id: 'jkl0101112', 
      date: new Date('12 Jan 2021 03:41 pm'),
      subject: {
        id: 'subject4',
        code: 'JON-9001/540',
        name: 'With Matter Number 3'
      }, 
      sender: {
        id: 'user1',
        name: 'Leo M\'anoban',
        email: 'sbtest.khr@gmail.com'
      },
      receiver: {
        id: 'user2',
        name: 'Isabel Bowen',
        email: 'sbtest.isabel@gmail.com'
      }, 
      content: 'Test',
      tags: ['With Matter Number 3/admin', 'With Matter Number 3', 'test3', 'test4', 'test5']
    },
  ],
  removedMails: [],
  selectedIds: []
} as State

export const Mail = createModel<RootModel>()({
  state: initialState, // initial state
  reducers: {
    // handle state changes with pure functions
    addNewMail(state, payload: IMail) {
      return { ...state, unreadMails: [...state.unreadMails, payload] }
    },
    addToSavedMails(state) {
      const ids = state.selectedIds || [];
      let newSavedMail:any = [];
      const newUnreadMails = state.unreadMails.filter(mail=> !ids.includes(mail.id));
      const savedMails = state.unreadMails.filter(mail=> ids.includes(mail.id));
      if (savedMails.length){ 
        savedMails.forEach(unreadMail => newSavedMail.push(unreadMail));
      }
      return {
        ...state, 
        unreadMails: newUnreadMails,
        savedMails: newSavedMail ? [...state.savedMails, ...newSavedMail] : state.savedMails
      }
    },
    deleteMail(state) {
      const ids = state.selectedIds || [];
      const newUnreadMails = state.unreadMails.filter(mail=> !ids.includes(mail.id));
      const newSavedMails = state.savedMails.filter(mail=> !ids.includes(mail.id));
      return {...state, unreadMails: newUnreadMails, savedMails: newSavedMails}
    },
    selectAllIds(state) {
      const unreadMailsIds = state.unreadMails.map(mail=> mail.id);
      const savedMailIds = state.savedMails.map(mail=> mail.id);
      const ids = [...unreadMailsIds, ...savedMailIds];
      return {...state, selectedIds: ids};
    },
    unselectAllIds(state) {
      return {...state, selectedIds: []};
    },
    getSelectedIds(state, event: boolean, id: string) {
      let ids = state.selectedIds || [];
      if (event) {
        ids = [...ids, id];
      } else {
        ids = ids.filter(item=> item !== id);
      }
      return {...state, selectedIds: ids}
    },
    resetSelectedIds(state) {
      return {...state, selectedIds: []}
    }
  },
  effects: (dispatch) => ({
    
  }),
});