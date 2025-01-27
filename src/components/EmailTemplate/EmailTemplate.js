import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import axios from 'axios';
import { Dialog, DialogActions, InputLabel, Select, MenuItem, FormControl, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import FirstButton from '../Buttons/FirstButton';
import SecondButton from '../Buttons/SecondButton'; 
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

export default function EmailTemplate() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState();
  const [formData, setFormData] = useState({
      id: 0,
      subject: '',
      content: '',
      language: ''
    });
  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/templates`);
        setTemplates(response.data);
      } catch (err) {
        if (err?.response?.status === 404) {
          setErrorMessage('Error fetching templates: Not found.');
        } else {
          setErrorMessage('An error occurred while fetching templates.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTemplate();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: value,
      };
      return updatedFormData;
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    try {
        setLoading(true);
        console.log("new FormData", formData);
        const response = await axios.post(`${apiUrl}/api/template/create`, formData); // Change to your actual API endpoint
        setTemplates(response.data);
        setLoading(false);
        setOpen(false);
    } catch (error) {
      console.error('Error updating template:', error);
      setLoading(false);
    }
  };
  const handleEdit = async (id) => {
    try {
      const response = await axios.post(`${apiUrl}/api/template/edit/${id}`, formData);
      setTemplates(response.data);
      setOpen(false);
    } catch (error) {
      console.error('Error fetching template:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(`${apiUrl}/api/template/delete/${id}`);
      console.log("Successfully deleted ");
      setOpen(false);
      setTemplates(response.data);
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };
  const handleDetailsClick = (template) =>{
    setFormData({
      id: template.id,
      subject: template.subject,
      content: template.content,
      language: template.language
    });
    setOpen(true);
  }
  const handleCreateNew = () => {
  setOpen(true);  
  setFormData({
      id:0,
      subject: '',
      content: '',
      language: "English",
    })
  }
  if (loading) {
    return <Typography variant="h6">Loading templates...</Typography>;
  }

  if (errorMessage) {
    return <Typography variant="h6" color="error">{errorMessage}</Typography>;
  }

  return (
    <>
    <Card>
    <Box display="flex" justifyContent="center">
      <Typography variant="h2" gutterBottom>
        Email Templates
      </Typography>
    </Box>
    <Box display="flex" justifyContent="center">
      <Typography variant="h6" gutterBottom>
        On this page you can create, edit and delete email templates.
      </Typography>
    </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiDialog-paper': {
            width: '80%',
            minWidth: '800px',
          }
        }}
      >
            <DialogTitle>
          Email Template
        </DialogTitle>
        <DialogContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={9}>
            <TextField
              required
              label="Subject"
              name="subject"
              type="subject"
              value={formData.subject}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="language-label">Language</InputLabel>
              <Select
                labelId="language-label"
                id="language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                label="Language"
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Chinese">Chinese</MenuItem>
                <MenuItem value="French">French</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
            <TextField
              required
              label="Content"
              name="content"
              type="text"
              value={formData.content}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}  // You can adjust the number of rows as needed
            />
        </DialogContent>
        <DialogActions>
          <FirstButton onClick={handleClose} color="secondary">
            Cancel
          </FirstButton>
            {formData.id == 0? 
            <FirstButton onClick={() => handleSubmit(formData.id)} color="primary" disabled={loading} id="btn_edit">
            OK
          </FirstButton>
          :<FirstButton onClick={() => handleEdit(formData.id)} color="primary" disabled={loading} id="btn_edit">
          Update
        </FirstButton>}
        </DialogActions>
      </Dialog>
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={2} justifyContent="center">
        {templates.map((template, index) => (
          <Grid item xs={12} sm={3} key={index}>
            <Card sx={{ minWidth: 200, backgroundColor: '#c7deff', height: 200, position: 'relative' }}>
            

            <CardContent>
            <Box
            sx={{
              display: 'flex', // Enables flexbox for alignment
              justifyContent: 'space-between', // Spaces out items
              alignItems: 'center', // Vertically centers items
              width: '100%', // Full-width container
            }}
                    >
            {/* Left-aligned text */}
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              Template {index + 1}
            </Typography>

                {/* Right-aligned icons */}
                <Box>
                  <IconButton
                    color="primary"
                    sx={{ padding: 1 }}
                    onClick={() => handleDetailsClick(template)}
                  >
                    <InfoIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    sx={{ padding: 1 }}
                    onClick={() => handleDelete(template.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <Typography variant="h5" component="div" sx={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                {template.subject}
              </Typography>
                <Typography variant="body2" sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 5,            /* Limit to 3 lines */
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: '14px'
                }} >
                  {template.content}
                </Typography>
              </CardContent>
              
              <CardActions>
                
              </CardActions>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} sm={3} >
              <Card
        sx={{
          minWidth: 275,
          backgroundColor: "#575757",
          border: "dotted 2px black",
          cursor: 'pointer', // Makes the card appear clickable
            }}
            onClick={handleCreateNew} // Click handler
          >
            <CardContent
              sx={{
                fontSize: '120px',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                paddingBottom: '40px',
              }}
            >
              +
            </CardContent>
      </Card>
        </Grid>
      </Grid>
    </Box>
    </Card>
    </>
    
  );
}