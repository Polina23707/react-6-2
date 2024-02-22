interface NoteType {
  id: number,
  text: string,
  onDeleteNote: any,
}

const Note =({id, text, onDeleteNote}: NoteType) => {
  return(
      <div className="note">
        <p className="note-text">{text}</p>
        <button className='delete-btn' id={id.toString()} onClick={onDeleteNote}>Х</button>
      </div>
  )
}

export default Note;