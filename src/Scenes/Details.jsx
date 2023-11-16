import React, { useState, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Avatar, Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { doc, getDoc, getFirestore } from "@firebase/firestore";


const initialValues = {
    address: "",
    fullName: "",
    email: "",
    phoneNum: "",
    paymentMode: "",
    pwd: "",
    section: "",
    ticketsBought: "", 
    totalPrice: "",
    transactNo: "", 
  };
  

const detailSchema = yup.object().shape({
  fullName: yup.string().required("This field is required"),
});

const Details = ({ user }) => {
  const db = getFirestore();
  const [resibo, setResibo] = useState(
    "https://firebasestorage.googleapis.com/v0/b/dental-management-system-2dccb.appspot.com/o/Profile-pic.png?alt=media&token=5e0d4817-042b-4cf3-b31d-fb3a1d675ec1"
  );

  const [id, setId] = useState("");

  const formikRef = useRef(null);

  //ETO YUNG KUNG MAGSEARCH NG PATIENT
  const search = async (name_search, section_search) => {

    const docSnap = await getDoc(doc(db, section_search, name_search))

    console.log(docSnap.data())

     if (docSnap.exists()) {
      const userData = docSnap.data();
      const updatedIni = {
        address: userData.address || "",
        changed: userData.changed || "",
        phoneNum: userData.phoneNum || "",
        email: userData.email || "",
        fullName: userData.fullName || "",
        paymentMode: userData.paymentMode || "",
        pwd: userData.pwd || "",
        transactNo: userData.transactNo || "",
        ticketsBought: userData.ticketsBought || "",
        totalPrice: userData.totalPrice.toString() || "",
        receiptLink: userData.receiptLink || "",
        pwdLink: userData.pwdLink || "",
      };
      
   
      formikRef.current.setFieldValue("address", updatedIni.address);
      formikRef.current.setFieldValue("email", updatedIni.email);
      formikRef.current.setFieldValue("phoneNum", updatedIni.phoneNum);
      formikRef.current.setFieldValue("paymentMode", updatedIni.paymentMode);
      formikRef.current.setFieldValue("pwd", updatedIni.pwd);
      formikRef.current.setFieldValue("ticketsBought", updatedIni.ticketsBought);
      formikRef.current.setFieldValue("totalPrice", updatedIni.totalPrice);
      formikRef.current.setFieldValue("transactNo", updatedIni.transactNo);

      setResibo(docSnap.data().receiptLink);
      setId(docSnap.data().pwdLink);

    } else {
     toast.error("Cannot find patient");
   }
  };

  return (
    <Box m="20px">
      <Header
        title="VIEW CUSTOMER DETAILS"
        subtitle="This section provides the details of a specific customer. Try searching for it below "
      />
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={detailSchema}
        onSubmit={search}
      >
        {({ values, errors, touched, handleBlur, handleChange }) => (
          <Form>
            <Box display="flex" justifyContent="center" m="20px">
              <TextField
                variant="filled"
                fullWidth
                type="text"
                value={values.fullName}
                onBlur={handleBlur}
                onChange={handleChange}
                label="Full Name"
                name="fullName"
                error={!!touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
                sx={{ maxWidth: "50%", marginRight: "15px" }}
              />

              <TextField
                variant="filled"
                fullWidth
                type="text"
                value={values.section}
                onBlur={handleBlur}
                onChange={handleChange}
                label="Seat Section"
                name="section"
                error={!!touched.section && !!errors.section}
                helperText={touched.section && errors.section}
                sx={{ maxWidth: "25%" }}
              />

              <Button
                sx={{ m: "20px" }}
                variant="contained"
                color="secondary"
                startIcon={<SearchIcon />}
                onClick={() => search(values.fullName, values.section)}
              ></Button>
            </Box>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(5, minmax(0, 1fr))"
            >
              <TextField
                variant="filled"
                fullWidth
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email address"
                name="email"
                value={values.email}
                disabled={true}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                variant="filled"
                fullWidth
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Address"
                name="address"
                disabled={true}
                value={values.address}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNum}
                name="phoneNum"
                disabled={true}
                error={!!touched.phoneNum && !!errors.phoneNum}
                helperText={touched.phoneNum && errors.phoneNum}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Payment Mode"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.paymentMode}
                name="paymentMode"
                disabled={true}
                error={!!touched.paymentMode && !!errors.paymentMode}
                helperText={touched.paymentMode && errors.paymentMode}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="A PWD?"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pwd}
                disabled={true}
                name="pwd"
                error={!!touched.pwd && !!errors.pwd}
                helperText={touched.pwd && errors.pwd}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Transaction Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.transactNo}
                name="transactNo"
                error={!!touched.transactNo && !!errors.transactNo}
                helperText={touched.transactNo && errors.transactNo}
                sx={{ gridColumn: "span 1" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tickets Bought"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ticketsBought}
                name="ticketsBought"
                error={!!touched.ticketsBought && !!errors.ticketsBought}
                helperText={touched.ticketsBought && errors.ticketsBought}
                sx={{ gridColumn: "span 1" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Total Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.totalPrice}
                name="totalPrice"
                error={!!touched.totalPrice && !!errors.totalPrice}
                helperText={touched.totalPrice && errors.totalPrice}
                sx={{ gridColumn: "span 1" }}
                />
            </Box>
            <Box display="flex" justifyContent="center" m="20px">
              <img
                height="1000px"
                width="auto"
                alt="receipt image"
                src={resibo}
              />
               <img
                sx={{
                  m: "20px",
                  display: "flex",
                  justifyContent: "center",
                  height: "30%",
                  width: "30%",
                }}
                alt="pwdID"
                src={id}
              />
            </Box>
            
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Details;

//THIS PROJECT WAS MADE BY PROMETHEUS
