import uuidv4 from 'uuid/v4'
import moment from 'moment'


let notes=[]


//read existing notes from local storage
const loadNotes = ()=>{

    const noteJSON = localStorage.getItem('notes')
    try{
        return noteJSON ? JSON.parse(noteJSON):[]
    }
    catch(e){
        return []
    }

   
    
}

//expose notes from module

const getNotes = ()=> notes

const createNote = ()=>{
    const newId = uuidv4()
    const now = moment().valueOf()
    notes.push({
        id:newId,
        title:'',
        body:'',
        createdAt:now,
        updatedAt:now

    })
    saveNotes()
    return newId

}




//save notes

const saveNotes=()=>{
    localStorage.setItem('notes',JSON.stringify(notes))
}

//remove a note from the list

const removeNote = (id)=>{
    const noteIndex = notes.findIndex((note)=> note.id === id)

    if(noteIndex>-1){
        notes.splice(noteIndex,1)
        saveNotes()
    }
}


//sort notes

const sortNotes = (sortBy)=>{



    if(sortBy==='byEdited'){

        return notes.sort((a,b)=>{
            if(a.updatedAt>b.updatedAt){
                return -1
            }
            else if(a.updatedAt<b.updatedAt){
                return 1
            }
            else{
                return 0
            }
    
    

        })
   
    }
    else if(sortBy==='byCreated') {
        return notes.sort((a,b)=>{
            if(a.createdAt>b.createdAt){
                return -1

            }
            else if(a.createdAt<b.createdAt){
                return 1
            }
            else{
                return 0
            }
        })
        
    }
    else if(sortBy==='alphabetical'){
        return notes.sort((a,b)=>{
            if(a.title.toLowerCase() < b.title.toLowerCase())
            {
                return -1
            }else if(a.title.toLowerCase() >b.title.toLowerCase()){
                return 1
            }
            else{
                return 0
            }
            

        })
    }
    else{
        return notes
    }

}

const updateNote=(id,updates)=>{
    const note = notes.find((note)=>note.id===id)
    if(!note){
        return
    }

    if(typeof updates.title==='string'){
        note.title=updates.title
        note.updatedAt=moment().valueOf()
    }
    if(typeof updates.body==='string'){
        note.body=updates.body
        note.updatedAt=moment().valueOf()
    }

    saveNotes()
    return note

}


notes = loadNotes()



export { getNotes,createNote,removeNote,sortNotes,updateNote }