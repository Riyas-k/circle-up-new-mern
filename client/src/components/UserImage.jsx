/* eslint-disable react/prop-types */
import { Box } from "@mui/material";

const UserImage = ({image,size='60px'})=>{
    return (
        <Box width={size} height={size}>
         
            <img src={`${image}`} style={{objectFit:'cover',borderRadius:"50%",cursor:'pointer'}} height={size} width={size} alt="user" />
       
        </Box>
    )
}
export default UserImage;