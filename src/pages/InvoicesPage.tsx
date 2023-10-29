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
import { invoices, type Invoice } from '../state/invoices/invoicesSlice';
import { fetchInvoices } from '../state/invoices/invoicesThunks';
import Bill_InvoiceDetail from '../components/Bill_InvoiceDetail';
import Bill_InvoiceDetailPopup from '../components/Bill_InvoiceDetailPopup';

const PAGE_SIZE = 10;

// This component is used to display the invoices page
const InvoicesPage = () => {
  const { invoicesData, status, error } = useSelector(invoices);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchInvoices({}));
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Alert severity='error' sx={{ maxWidth: '80%', ml: 'auto' }}>
        {error}
      </Alert>
    );
  }

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const displayedInvoices = invoicesData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(invoicesData.length / PAGE_SIZE);

  return (
    <Container sx={{ width: '80%', mr: 0 }}>
      <Typography component='h2' variant='h2' color='primary' gutterBottom>
        Invoices
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
          {displayedInvoices.map((invoice) => (
            <Bill_InvoiceDetail
              key={invoice.id}
              data={invoice}
              setSelected={() => setSelectedInvoice(invoice)}
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
      {selectedInvoice && (
        <Bill_InvoiceDetailPopup
          data={selectedInvoice}
          opened={selectedInvoice !== null}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </Container>
  );
};

export default InvoicesPage;
