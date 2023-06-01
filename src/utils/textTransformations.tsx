export const capitalize = (cadena: string | undefined) => {
  if (!cadena) return '';
  return cadena.charAt(0).toUpperCase() + cadena.slice(1);
};
