// import { CircularProgress } from '@mui/material';
import { useSelector } from "react-redux";
import CircleLoader from "react-spinners/CircleLoader";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

function Loading() {
  const mode = useSelector((store)=>store.theme)
  return (
    <div style={styles.container}>
      {/* <CircularProgress color="primary" /> */}
      <CircleLoader color={mode.mode=='light'? 'black':'white'} />
    </div>
  );
}

export default Loading;


// import * as React from 'react';
// import Stack from '@mui/material/Stack';
// import LinearProgress from '@mui/material/LinearProgress';

// export default function LinearColor() {
//   return (
//     <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
//       <LinearProgress color="secondary" />
//       <LinearProgress color="success" />
//       <LinearProgress color="inherit" />
//     </Stack>
//   );
// }
