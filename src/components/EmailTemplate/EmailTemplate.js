import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import axios from 'axios';
import { Dialog, DialogActions, InputLabel, Select, MenuItem, FormControl, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/system';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,  Slider} from '@mui/material';
import ColorfulButton from '../Buttons/ColorfulButton';
import ColorfulButton2 from '../Buttons/ColorfulButton2';
import './EmailTemplate.css';
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export default function EmailTemplate() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState();
  const [formData, setFormData] = useState({
      id: 0,
      subject: '',
      body: '',
      language: ''
    });
    
const StyledTableContainer = styled(TableContainer)({
  background: 'rgba(255, 255, 255, 0.4)', // Transparent background
  backdropFilter: 'blur(10px)', // Blur effect
  borderRadius: '10px', // Rounded corners
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
});
const StyledTableCell = styled(TableCell)({
  fontSize:'1em',
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
      console.log(formData);
      const response = await axios.post(`${apiUrl}/api/template/edit/${id}`, formData);
      console.log(response.data )
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
      body: template.body,
      language: template.language
    });
    setOpen(true);
  }
  const handleCreateNew = () => {
  setOpen(true);  
  setFormData({
      id:0,
      subject: '',
      body: '',
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
    <div style={{padding: '5em 3em'}}>
        <div style={{ margin: '20px 0' }}>
          <ColorfulButton2 size="small" onClick={handleCreateNew}>
            + Add Template
          </ColorfulButton2>
    </div>
    <StyledTableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCellTitle>ID</StyledTableCellTitle>
                  <StyledTableCellTitle>Subject</StyledTableCellTitle>
                  <StyledTableCellTitle>Content</StyledTableCellTitle>
                  <StyledTableCellTitle>Edit</StyledTableCellTitle>
                </TableRow>
                </TableHead>
              <TableBody>
                {templates.map((template, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{template.subject}</StyledTableCell>
                    <StyledTableCell  ><div className="show2">{template.body}</div></StyledTableCell>
                    <StyledTableCell> 
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
                  </IconButton></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>

          <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiDialog-paper': {
            width: '80%',
            minWidth: '800px',
          }
        }}
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
          Email Template
        </DialogTitle>
        <DialogContent style={{
            padding: '10px 50px',
        background: 'linear-gradient(45deg, rgb(208 242 255) 30%, rgb(255 237 207) 90%)' 
      }}>
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
              value={formData.body}
              required
              label="Content"
              name="body"
              type="text"
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={10}
            />
        </DialogContent>
        <DialogActions  style={{
        background: 'linear-gradient(45deg, rgb(204 255 255) 30%, rgb(234 217 255) 90%)' 
      }}>
          <ColorfulButton2 onClick={handleClose} color="secondary">
            Cancel
          </ColorfulButton2>
            {formData.id == 0? 
            <ColorfulButton onClick={() => handleSubmit(formData.id)} color="primary" disabled={loading} id="btn_edit">
            OK
          </ColorfulButton>
          :<ColorfulButton onClick={() => handleEdit(formData.id)} color="primary" disabled={loading} id="btn_edit">
          Update
        </ColorfulButton>}
        </DialogActions>
      </Dialog>
    
    </div>
    
  );
}