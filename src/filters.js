


const filters = {
    searchText:'',
    sortedBy:'byEdited'
}


const getFilters=()=> filters

const setFilters=(updates)=>{
    if(typeof updates.searchText==='string'){
        filters.searchText=updates.searchText
    }
    if(typeof updates.sortedBy ==='string'){
        filters.sortedBy=updates.sortedBy
    }


}


export { getFilters,setFilters }