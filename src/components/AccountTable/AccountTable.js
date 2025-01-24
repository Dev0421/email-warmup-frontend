import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogActions, InputLabel, Select, MenuItem, FormControl, DialogContent, DialogTitle, TextField, 
  LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,  Slider, Typography } from '@mui/material';
import FirstButton from '../Buttons/FirstButton';
import SecondButton from '../Buttons/SecondButton'; 

const apiUrl = process.env.REACT_APP_API_BASE_URL;
const googleAppId = "433901800272-ed3vor0abhskftoe7d77e77kj6d3ahuu.apps.googleusercontent.com";

function AccountTable() {
  const [accounts, setAccounts] = useState([]);
  const [addtype, setAddType] = useState("1");
  const [loading, setLoading] = useState(true);
  const [dialoguetitle, setDialogueTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [warmstage, setWarmStage] = useState(1)
  const [open, setOpen] = useState(false); // Controls the dialog visibility
  const [progress, setProgress] = useState(0); // Progress bar value
  const [formData, setFormData] = useState({
    id:0,
    email: '',
    password: '',
    daily_limit: 0,
    provider: 1,
    provider_name: 'Google Workspace',
    smtp_port: 587,
    imap_port: 993,
    imap_server: 'imap.gmail.com',
    smtp_server: 'smtp.gmail.com',
    warmup_style: 1,
    status: 1
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: value,
      };
      if (name === 'provider') {
        setAddType(value);
        let providerName = '';
        if (value === '1') {
          providerName = 'Google Workspace';
        } else if (value === '2') {
          providerName = 'Office 365';
        } else if (value === '3') {
          providerName = 'SMTP';
        }
  
        updatedFormData.provider_name = providerName;
      }
      return updatedFormData;
    });
  };
  const handleSliderChange = (event, newValue) => {
    setWarmStage(newValue);
      setFormData({
          ...formData,
          warmup_style: newValue,
      });
  };

  const handleCreateNew = () => {
    setDialogueTitle("add");
    setFormData({
      id:0,
      email: '',
      password: '',
      daily_limit: 100,
      provider: "1",
      provider_name: 'Google Workspace',
      smtp_port: 1,
      imap_port: 1,
      imap_server: '',
      smtp_server: '',
      warmup_style: 1,
      status: 0
  })
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    try {
      if(dialoguetitle == "add"){
        setLoading(true);
        console.log("new FormData", formData);
        if(formData.provider_name === "SMTP"){
          const response = await axios.post(`${apiUrl}/api/account/create/smtp`, formData); // Change to your actual API endpoint
          setAccounts(response.data);}
        else {
          const response = await axios.post(`${apiUrl}/api/account/create`, formData); // Change to your actual API endpoint
          setAccounts(response.data);
        }
        setLoading(false);
      }else if(dialoguetitle == "edit"){
        setLoading(true);
        console.log(formData);
        const response = await axios.post(`${apiUrl}/api/account/edit`, formData); // Change to your actual API endpoint
        setAccounts(response.data);
        setLoading(false);
      }
      setOpen(false); // Close the dialog after success
    } catch (error) {
      console.error('Error updating account:', error);
      setLoading(false);
    }
  };
  const handleWarming = async (email) => {
    console.log("warming Email", email);
       await axios.post(`${apiUrl}/api/account/warm`, {email : email})
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.log('Error');
      })
  }
  const handleEdit = async (id) => {
    setDialogueTitle("edit");
    try {
      const response = await axios.get(`${apiUrl}/api/account/getone/${id}`,);
      setFormData({
        id: response.data.id,
        email: response.data.email,
        password: response.data.password,
        appword: response.data.app_password, 
        provider: response.data.provider,
        warmup_style: response.data.warmup_style,
        status: response.data.status
      });
      
      // Open the modal or set the state as necessary
      setOpen(true);
    } catch (error) {
      console.error('Error fetching account:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/api/account/delete/${id}`);
      console.log("Successfully deleted ");
      setOpen(false);
      setAccounts(response.data);
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/accounts`);
        setAccounts(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false); 
        if (err?.response?.status === 404) {
          setErrorMessage('Error fetching accounts data: Not found.');
        } else {
          setErrorMessage('Please wait... Coming Soon....');
        }
      }
    };
    fetchEmail();
  }, [apiUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
    <div>
      <FirstButton variant="contained" color="success" onClick={handleCreateNew}>
        + Add Account
      </FirstButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {dialoguetitle == "add" ? "Add New Account" : "Edit Account"}
        </DialogTitle>
        <DialogContent>
        <FormControl fullWidth margin="normal">
            <InputLabel id="provider-label">Provider</InputLabel>
            <Select
              labelId="provider-label"
              id="provider"
              name="provider"
              value={formData.provider}
              onChange={handleInputChange}
              label="Provider"
            >
              <MenuItem value="1">Google Workspace</MenuItem>
              <MenuItem value="2">Office 365</MenuItem>
              <MenuItem value="3">SMTP</MenuItem>
            </Select>
          </FormControl>
          <TextField
              required
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              disabled={dialoguetitle === "edit"}
            />
            <TextField
              required
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            {addtype === "1" ? (
              <div id="google_workspace">
                <TextField
                  id="filled-read-only-input"
                  label="Warmy App ID"
                  defaultValue={googleAppId}
                  variant="filled"
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                  sx={{ my: "16px", width: "100%" }}
                />
                <p>
                Ask your Google Workspace Administrator to navigate to <a href="https://admin.google.com/u/1/ac/owl/list?tab=configuredApps" target="_blank" rel="noopener noreferrer">App Access Control</a>.
                </p>
              </div>
            ) : null}
            
            {addtype === "3" ? (
                <div id="smtp">
                  <TextField
                    required
                    label="SMTP Server"
                    name="smtp_server"
                    type="text"
                    value={formData.smtp_server}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    required
                    label="SMTP Port"
                    name="smtp_port"
                    type="text"
                    value={formData.smtp_port}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    required
                    label="IMAP Server"
                    name="imap_server"
                    type="text"
                    value={formData.imap_server}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    required
                    label="IMAP Port"
                    name="imap_port"
                    type="text"
                    value={formData.imap_port}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </div>
              ) : null}
            
              
            <div>
            <Typography gutterBottom>Warming Up Stage</Typography>
            <Slider
            value={formData.warmup_style}
            onChange={handleSliderChange}
            min={0}
            max={5}  // Set the range for the daily limit
            step={1}  // Step size for slider
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => {
              switch (value) {
                case 1:
                  return '50 emails';
                case 2:
                  return '100 emails';
                case 3:
                  return '500 emails';
                case 4:
                  return '1000 emails';
                case 5:
                  return '3000 emails';
                default:
                  return `${value} emails`;  // Fallback for other values
              }
            }}  // Custom value formatting
            valueLabelPosition="top"
            aria-labelledby="daily-limit-slider"
          />
        </div>
          {loading && <LinearProgress variant="determinate" value={progress} />}
        </DialogContent>
        <DialogActions>
          <FirstButton onClick={handleClose} color="secondary">
            Cancel
          </FirstButton>
          {dialoguetitle == "add" ? (
            <FirstButton onClick={handleSubmit} color="primary" disabled={loading} id="btn_add">
            Add
          </FirstButton>
            ): (
              <>
              <FirstButton onClick={handleSubmit} color="primary" disabled={loading} id="btn_edit">
            Update
          </FirstButton>
          <SecondButton onClick={() => handleDelete(formData.id)}>Delete</SecondButton>
          </>
            )}
        </DialogActions>
      </Dialog>
    </div>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Warmup Style</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Progress</TableCell>
            <TableCell>Edit/Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {accounts.map((account, index) => (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{account.email}</TableCell>
          <TableCell>{account.warmup_style}</TableCell>
          <TableCell>
            {account.status === 0 ? (
              <FirstButton onClick={() => handleWarming(account.email)}>Warm</FirstButton>
            ) : (
              <SecondButton onClick={() => handleWarming(account.email)}>Stop</SecondButton>
            )}
          </TableCell>
          <TableCell>
            {account.sent}/{account.received}
            {account.status ? (
                <LinearProgress color="secondary" />
              ) : (
                <LinearProgress variant="determinate" value={100} color="warning" />
              )}
          </TableCell>
          <TableCell>
            <FirstButton onClick={() => handleEdit(account.id)}>Edit</FirstButton>
          </TableCell>
        </TableRow>
      ))}

        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

export default AccountTable;
