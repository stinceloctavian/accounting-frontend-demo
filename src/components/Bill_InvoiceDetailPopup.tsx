import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Bill } from '../state/bills/billsSlice';
import type { Invoice } from '../state/invoices/invoicesSlice';

interface ModalProps {
  data: Bill | Invoice;
  opened: boolean;
  onClose: () => void;
}

// Custom styles for modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// This component is used to display the details of a bill or invoice
const Bill_InvoiceDetailPopup = ({ data, opened, onClose }: ModalProps) => {
  // Parse date
  const date = new Date(data.due_at);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <Modal
      open={opened}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' component='h3' variant='h3' sx={{ mb: 2 }}>
          Details
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 1 }}>
          ID: {data.id}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 1 }}>
          Amount: ${data.amount}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 1 }}>
          Date: {[year, month, day].join('/')}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 1 }}>
          Document Number: {data.document_number}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 1 }}>
          Status: {data.status}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 1 }}>
          Contact Email: {data.contact_email}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 1 }}>
          Contact Name: {data.contact_name}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 1 }}>
          Contact Phone: {data.contact_phone}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 1 }}>
          Contact Address: {data.contact_address}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 1 }}>
          Notes: {data.notes}
        </Typography>
      </Box>
    </Modal>
  );
};

export default Bill_InvoiceDetailPopup;
