
export const ListReducer = (state, action) => {
switch (action.type) {
    case 'LISTOFTEN' :
       return action.payload.allTweets.slice((action.payload.currentPage-1)*10, ((action.payload.currentPage-1)*10)+10)
    default : return state;
}
}