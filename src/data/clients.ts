export type ClientStatus = "Ativo" | "Onboarding" | "Pausado" | "Encerrado";

export type Client = {
  id: string;
  initials: string;
  name: string;
  company: string;
  status: ClientStatus;
  operation: string;
  profile: "High" | "Medium" | "Low";
  owner: "Carol" | "Pedro";
  revenue: number;
  situation: string;
};

export const clients: Client[] = [
  { id: "marcelo-nunes", initials: "MN", name: "Marcelo Nunes", company: "MN Empreendimentos", status: "Ativo", operation: "Apartamentos", profile: "High", owner: "Carol", revenue: 1897, situation: "Tudo certo" },
  { id: "ana-beatriz", initials: "AB", name: "Ana Beatriz", company: "AB Incorporações", status: "Ativo", operation: "Loteamentos", profile: "Medium", owner: "Pedro", revenue: 2187, situation: "1 pendência" },
  { id: "gran-reserva", initials: "GR", name: "Gran Reserva", company: "Gran Reserva Empreendimentos", status: "Onboarding", operation: "Casas, Loteamentos", profile: "High", owner: "Carol", revenue: 1500, situation: "Aguardando cliente" },
  { id: "horizonte", initials: "H", name: "Horizonte", company: "Horizonte Construtora", status: "Ativo", operation: "Apartamentos", profile: "Medium", owner: "Pedro", revenue: 2100, situation: "Tudo certo" },
  { id: "luminae", initials: "L", name: "Luminaê", company: "Luminaê Empreendimentos", status: "Ativo", operation: "Comerciais", profile: "High", owner: "Carol", revenue: 2840, situation: "Tudo certo" },
  { id: "vale-verde", initials: "VV", name: "Vale Verde", company: "Vale Verde Urbanismo", status: "Pausado", operation: "Loteamentos", profile: "Low", owner: "Pedro", revenue: 0, situation: "Em pausa" },
  { id: "solare", initials: "S", name: "Solare", company: "Solare Desenvolvimentos", status: "Ativo", operation: "Apartamentos, Comerciais", profile: "Medium", owner: "Carol", revenue: 1240, situation: "Tudo certo" },
  { id: "vista-alta", initials: "VA", name: "Vista Alta", company: "Vista Alta Incorporações", status: "Encerrado", operation: "Casas", profile: "Low", owner: "Pedro", revenue: 0, situation: "Contrato encerrado" },
  { id: "riviera", initials: "R", name: "Riviera", company: "Riviera Empreendimentos", status: "Ativo", operation: "Loteamentos", profile: "High", owner: "Carol", revenue: 1350, situation: "Tudo certo" },
  { id: "evolute", initials: "E", name: "Evolute", company: "Evolute Urbanismo", status: "Onboarding", operation: "Casas, Loteamentos", profile: "Medium", owner: "Pedro", revenue: 697, situation: "Em configuração" },
];

export function getClient(clientId: string) {
  return clients.find((client) => client.id === clientId);
}