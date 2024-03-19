import { createContext, useContext, useReducer } from "react";


export const BookMarkContext = createContext();

const initialState = {
  bookmarks: [] // tom array (ska bli array av bookmark-objekt)
}

function bookMarkReducer(state, action) {

  if (action.type === "add") {
    return {
      ...state,
      bookmarks: [
        ...state.bookmarks,
        {
          // vill vi spara något mer eller räcker id och hämtar resten ifrån APIt?
          id: action.id
        }
      ]
    }
  } else if (action.type === "delete" ) {
    // what if article is not in bookmark but we click delete?
    const filteredBookmarks = state.bookmarks.filter((bookmark) => {
      return action.id !== bookmark.id; 
    })
    return {
      ...state,
      bookmarks: filteredBookmarks
    }
  } else if (action.type === "clear" ) {
      return {
        ...state,
        bookmarks: []
      }
  }
  else { // unknown action type  
    console.log("Unknown action type: " + action.type);
    return state;
  }

}

export function BookMarkProvider ( {children} ) {

  const [state, dispatch] = useReducer(bookMarkReducer, initialState)

  return (
    <BookMarkContext.Provider value={{state, dispatch}}>
      {children}
    </BookMarkContext.Provider>
  )

}

export function useBookMark() {
  return useContext(BookMarkContext);
}