import { Grid, Typography } from "@mui/material";
import { BeatLoader } from "react-spinners";

const FullscreenLoader = ({ title = "" }: { title: string }) => {
  return (
    <Grid
      sx={{
        backgroundColor: "white",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        zIndex: 100000,
      }}
    >
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BeatLoader size={50} color="grey" />
      </Grid>

      <Typography variant="h6">{title}</Typography>
    </Grid>
  );
};

export default FullscreenLoader;
