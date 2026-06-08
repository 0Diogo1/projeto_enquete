export function formatarData(dataISO: string): string {
  return new Date(dataISO).toLocaleDateString('pt-BR')
}