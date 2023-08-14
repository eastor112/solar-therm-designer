export const capitalize = (cadena: string | undefined) => {
  if (!cadena) return '';
  return cadena.charAt(0).toUpperCase() + cadena.slice(1);
};

export const getShortName = (firstName: string, lastName: string) => {
  if (!firstName || !lastName) return;
  return firstName.split(' ')[0] + ' ' + lastName.split(' ')[0];
};
