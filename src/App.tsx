import React, { useEffect } from 'react';
import './App.css';
import { RootState, Dispatch } from './store'
import { useSelector, useDispatch} from 'react-redux'
import Actions from './components/Actions';
import UnreadMails from './components/UnreadMails';
import SavedMails from './components/SavedMails';

function App() {

  const { unreadMails, savedMails, removedMails } = useSelector((state: RootState) => state.Mail);
  const dispatch = useDispatch<Dispatch>();

  useEffect(()=> {
  }, []);

  return (
    <>
      <div className='w-full h-full'>
        <div className="container mx-auto main">
            <Actions/>
            <UnreadMails/>
            <SavedMails/>
        </div>
      </div>
    </>
     
  );
}

export default App;
