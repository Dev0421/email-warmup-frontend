import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/system';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Dialog, InputAdornment,IconButton, DialogActions, InputLabel, Select, MenuItem, FormControl, DialogContent, DialogTitle, TextField, 
  LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,  Slider, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ColorfulButton from '../Buttons/ColorfulButton';
import ColorfulButton2 from '../Buttons/ColorfulButton2';
import Switch from '@mui/material/Switch';
import './AccountTable.css';
const label = { inputProps: { 'aria-label': 'Color switch demo' } };

const StyledTableContainer = styled(TableContainer)({
  background: 'rgba(255, 255, 255, 0.4)', // Transparent background
  backdropFilter: 'blur(10px)', // Blur effect
  borderRadius: '10px', // Rounded corners
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
});
const StyledTableCell = styled(TableCell)({
  fontFamily: 'Questrial',
  textAlign: 'center',
  color: '#ab0000', // White text color
  fontWeight: 'bold', // Bold text
});
const StyledTableCellTitle = styled(TableCell)({
  textAlign: 'center',
  fontSize: '1em',
  color: '#1f006b',
});

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Slightly different background for odd rows
  },
});
const StyledSlider = styled(Slider)({
  color: '#2196F3', // Primary color
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#2196F3',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});
const apiUrl = process.env.REACT_APP_API_BASE_URL;
const googleAppId = "433901800272-ed3vor0abhskftoe7d77e77kj6d3ahuu.apps.googleusercontent.com";

function AccountTable() {
  const [accounts, setAccounts] = useState([]);
  const [addtype, setAddType] = useState("3");
  const [loading, setLoading] = useState(true);
  const [dialoguetitle, setDialogueTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [warmstage, setWarmStage] = useState(1)
  const [open, setOpen] = useState(false); // Controls the dialog visibility
  const [progress, setProgress] = useState(0); // Progress bar value
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [formData, setFormData] = useState({
    id:0,
    email: '',
    password: '',
    daily_limit: 0,
    provider: 3,
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
          daily_limit: (newValue === 1 ? 50 : (newValue === 2 ? 100 : (newValue === 3 ? 500 : (newValue === 4 ? 1000 : 3000)))),
      });
  };
  const handleCreateNew = () => {
    setDialogueTitle("add");
    setFormData({
      id:0,
      email: '',
      password: '',
      daily_limit: 100,
      provider: "3",
      provider_name: 'SMTP',
      smtp_port: 465,
      imap_port: 993,
      imap_server: '',
      smtp_server: '',
      warmup_style: 1,
      status: 1
  })
  console.log("new Account", formData);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const renderStars = (warmupStyle) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= warmupStyle ? <StarIcon key={i} style={{ color: '#ffbf00' }} /> : <StarBorderIcon key={i} style={{ color: '#bababa' }} />);
    }
    return stars;
  };
  const handleSubmit = async () => {
    try {
      if(dialoguetitle == "add"){
        setLoading(true);
        console.log("new FormData", formData);
        if(formData.provider_name === "SMTP"){
          const response = await axios.post(`${apiUrl}/api/account/create/smtp`, formData); // Change to your actual API endpoint
          setAccounts(response.data);
        }
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
      setOpen(false);
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
      const provider_response = await axios.get(`${apiUrl}/api/getprovider/${response.data.provider}`);
      setFormData({
        id: response.data.id,
        email: response.data.email,
        password: response.data.password,
        appword: response.data.app_password, 
        provider: response.data.provider,
        provider_name: provider_response.data.provider_name, // Add provider_name here
        smtp_port: provider_response.data.smtp_port, // Add smtp_port here
        imap_port: provider_response.data.imap_port, // Add imap_port here
        imap_server: provider_response.data.imap_server, // Add imap_server here
        smtp_server: provider_response.data.smtp_server, // Add smtp_server here
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
    <div style={{ margin: '20px 0' }}>
      <ColorfulButton size="small" onClick={handleCreateNew}>
        + Add Account
      </ColorfulButton>
    </div>
      <Dialog open={open} onClose={handleClose}
      BackdropProps={{
        style: {
          backdropFilter: 'blur(5px)', // Blur effect for the backdrop
          backgroundColor: 'rgba(128, 128, 128, 0.34)', // Semi-transparent dark background
        },
      }}
      >
        <DialogTitle style={{
        background: 'linear-gradient(45deg, rgb(255 178 178) 30%, rgb(255 240 217) 90%)' 
      }}>
          {dialoguetitle == "add" ? "Add New Account" : "Edit Account"}
        </DialogTitle>
        <DialogContent style={{
            padding: '10px 50px',
        background: 'linear-gradient(45deg, rgb(208 242 255) 30%, rgb(255 237 207) 90%)' 
      }}>
        <FormControl fullWidth margin="normal">
            <InputLabel id="provider-label">Provider</InputLabel>
            <Select
              labelId="provider-label"
              id="provider"
              name="provider"
              value={parseInt(formData.provider)>2?"3":formData.provider}
              onChange={handleInputChange}
              label="Provider"
              disabled
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
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
            {formData.provider === "1" ? (
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
            
            {parseInt(formData.provider) > 2 ? (
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
            <StyledSlider
            value={formData.warmup_style}
            onChange={handleSliderChange}
            min={1}
            max={5}  // Set the range for the daily limit
            step={1}  // Step size for slider
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => {
              switch (value) {
                case 1:
                  return '50';
                case 2:
                  return '100';
                case 3:
                  return '500';
                case 4:
                  return '1000';
                case 5:
                  return '3000';
                default:
                  return `${value}`;  // Fallback for other values
              }
            }}  // Custom value formatting
            valueLabelPosition="top"
            aria-labelledby="daily-limit-slider"
          />
        </div>
          {loading && <LinearProgress variant="determinate" value={progress} />}
        </DialogContent>
        <DialogActions style={{
        background: 'linear-gradient(45deg, rgb(204 255 255) 30%, rgb(234 217 255) 90%)' 
      }}>
          <ColorfulButton2 onClick={handleClose} color="secondary">
            Cancel
          </ColorfulButton2>
          {dialoguetitle == "add" ? (
            <ColorfulButton onClick={handleSubmit} color="primary" disabled={loading} id="btn_add">
            Add
          </ColorfulButton>
            ): (
              <>
              <ColorfulButton onClick={handleSubmit} color="primary" disabled={loading} id="btn_edit">
            Update
          </ColorfulButton>
          <ColorfulButton2 onClick={() => handleDelete(formData.id)}>Delete</ColorfulButton2>
          </>
            )}
        </DialogActions>
      </Dialog>
    
      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCellTitle>ID</StyledTableCellTitle>
              <StyledTableCellTitle>Email</StyledTableCellTitle>
              <StyledTableCellTitle>Type</StyledTableCellTitle>
              <StyledTableCellTitle>ESP</StyledTableCellTitle>
              <StyledTableCellTitle>WarmUp Stage</StyledTableCellTitle>
              <StyledTableCellTitle>Edit/Delete</StyledTableCellTitle>
              <StyledTableCellTitle>Status</StyledTableCellTitle>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{account.email}</StyledTableCell>
                <StyledTableCell>
                  <div className='provider'>
                  {account.provider === 1 ? "Google WorkSpace":(account.provider === 2 ? "Microsoft 365": "SMTP")}
                  </div></StyledTableCell>
                <StyledTableCell>{account.daily_limit}</StyledTableCell>
                <StyledTableCell>
                    {renderStars(account.warmup_style)}
                </StyledTableCell>
                <StyledTableCell>
                  <ColorfulButton onClick={() => handleEdit(account.id)}>Edit</ColorfulButton>
                </StyledTableCell>
                <StyledTableCell>
                  <Switch {...label} checked={account.status} color="warning" onChange={()=>handleWarming(account.email)}/>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  );
}

export default AccountTable;
