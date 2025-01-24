import React, { useState } from 'react';
import { Dialog, DialogActions, InputLabel, Select, MenuItem, FormControl, DialogContent, DialogTitle, TextField, LinearProgress } from '@mui/material';
import { Slider, InputAdornment, Typography } from '@mui/material';
import axios from 'axios';
import Button from '../Buttons/FirstButton';

function AddAccount() {
  const [warmstage, setWarmStage] = useState(1)
  const [open, setOpen] = useState(false); // Controls the dialog visibility
  const [formData, setFormData] = useState({
      id: '',
      email: '',
      password: '',
      appword: '',
      provider: 'Google Workspace',
      smtp_port: 587,
      imap_port: 993,
      imap_server: 'imap.gmail.com',
      smtp_server: 'smtp.gmail.com',
      warmup_stage: 1
  });
  const [loading, setLoading] = useState(false); // For progress bar visibility
  const [progress, setProgress] = useState(0); // Progress bar value

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

    const handleSliderChange = (event, newValue) => {
      setWarmStage(newValue);
        setFormData({
            ...formData,
            warmup_stage: newValue,
        });
    };

  // Open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handle form submission (POST request)
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setProgress(30); // Start progress bar

      // Simulate sending request and progress
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(60); // Update progress bar
      console.log(formData);
      await axios.post('http://127.0.0.1:5002/api/account/create', formData); // Change to your actual API endpoint
      setProgress(100); // Complete progress bar
      setLoading(false);
      setOpen(false); // Close the dialog after success
    } catch (error) {
      console.error('Error adding account:', error);
      setLoading(false);
      setProgress(0); // Reset progress if error occurs
    }
  };

  return (
    <div>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        + Add Account
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Account</DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="App Password"
            name="appword"
            type="text"
            value={formData.appword}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

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
              <MenuItem value="Google Workspace">Google Workspace</MenuItem>
              <MenuItem value="Microsoft 365">Microsoft 365</MenuItem>
              <MenuItem value="Gmail">Gmail</MenuItem>
              <MenuItem value="Outlook">Outlook</MenuItem>
              <MenuItem value="SMTP">SMTP</MenuItem>
            </Select>
          </FormControl>
          
            <div>
            <Typography gutterBottom>Warming Up Stage</Typography>
            <Slider
            value={formData.warmup_stage}
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
            }}
            valueLabelPosition="top"
            aria-labelledby="daily-limit-slider"
          />
        </div>
          {loading && <LinearProgress variant="determinate" value={progress} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={loading}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddAccount;
