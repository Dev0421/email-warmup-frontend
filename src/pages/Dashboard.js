import React from 'react';
import AccountTable from '../components/AccountTable/AccountTable';

function Dashboard() {
  const gradientBackground = {
    padding: '5em 3em',
  };

  return (
    <div style={gradientBackground}>
        <AccountTable />
    </div>
  );
}

export default Dashboard;
