import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Box, Typography, useTheme } from '@mui/material'
import { tokens } from '../theme'
import { ResponsivePie } from "@nivo/pie"
import {getDatabase, onValue, ref} from "firebase/database"

const Dashboard = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode);
  const [allGrades, setAllGrades] = useState([]);
  const [allStrands, setAllStrands] = useState([])
  const db = getDatabase();

  useEffect(() => {
    const gradeCounts = []
    const strandCounts = []
    onValue(ref(db, "Grade Level/"),
    (snapshot) => {
      snapshot.forEach((element) =>{
       gradeCounts.push({id: element.key, value: element.size})
      })
      setAllGrades(gradeCounts)
    })
    onValue(ref(db, "Strand"),
    (snapshot) =>{
      snapshot.forEach((elemento) =>{
        strandCounts.push({id: elemento.key, value: elemento.size})
      })
      setAllStrands(strandCounts)
    })

  },[db])
  

  return (
    <Box m="20px">
         <Header title="DASHBOARD" subtitle="This is where general information are displayed "/>
       <Box display="flex" justifyContent="space-evenly" >
         {/* VIP SECTION EME */}
         <Box 
          height="185px"
          weight="455px"
          position="relative"
          width="440px">
            <Box
              sx={{backgroundColor: colors.grey[200]}}
              borderRadius="20px"
              height="125px"
              position="relative"
              width="300px"
            >
              {/* VIP title */}
                <Typography
                  variant="h2"
                  color={colors.grey[900]}
                  fontWeight="bold"
                  display="flex"
                  align="center"
                  sx={{ justifyContent:"center"}}>
                    VIP Section
                </Typography>
                <Box display="flex" justifyContent="space-evenly">
                    <Typography
                      variant="h1"
                      color={colors.grey[900]}
                      fontWeight="1000"
                      display="flex"
                      align="center"
                      sx={{ justifyContent:"center", fontSize: "60px"}}>
                        999
                    </Typography>
                    <Typography
                        variant="h2"
                        color={colors.grey[900]}
                        display="flex"
                        align="center"
                        sx={{ justifyContent:"center", marginTop:"20px"}}>
                          tickets sold
                    </Typography>
                </Box>
              
            </Box>
         </Box>
         <Box 
          height="185px"
          weight="455px"
          position="relative"
          top="100px"
          width="440px">
          <Box
            sx={{backgroundColor: colors.grey[200]}}
            borderRadius="20px"
            height="150px"
            position="relative"
            width="350px"
          >
          <Typography
            variant="h2"
            color={colors.grey[800]}
            fontWeight="bold"
            display="flex"
            align="center"
            sx={{m: "5px 0 0 0"}}>
              hello
            </Typography>
          </Box>
         
         </Box>
         <Box 
          height="185px"
          weight="455px"
          position="relative"
          top="100px"
          width="440px">
          <Box
            sx={{backgroundColor: colors.grey[200]}}
            borderRadius="20px"
            height="150px"
            position="relative"
            width="350px"
          >
          <Typography
            variant="h2"
            color={colors.grey[800]}
            fontWeight="bold"
            display="flex"
            align="center"
            sx={{m: "5px 0 0 0"}}>
              hello
            </Typography>
          </Box>
         
         </Box>
          {/* <Typography
            variant="h2"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{m: "5px 0 0 0"}}>
            </Typography> */}

       </Box>
   
    </Box>
  )
}

export default Dashboard