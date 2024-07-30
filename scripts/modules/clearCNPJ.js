export function cleanCNPJ(cnpj) {
  return cnpj.replace(/\D/g, '');
}
