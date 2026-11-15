// Catálogo das capturas reais do produto, em public/screens.
// App: ARKO-MOBILE (1170 × 2532). Painel: ARKO-WEB (2880 × 1620). Recortes: pedaços dessas telas.
// Os dados nas telas são de exemplo (praticante "Camila Rocha", alunos fictícios no painel).
// App do profissional: ARKO-MOBILE no navegador com API simulada (profissional fictício "Rafael Moura",
// mesma turma do painel), capturado em 2026-11-14. Nada foi gravado no sistema real.

export const TELAS_APP = {
  inicio: { base: "/screens/app/inicio", rotulo: "Início", alt: "Tela inicial do app ARKO com a sequência de dias treinados e as metas do dia" },
  treinos: { base: "/screens/app/treinos", rotulo: "Treinos", alt: "Lista de treinos no app ARKO" },
  // treino em andamento, no modo lista (duas séries do primeiro exercício já feitas)
  treinoLista: { base: "/screens/app/treino-lista", rotulo: "Treino em andamento", alt: "Treino em andamento no app ARKO: cronômetro, botão de pausar e o supino reto com duas séries concluídas" },
  alimentacao: { base: "/screens/app/alimentacao", rotulo: "Alimentação", alt: "Resumo de calorias e refeições do dia no app ARKO" },
  carga: { base: "/screens/app/carga", rotulo: "Progressão de carga", alt: "Gráfico de progressão de carga do agachamento livre no app ARKO" },
  musculos: { base: "/screens/app/musculos", rotulo: "Frequência", alt: "Treinos concluídos por dia e mapa dos grupos musculares no app ARKO" },
  calendario: { base: "/screens/app/calendario", rotulo: "Calendário", alt: "Calendário com os dias treinados e desafios em grupo no app ARKO" },
  feed: { base: "/screens/app/feed", rotulo: "Feed", alt: "Feed com um treino publicado por outro usuário no app ARKO" },
  // app do profissional
  proInicio: { base: "/screens/pro-app/inicio", rotulo: "Início", alt: "Início do app do profissional com o código de convite, alunos ativos, treinos na semana e vagas" },
  proAtencao: { base: "/screens/pro-app/atencao", rotulo: "Precisam de atenção", alt: "Alunos que precisam de atenção, com os dias sem treinar, no app do profissional" },
  proAlunos: { base: "/screens/pro-app/alunos", rotulo: "Alunos", alt: "Ficha resumida de uma aluna no app do profissional, com peso, IMC, gordura e os treinos dela" },
  proTreino: { base: "/screens/pro-app/treino", rotulo: "Editar treino", alt: "Editor de treino no app do profissional, com séries, repetições, carga e descanso de cada exercício" },
  proAvaliacao: { base: "/screens/pro-app/avaliacao", rotulo: "Avaliação", alt: "Histórico de avaliações físicas de uma aluna no app do profissional" },
  proModelos: { base: "/screens/pro-app/modelos", rotulo: "Modelos", alt: "Modelos de treino reutilizáveis no app do profissional" },
} as const;

export type TelaApp = keyof typeof TELAS_APP;

export const TELAS_PAINEL = {
  dashboard: { rota: "dashboard", alt: "Dashboard do painel ARKO com total de alunos, alunos ativos, treinos na semana e vagas" },
  alunos: { rota: "alunos", alt: "Lista de alunos com o código de convite no painel ARKO" },
  treinos: { rota: "treinos", alt: "Gestão de treinos de uma aluna no painel ARKO" },
  alimentacao: { rota: "alimentacao", alt: "Plano alimentar com calorias, macros, água e templates de dieta no painel ARKO" },
  medidas: { rota: "medidas", alt: "Medidas corporais e detalhes da última avaliação no painel ARKO" },
  chat: { rota: "chat", alt: "Chat do painel ARKO com um treino concluído enviado pela aluna" },
  desafios: { rota: "desafios", alt: "Desafios em grupo criados pelo profissional no painel ARKO" },
  modelos: { rota: "modelos", alt: "Modelos de treino reutilizáveis no painel ARKO" },
} as const;

export type TelaPainel = keyof typeof TELAS_PAINEL;

export const RECORTES = {
  sequencia: { w: 1050, h: 348, alt: "Cartão de sequência do app: 18 dias seguidos" },
  metas: { w: 1050, h: 261, alt: "Metas do dia no app: treino, calorias e água" },
  carga: { w: 1050, h: 578, alt: "Gráfico de carga máxima por sessão do agachamento livre" },
  calorias: { w: 1050, h: 300, alt: "Calorias do dia: 1435 de 1900 kcal" },
  refeicao: { w: 1050, h: 198, alt: "Refeição registrada: café da manhã, 590 kcal" },
  treino: { w: 1026, h: 390, alt: "Cartão do Treino A, superiores, com 6 exercícios e 63 minutos" },
  calendario: { w: 1074, h: 590, alt: "Calendário de novembro com os dias treinados marcados" },
  musculos: { w: 1050, h: 959, alt: "Mapa dos grupos musculares mais exercitados, frente e costas" },
  vagas: { w: 565, h: 212, alt: "Vagas disponíveis: 14 de 20" },
  convite: { w: 520, h: 110, alt: "Código de convite do profissional com o botão Copiar link" },
  atividade: { w: 1115, h: 850, alt: "Atividade dos alunos, com os dias sem atividade de cada um" },
} as const;

export type NomeRecorte = keyof typeof RECORTES;
