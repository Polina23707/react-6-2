import { useState } from 'react'
import './App.css'
import Note from './components/Note';

interface NoteType {
  id: number,
  content: string,
}

function App() {
  const [list, setList] = useState<NoteType[]>([])
  const [text, setName] = useState('');

  const updateNotes = (e: any) => {
    e.preventDefault();
    getList();
  }

  const addNewNote = (e: any) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      content: text,
    }
    createNote(newPost);
    getList();
  }

  function onDeleteNote(e: any) {
    e.preventDefault();
    deleteNote(e);
    getList();
  }

  function getList() {
    fetch('http://localhost:7070/notes', {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
      setList([...data]);      
    })
  }

  function deleteNote(e: any) {
    fetch('http://localhost:7070/notes/' + e.target.id, {
      method: 'DELETE',
    })
  }

  function createNote(note: NoteType) {
    fetch('http://localhost:7070/notes', {
      method: 'POST',
      body: JSON.stringify(note),
    })
  }

  return (
    <>
      <div>
        <div className='header'>
          <h2>Notes</h2>
          <button className='update-btn' onClick={updateNotes}>✔</button>
        </div>
        <div className='note-container'>
          {list.map((note) => 
            <Note id={note.id} text={note.content} key={note.id} onDeleteNote={onDeleteNote}/>
          )} 
        </div>
      </div>  

      <div className="input-container">
        <div className='form-row'>
          <label>New note</label>
          <div className='text-container'>
            <textarea className='textarea' onChange={e => setName(e.target.value)}></textarea>
            <button className='addNote-btn' onClick={addNewNote}>➤</button>
          </div>
        </div>
      </div>  
    </>
  )
}

export default App;
