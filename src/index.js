import {createNote} from './notes'

import {setFilters } from './filters'

import {renderNotes} from './views'




const user = {
    name:'Nitesh',
    age : 28
}



renderNotes() // it will display the whole note once


document.querySelector('#create-note').addEventListener('click',(e)=>{
 
    const newId=createNote()
    location.assign(`/edit.html#${newId}`)

})

'use strict'

//live data input
document.querySelector('#search-text').addEventListener('input',(e)=>{
    
    setFilters({
        searchText:e.target.value
    })
    renderNotes() // it will call with every live input

})

//checkbox
document.querySelector('#filter-by').addEventListener('change',(e)=>{

    setFilters({
        sortedBy:e.target.value

    })
    renderNotes()

})


window.addEventListener('storage',(e)=>{
    if(e.key==='notes'){
        renderNotes()
    }
})