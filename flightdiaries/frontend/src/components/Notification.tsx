import type { NotificationProps } from '../types';

const Notification = ({ notification }: NotificationProps) => {
  if (!notification) return null;

  const style = {
    color: notification.isError ? 'red' : 'green',
    fontWeight: 'bold',
  };

  return <p style={style}>{notification.message}</p>;
};

export default Notification;
