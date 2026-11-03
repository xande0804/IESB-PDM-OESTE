// Expo Web nao disponibiliza os lembretes locais da mesma forma que o Expo Go.
// Esta substituicao de plataforma impede o import do modulo nativo no navegador.
export async function scheduleReminder() {
  return false;
}
