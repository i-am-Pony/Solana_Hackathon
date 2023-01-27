


// ---

// place inside MainMenu.js

// reducer
function reducer(state = initState, action) {
    switch (action.type) {
      case LOAD_NFT:
        emitter.emit("LOAD_NFT", action);
        return { ...state };
      case STARTGAME:
        emitter.emit("STARTGAME", action);
        return { ...state };
      default:
        return state;
    }
  }
  
  // event types
  export const LOAD_NFT = "LOAD_NFT";
  let valid_nft_image = "";
  
  // place inside MainMenu.js constructor()