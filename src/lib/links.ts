// Endereços usados pela landing. Mude aqui e vale para o site todo.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arko-landing-page.vercel.app";

/** Painel web do profissional (ARKO-WEB). */
export const PAINEL_URL = "https://arko.formind.tech";
export const PAINEL_CADASTRO_URL = `${PAINEL_URL}/cadastro`;
export const PAINEL_LOGIN_URL = `${PAINEL_URL}/`;
export const TERMOS_URL = `${PAINEL_URL}/termos`;
export const PRIVACIDADE_URL = `${PAINEL_URL}/privacidade`;

/** Lojas. Deixe vazio enquanto o app não estiver publicado: o botão vira "em breve". */
export const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.gymia.app";
export const APP_STORE_URL = "";

export const INSTAGRAM_URL = "https://www.instagram.com/arkohealth";
export const SUPORTE_EMAIL = "suporte@arkohealth.com.br";

/** Rotas internas da landing. */
export const ROTAS = {
  inicio: "/",
  profissionais: "/profissionais",
  app: "/app",
} as const;
