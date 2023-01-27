// code from App.jsx to re-insert at later date

import axios from "axios";
import MainMenu, { nftEvents, LOAD_NFT, APPROVED } from "./../scenes/MainMenu.js";
import {
    useMoralis,
  // import the NFT component
  useNFTBalances,
  // P2E integration: 1. import for contracts
  useWeb3ExecuteFunction,
} from "react-moralis";  
// 2. declare func that allows us to grab NFTs from user's wallet
const { getNFTBalances } = useNFTBalances();
// 3 declare contract address the game deems valid, allows access to player
const check_address = "0x"; // our NFT contract
const network_chain_id ="0xxx" // chain you want to target

const nftMetadata = [];
const findNFTMetadata = async (___data) => {
  let p = 0;
  for (let i = 0; i < ___data.length; i++) {
    console.log(___data[i].token_address);
    if (___data[i].token_address === check_address) {
        console.log(___data[i].token_uri);
        nftMetadata[p] = ___data[i].token_uri;
        p++;
    }
  }
};

let demoNFTimageURL = "";
const getJSON = async (_metadata) => {
    try {
      // grab json file (IPFS)
      await axios.get(_metadata).then((res) => {
        console.log("Initial Image URL:", res.data?.image);
        // set the URL
        demoNFTimageURL = res.data?.image;
        // if already a moralis ipfs, then skip processing
        if (demoNFTimageURL.match("moralis")) {
        } else {
            let imageSplit = res.data?.image.split("/");
          console.log("IMAGE CID:", res.data?.image.split("/"));

      demoNFTimageURL =
          "https://ipfs.moralis.io:2053/ipfs/" +
          imageSplit[2] +
          "/" +
          imageSplit[3];
      }
    });
  }catch (error) {
    console.error(error);
  }
};

// 4 Check user balance
const checkNFTBalance = async (__user) => {
    let valid = false;
    await getNFTBalances({
        params: {
            chain: network_chain_id,
        },
    })
    .then(function (_data) {
        console.log(_data);
       // check for matching results in user's wallet
       if (!_data || _data?.result.length === 0) { 
        // no NFTs = false
        console.log("No NFTs");
        authEvents.dispatch({ type: AUTH, player: null });
        logout();
        console.log("User Logged-Out");
    } else {
        valid = data.result.some(
            (elem) => elem.token_address === check_address
        );

        if (valid) {
            // NFT in wallet
            console.log("ACCESS DENIED: NO VALID NFT FOUND");
        }
    }
  })
  .catch(function (error) {
    console.log(error);
  });
  return valid;
};
// begin check: NFT from contract 0x…
//checkNFTBalance(_user);

// 5.
// NFT metadata to locate image
const compileNFT = async (___user, __data) => {
    await findNFTMetadata(__data);
    await getJSON(nftMetadata[0]);
    console.log("Final NFT Image URL:", demoNFTimageURL);

    if (demoNFTimageURL === "") {
    } else {
      // NFT holders can play; change scene within Phaser
      // communicate that with Phaser component
      // --> 6. is in MainMenu.js -->
      nftEvents.dispatch({ type: LOAD_NFT, nft: demoNFTimageURL });
      // start game
      startGame(__user);
    }
}; 

// add logout func within Phaser game UI/UX
/*
  const logOut = async () => {
    await logout();
    console.log("logged out");
  };
  */

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

// 6. display image from metadata (demoNFTimageURL = event.nft) in game
// set-up event handler for loading NFT
/*
    emitter.on("LOAD_NFT", (event) => {
        // check user has signed-in: id exists
        console.log("NFT:", event.nft);
        // set it for use later
        valid_nft_image = event.nft;
 });
 */

 //7 we need to load outside URL in Phaser before displaying
 preload() {
    // set identifier for image url
    this.load.image("validnft", valid_nft_image);
  }

  create() {
    this.add.image(0, 00, "title");
    // 8.
    // choose NFT to display within game's mainmenu to demonstrate it worked
    this.add.image(0, 00, "validnft");
  } 