
export const Display = (state, action) => {
    switch (action.type) {
        case 'BLUEBACK' :
           return action.payload.allTweets.slice((action.payload.currentPage-1)*10, ((action.payload.currentPage-1)*10)+10)
        case 'WHITEBACK' :
        return {style background-color : white}
           default : return state;
    }
    }