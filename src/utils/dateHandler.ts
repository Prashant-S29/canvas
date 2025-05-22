export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('en-GB', options);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedTime = `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${ampm}`;

  return `${formattedDate} ${formattedTime}`;
};
