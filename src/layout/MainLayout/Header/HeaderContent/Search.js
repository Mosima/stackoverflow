// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
// ==============================|| HEADER CONTENT - SEARCH ||============================== //

import { searchUser } from 'store/reducers/user';

const Search = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleSearch = (e) =>{
    e.preventDefault();
    dispatch(searchUser({ searchText: e.target.value, users: user}));
  }
  return(
  <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
    <FormControl onChange={(e)=> handleSearch(e)} sx={{ width: { xs: '100%', md: 224 } }}>
      <OutlinedInput
        size="small"
        id="header-search"
        startAdornment={
          <InputAdornment position="start" sx={{ mr: -0.5 }}>
            <SearchOutlined />
          </InputAdornment>
        }
        aria-describedby="header-search-text"
        inputProps={{
          'aria-label': 'weight'
        }}
        placeholder="Search user..."
      />
    </FormControl>
  </Box>
  );
};

export default Search;
