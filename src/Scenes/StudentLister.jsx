import React from 'react'
import Header from '../Components/Header'
import { Avatar, Box, FormControlLabel, FormLabel, InputLabel, Radio, RadioGroup } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useTheme } from '@emotion/react'
import { tokens } from '../theme'
import { collection, getDocs, getFirestore } from '@firebase/firestore'
import { async } from 'q'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormControl } from '@mui/base'
import { MenuItem } from 'react-pro-sidebar'


const StudentLister = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [userList, setUserList] = useState([]);
    const db = getFirestore();
    const [section, setSection] = useState("LB");

    const handleChange = (event) => {
      setSection(event.target.value);
    };

    console.log(section)

    //for the data
    useEffect(() => {
        const fetchData = async () => {
          const users = [];
          const queryUsers = await getDocs(collection(db, section));
          queryUsers.forEach((laman) =>{
            users[laman.id] = { id: laman.id, ...laman.data() }
          });

          setUserList(Object.values(users))
        };
        fetchData();
      });

  
    const columns = [
        {
          field: "receiptLink",
          headerName: "Receipt Image",
          width: 150,
          height: 150,
          renderCell: (params) => (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                src={params.value}
                alt="receipt"
                sx={{ height: "50px", width: "50px" }}
              />
            </div>
          ),
        },
        {
          field: "fullName",
          headerName: "Customer's Name",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        { field: "address", headerName: "Address", flex: 1 },
        { field: "email", headerName: "Email Address", flex: 1 },
        { field: "paymentMode", headerName: "Payment Mode", flex: 1 },
        { field: "phoneNum", headerName: "Phone number", flex: 1 },
      ];
    
  return (
    <Box m="20px">
        <Header 
            title="Customer Manifesto"
            subtitle="This section allows you to view all the listed customers for each seat section in the system"/>
         <Box sx={{ minWidth: 120 }}>
         <FormControl>
    <FormLabel id="description">Seat Section</FormLabel>
        <RadioGroup
            aria-labelledby="description"
            defaultValue="LB"
            name="radio-buttons-group"
            row
            value={section}
            onChange={handleChange}
            >
              <FormControlLabel value="LB" control={<Radio />} label="LB" />
              <FormControlLabel value="UPB" control={<Radio />} label="UPB" />
              <FormControlLabel value="VIP" control={<Radio />} label="VIP" />
        </RadioGroup>
    </FormControl>
         </Box>
    
        <Box 
            m="40px 0 0 0"
            height="75vh"
            sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: colors.rich[200],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.grey[700],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.rich[700],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.pale[800],
                },
              }}
        >

        <DataGrid rows={userList} columns={columns}/>
       </Box>
    </Box>
  )
}

export default StudentLister