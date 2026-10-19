import { Alert } from '@mui/material';

export type Severity = 'success' | 'info' | 'warning' | 'error';

export interface NotificationProps {
  message: string;
  severity: Severity;
}

const Notification = ({
  notification,
}: {
  notification: NotificationProps | null;
}) => {
  if (!notification) return null;

  return (
    <Alert variant="filled" severity={notification.severity}>
      {notification.message}
    </Alert>
  );
};

export default Notification;
