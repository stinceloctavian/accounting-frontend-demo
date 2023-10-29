import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

// This component is used to display the navigation bar
const NavBar = () => {
  return (
    <aside className='absolute top-0 left-0 max-w-xs'>
      <List sx={{ p: 0, borderRight: '1px solid' }}>
        <ListItem>
          <Link
            to='/'
            className='text-base font-medium text-dark-600 hover:underline'
          >
            Homepage
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to='/bills'
            className='text-base font-medium text-dark-600 hover:underline'
          >
            Bills
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to='/invoices'
            className='text-base font-medium text-dark-600 hover:underline'
          >
            Invoices
          </Link>
        </ListItem>
      </List>
    </aside>
  );
};

export default NavBar;
