import '../css/navbar.css';

// Material UI
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { useState } from 'react';

function Navbar() {

    // Material UI
    const [checked, setChecked] = useState(false);
    const handleChange = () => {
        setChecked((prev) => !prev);
    };
    
  return (
    <div className='nav-container'>
        <div className='left-icone'>
            <img src="/Images/Icones/Vector.png" alt='Icone' onClick={handleChange}/>
        </div>
          <Box sx={{ width: '50%' }}>
            <Collapse orientation="horizontal" in={checked}>
              <div className='left-nav-container'>
                <h2>Menu</h2>
              </div>
            </Collapse>
          </Box>
    </div>
  );
}
export default Navbar;