import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// material-ui
import {
  Box,
  Grid,
  Typography,
  Divider,
  Chip,
  CardContent,
  CardMedia,
  CardActionArea,
} from '@mui/material';

import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import ActiveUserTable from './ActiveUserTable'
import InactiveUserTable from './InactiveUserTable'

import { setUser,  } from 'store/reducers/user';


const DashboardDefault = () => {
  const [users, setUsers] = useState([]);
  const [networkStatus, setNetworkStatus] = useState(true);
  const dispatch = useDispatch();
  const { user, searchResult, view_user} = useSelector((state) => state.user);

  async function getUserData() {
    try {
      const response = await axios.get("http://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow");
      dispatch(setUser({ user: response.data.items}));
    }
    catch (error) {
      setNetworkStatus(false)
    }
  }

  // set media wise responsive drawer
  useEffect(() => {
    getUserData();

    //handling results
    searchResult ? setUsers(searchResult) : setUsers(user);
  }, [searchResult, user, view_user, users]);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} extra="8,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Sales" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Active Users</Typography>
          </Grid>
          <Grid item>

          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box >
            {
              users || networkStatus != 400 ? <Box>
                <ActiveUserTable user={users} />
                <br /><br /> <br />
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h5">Inactive Users</Typography>
                  </Grid>
                </Grid>
                <InactiveUserTable user={users} />
              </Box>
                : <MainCard sx={{ mt: 1.5 }}>Network ERROR</MainCard>
            }
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">User Overview</Typography>
          </Grid>
          <Grid item />
        </Grid>
        {Object.keys(view_user).length && view_user.follow === true? <MainCard sx={{ mt: 1.5 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="90"
              width="20"
              image={view_user.profile_image}
              alt={view_user.display_name}
              style={{objectFit:'contain'}}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              {view_user.display_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              {`Reputation:  ${view_user.reputation}`}
               <br></br>
               {`location:  ${view_user.location}`}
               <br></br>
               Link:  <a href={view_user.link}>stackoverflow</a>
               <br></br>
               Website:  <a href={view_user.link}>{view_user.display_name}</a>
              </Typography>
              <Divider></Divider>
              <br/>
              <Typography gutterBottom  component="div">
                {view_user.follow ? <Chip label="Block" variant="outlined" color="error" /> : ''}
              </Typography>
            </CardContent>
          </CardActionArea>
        </MainCard>:<MainCard sx={{ mt: 2 }}>Click on the user Avatar to view user details.</MainCard>}
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
