export const brasilAPIService = {
  getCNPJ: async (cnpj) => {
    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados do CNPJ');
    }
    return response.json();
  }
}