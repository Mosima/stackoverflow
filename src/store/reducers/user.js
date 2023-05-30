// types
import { createSlice, current } from '@reduxjs/toolkit';
import offlineUser from '../../utils/user.json'

//process offline data and inserting follow key and value
let alterFollow = () => {
  offlineUser.items.forEach((item) => {
    item.follow = true
  })

  return offlineUser.items;
}

// initial state
const initialState = {
  user: alterFollow(),
  searchText: '',
  searchResult: '',
  view_user:{}
};

// ==============================|| SLICE - USER ||============================== //

// search users by name the right way
const searchUserByName = (searchString,users) => {
  // clear search result if the search field is empty
  if (searchString === "") {
    return users
  }
  // discontinue if there is no search yet
  if (searchString === null || searchString === "" || users === []) return;

  // empty the previous search array if any
  let results = [];

  // create a regular expression pattern for the search string
  const pattern = new RegExp(searchString, "gi");

  // loop through all users
  for (const user of users) {
    const userName = user.display_name;

    // check if the search word or character matches
    if (pattern.test(userName)) {
      results.push(user);
    }
  }
  return results
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      action.payload.user.items.forEach((item) => {
        item.follow = true
      })
      state.user = action.payload.user;
    },
    viewUser(state, action) {
      state.view_user = action.payload.user;
    },
    searchUser(state, action) {
      state.searchText = action.payload.searchText;
      state.searchResult = searchUserByName(action.payload.searchText, action.payload.users)
    },
    followUser(state, action) {
      const { searchResult, user} = current(state);

      state.user = user.map(user => 
        user.user_id === action.payload.user_id? {...user,follow: !user.follow}:user
      );

      if(searchResult){
    
        state.searchResult = searchResult.map(user => 
          user.user_id === action.payload.user_id? {...user,follow: !user.follow}:user
        );
      } 
    },
  },
});

export default user.reducer;

export const { setUser, searchUser, followUser, viewUser } = user.actions;
