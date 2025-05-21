import { Box, Container, Grid, Stack } from "@mui/material";

import ProfileInform from "./shared/ProfileInform";

import AccountSideBar from "@/components/AccountSideBar";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "start",
      }}
    >
      <Grid container spacing={2} sx={{ m: "80px 0" }} >
        <Grid item lg={3} md={3} >
          <AccountSideBar id={id} />
        </Grid>

        <Grid item lg={9} md={9}>
          <h2
            style={{
              fontWeight: "500",
              width: "100%",
              margin: "0 0 20px 0",
              textAlign: "center",
            }}
          >
            HỒ SƠ CÁ NHÂN
          </h2>

          <Stack alignItems={"center"}>
            <ProfileInform id={id} />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
