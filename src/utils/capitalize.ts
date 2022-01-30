const capitalize = (text: string): string => {
  if (typeof text !== 'string') {
    return '';
  }

  return `${text.charAt(0).toUpperCase()}${text.substring(1).toLowerCase()}`;
};

export default capitalize;
