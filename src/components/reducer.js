
export const initialstate={
    user:null
}
export const actiontypes={
    SET_USER:"SET_USER"
}
const reducer = (state,action) => {
    console.log(action);
    switch(action.type){
        case actiontypes.SET_USER: 
        return{
         ...state,
         user:action.user,

        }
        default:
            return state
    }
}

export default reducer
