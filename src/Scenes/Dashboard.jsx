import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Box, Typography, useTheme } from '@mui/material'
import { tokens } from '../theme'
import { ResponsiveBar } from "@nivo/bar"
import { collection, getDocs, getFirestore, where, doc, getDoc, get } from '@firebase/firestore'
import { ResponsivePie } from '@nivo/pie'

const Dashboard = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode);
  const [allVIP, setAllVIP] = useState("");
  const [allLB, setAllLB] = useState("");
  const [allUPB, setAllUPB] = useState("");

  //for the graph data
  const [vipPay, setVipPay] = useState(0);
  const [lbPay, setLbPay] = useState([]);
  const [upbPay, setUpbPay] = useState([]);

  const [allSeats, setAllSeats] = useState([]);

  const db = getFirestore();

  useEffect(() => {   
    const getVip = async () => {
      const queryVIP = await getDocs(collection(db, "VIP"));
      
      let tixCount = 0
      
      queryVIP.forEach((snappy) => {
        const lahatBinili =  parseInt(snappy.data().ticketsBought, 10);

        tixCount += lahatBinili
      })
      setAllVIP(tixCount)

      const modes = await getDocs(collection(db, "VIP"), where("paymentMode", "!=", ""));
      const modeCounts = []
      modes.forEach((snap) => {
        const data = snap.data();
        if(data.paymentMode){
          if(modeCounts[data.paymentMode]){
            modeCounts[data.paymentMode] +=1
          }
          else{
            modeCounts[data.paymentMode] = 1
          }
        }
      })
      setVipPay(modeCounts)
  
    }
    const getLB = async () => {
      const queryLB = await getDocs(collection(db, "LB"));
      let tixCount = 0
      
      queryLB.forEach((snappy) => {
        const lahatBinili =  parseInt(snappy.data().ticketsBought, 10);

        tixCount += lahatBinili
      })
      setAllLB(tixCount)

      const modes = await getDocs(collection(db, "LB"), where("paymentMode", "!=", ""));
      const modeCounts = []
      modes.forEach((snap) => {
        const data = snap.data();
        if(data.paymentMode){
          if(modeCounts[data.paymentMode]){
            modeCounts[data.paymentMode] +=1
          }
          else{
            modeCounts[data.paymentMode] = 1
          }
        }
      })
      setLbPay(modeCounts)
    }
    const getUPB = async () => {
      const queryUPB = await getDocs(collection(db, "UPB"));
      let tixCount = 0
      
      queryUPB.forEach((snappy) => {
        const lahatBinili =  parseInt(snappy.data().ticketsBought, 10);

        tixCount += lahatBinili
      })
      setAllUPB(tixCount)

      const modes = await getDocs(collection(db, "UPB"), where("paymentMode", "!=", ""));
      const modeCounts = []
      modes.forEach((snap) => {
        const data = snap.data();
        if(data.paymentMode){
          if(modeCounts[data.paymentMode]){
            modeCounts[data.paymentMode] +=1
          }
          else{
            modeCounts[data.paymentMode] = 1
          }
        }
      })
      setUpbPay(modeCounts)
    }
    const getAll = async () => {
    
        const docRef = doc(db, 'Seat Variations', 'Seat Classes');
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        setAllSeats(data)
    };

    getAll()
    getLB()
    getUPB()
    getVip()
  })

  const pieChartData = [
    { id: 'VIP', value: allSeats.VIP },
    { id: 'LB', value: allSeats.LB },
    { id: 'UPB', value: allSeats.UPB },
  ];
  
  
  const chartData = [
    {
      category: "VIP",
      ...vipPay
    },
    {
      category:"Lower Box",
      ...lbPay,
    },
    {
      category:"Upper Box",
      ...upbPay,
    },
  ];
  

  return (
    <Box m="20px">
         <Header title="DASHBOARD" subtitle="This is where general information are displayed "/>
        {/* CONTAINS ALL THE RIBBONS OF ALL TICKETS SOLD */}
       <Box display="flex" justifyContent="space-between" >
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
              width="325px"
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
                        {allVIP}
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
         {/* LOWER BOX */}
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
              width="325px"
            >
              {/* title */}
                <Typography
                  variant="h2"
                  color={colors.grey[900]}
                  fontWeight="bold"
                  display="flex"
                  align="center"
                  sx={{ justifyContent:"center"}}>
                    Lower Box Section
                </Typography>
                <Box display="flex" justifyContent="space-evenly">
                    <Typography
                      variant="h1"
                      color={colors.grey[900]}
                      fontWeight="1000"
                      display="flex"
                      align="center"
                      sx={{ justifyContent:"center", fontSize: "60px"}}>
                        {allLB}
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
         {/* UPPER BOX */}
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
              width="325px"
            >
              {/*  title */}
                <Typography
                  variant="h2"
                  color={colors.grey[900]}
                  fontWeight="bold"
                  display="flex"
                  align="center"
                  sx={{ justifyContent:"center"}}>
                    Upper Box Section
                </Typography>
                <Box display="flex" justifyContent="space-evenly">
                    <Typography
                      variant="h1"
                      color={colors.grey[900]}
                      fontWeight="1000"
                      display="flex"
                      align="center"
                      sx={{ justifyContent:"center", fontSize: "60px"}}>
                        {allUPB}
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
       </Box>

      {/* THE GRAPHS */}
      <Box display="flex" justifyContent="space-between">
        <Box 
            height="185px"
            weight="455px"
            position="relative"
            width="440px">
              <Box
                sx={{backgroundColor: colors.grey[200]}}
                borderRadius="20px"
                height="375px"
                position="relative"
                width="620px"
              >
                <Typography
                  variant="h2"
                  color={colors.grey[900]}
                  fontWeight="bold"
                  display="flex"
                  align="center"
                  sx={{ justifyContent:"center"}}>
                    Payment Modes
                </Typography>
               <ResponsiveBar
                  data={chartData}
                  keys={[...new Set(chartData.flatMap(item => Object.keys(item)))].filter(key => key !== 'category')}
                  indexBy="category"
                  margin={{ top: 20, right: 130, bottom: 70, left: 60 }}
                  padding={0.3}
                  valueScale={{ type: 'linear' }}
                  indexScale={{ type: 'band', round: true }}
                  colors={{ scheme: 'nivo' }}
                  isInteractive={false}
                  axisLeft={{
                      tickSize: 2,
                      tickPadding: 2,
                      tickRotation: 0,
                      legend: 'Ticket numbers',
                      legendPosition: 'middle',
                      legendOffset: -40,
                      truncateTickAt: 0,
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{
                      from: 'color',
                      modifiers: [
                          [
                              'darker',
                              10
                          ]
                      ]
                  }}
                  
              legends={[
                  {
                      dataFrom: 'keys',
                      anchor: 'right',
                      direction: 'column',
                      justify: false,
                      translateX: 120,
                      translateY: 0,
                      itemsSpacing: 2,
                      itemWidth: 100,
                      itemHeight: 20,
                      itemDirection: 'left-to-right',
                      itemOpacity: 0.85,
                      symbolSize: 20,
                      effects: [
                          {
                              on: 'hover',
                              style: {
                                  itemOpacity: 1
                              }
                          }
                      ]
                  },
              ]}
           />
            </Box>
        </Box>   
              <Box
                sx={{backgroundColor: colors.grey[200]}}
                borderRadius="20px"
                height="375px"
                position="relative"
                width="620px"
              >
                <Typography
                  variant="h2"
                  color={colors.grey[900]}
                  fontWeight="bold"
                  display="flex"
                  align="center"
                  sx={{ justifyContent:"center"}}>
                    Seats Remaining
                </Typography>
                 <ResponsivePie
                    data={pieChartData}
                    isInteractive={false}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    colors={{scheme: "nivo"}}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                0.75
                            ]
                        ]
                    }}
                      arcLinkLabelsSkipAngle={10}
                      arcLinkLabelsTextColor="#333333"
                      arcLinkLabelsThickness={2}
                      arcLinkLabelsColor={{ from: 'color' }}
                      arcLabelsSkipAngle={10}
                      arcLabelsTextColor={{
                          from: 'color',
                          modifiers: [
                              [
                                  'darker',
                                  10
                              ]
                          ]
                      }}
                      defs={[
                          {
                              id: 'dots',
                              type: 'patternDots',
                              background: 'inherit',
                              color: 'rgba(255, 255, 255, 0.3)',
                              size: 4,
                              padding: 1,
                              stagger: true
                          },
                          {
                              id: 'lines',
                              type: 'patternLines',
                              background: 'inherit',
                              color: 'rgba(255, 255, 255, 0.3)',
                              rotation: -45,
                              lineWidth: 6,
                              spacing: 10
                          }
                      ]}
                      fill={[
                          {
                              match: {
                                  id: 'VIP'
                              },
                              id: 'dots'
                          },
                          {
                              match: {
                                  id: 'LB'
                              },
                              id: 'lines'
                          },
                          {
                              match: {
                                  id: 'UPB'
                              },
                              id: 'dots'
                          },
                      ]}
                   
                    />
                </Box>
      </Box>
    </Box>
  )
}

export default Dashboard