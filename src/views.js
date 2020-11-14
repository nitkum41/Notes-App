import moment from 'moment'
import { getFilters } from './filters'
import { sortNotes,getNotes } from './notes'



//generate the DOM structure for note

const generateNoteDOM=(note)=>{
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')


    //set up note title 
    if(note.title.length>0){
        textEl.textContent=note.title

    }
    else{
        textEl.textContent='untitled'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    //set up the link here
    noteEl.setAttribute('href',`/edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    //set up status message
    statusEl.textContent=generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

    return noteEl
}



//render app notes

const renderNotes = ()=>{

    const notesEl = document.querySelector('#notes')
    const filters = getFilters()
    const notes = sortNotes(filters.sortedBy)
    const renderedNotes = notes.filter((note)=>note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML='' //setting it to empty string we dont need it 

    if(renderedNotes.length>0){
            //creating new elements
        renderedNotes.forEach((note)=>{

            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)

    })

    }else{
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent='No Notes to display'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }



    

}

//

const initializeEditPage = (noteId)=>{

    const titleElement = document.querySelector('#note-title')
    const bodyElement = document.querySelector('#note-body')
    
    const dateElement =document.querySelector('#note-update')

    const notes = getNotes()
    const note = notes.find((note)=>note.id === noteId)

    if(!note)
    {
        location.assign('/index.html')
    }


    titleElement.value = note.title
    bodyElement.value = note.body
    dateElement.textContent = generateLastEdited(note.updatedAt)

}








//generate the last edited message

const generateLastEdited = (timestamp)=>`Last updated ${moment(timestamp).fromNow()}`


export {generateLastEdited,renderNotes,generateNoteDOM,initializeEditPage }