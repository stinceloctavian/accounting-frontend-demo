import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Pagination from '@mui/material/Pagination';
import { AppDispatch } from '../state/store';
import { bills, type Bill } from '../state/bills/billsSlice';
import { fetchBills } from '../state/bills/billsThunks';
import Bill_InvoiceDetail from '../components/Bill_InvoiceDetail';
import Bill_InvoiceDetailPopup from '../components/Bill_InvoiceDetailPopup';

const PAGE_SIZE = 10;

// This component is used to display the bills page
const BillsPage = () => {
  const { billsData, status, error } = useSelector(bills);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchBills({}));
  }, [dispatch]);

  if (status === 'loading') {
    return <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>;
  }

  if (status === 'failed') {
    return <Alert severity='error' sx={{ maxWidth: '80%', ml: 'auto' }}>
      {error}
    </Alert>;
  }

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const displayedBills = billsData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(billsData.length / PAGE_SIZE);

  return (
    <Container sx={{ width: '80%', mr: 0 }}>
      <Typography component='h2' variant='h2' color='primary' gutterBottom>
        Bills
      </Typography>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Spent</TableCell>
            <TableCell>Received</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedBills.map((bill) => (
            <Bill_InvoiceDetail
              key={bill.id}
              data={bill}
              setSelected={() => setSelectedBill(bill)}
            />
          ))}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <Pagination
          defaultPage={currentPage}
          count={totalPages}
          onChange={(_, page) => {
            if (page !== null) {
              setCurrentPage(page);
            }
          }}
          sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
        />
      )}
      {selectedBill && (
        <Bill_InvoiceDetailPopup
          data={selectedBill}
          opened={selectedBill !== null}
          onClose={() => setSelectedBill(null)}
        />
      )}
    </Container>
  );
};

export default BillsPage;
