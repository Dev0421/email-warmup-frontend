import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { styled } from '@mui/system';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const apiUrl = process.env.REACT_APP_API_BASE_URL;
function AccountTable() {
  const [schedules, setSchedules] = useState([]);
  const [errormsg, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  function changeDateFormat(date) {
    const dateObj = new Date(date);
    const formattedDate = dateObj.getFullYear() + "-" +
                        String(dateObj.getMonth() + 1).padStart(2, '0') + "-" +
                        String(dateObj.getDate()).padStart(2, '0') + " " +
                        String(dateObj.getHours()).padStart(2, '0') + ":" +
                        String(dateObj.getMinutes()).padStart(2, '0');
    return(formattedDate);
    }
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
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/schedules`);
        setSchedules(response.data);
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
    fetchSchedule();
  }, [apiUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div style = {{padding: '150px 30px 20px '}}>
        <StyledTableContainer component={Paper} >
            <Table>
            <TableHead>
                <TableRow>
                <StyledTableCellTitle>ID</StyledTableCellTitle>
                <StyledTableCellTitle>Sender</StyledTableCellTitle>
                <StyledTableCellTitle>Receiver</StyledTableCellTitle>
                <StyledTableCellTitle>Template</StyledTableCellTitle>
                <StyledTableCellTitle>Spam</StyledTableCellTitle>
                <StyledTableCellTitle>Time</StyledTableCellTitle>
                </TableRow>
            </TableHead>
            <TableBody>
            {schedules.map((schedule, index) => (
            <TableRow key={index}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{schedule.sender_email}</StyledTableCell>
                <StyledTableCell>{schedule.receiver_email}</StyledTableCell>
                <StyledTableCell>{schedule.template_name}</StyledTableCell>
                <StyledTableCell>{schedule.isspam === 0 ? "Not Spam":"Spam" }</StyledTableCell>
                <StyledTableCell>{changeDateFormat(schedule.scheduled_time)}</StyledTableCell>
            </TableRow>
            ))}

            </TableBody>
            </Table>
        </StyledTableContainer>
        </div>
  );
}

export default AccountTable;
