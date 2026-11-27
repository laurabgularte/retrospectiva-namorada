import { Memory, Milestone, LetterData } from "@/types/memory";

// Data de início do relacionamento (YYYY-MM-DDTHH:mm:ss)
export const RELATIONSHIP_START_DATE = "2025-05-10T22:00:00";

export const COUPLE_INFO = {
  herName: "Meu Amor",
  heroTitle: "Nossa Retrospectiva",
  heroSubtitle:
    "Cada momento, cada risada e cada capítulo que construímos juntas até aqui.",
  spotifyUrl: "https://open.spotify.com/intl-pt/track/0P5Vg3FLAaJtxBeNEJxLSM",
  musicTitle: "Nossa Música",
};

export const MILESTONES: Milestone[] = [
  {
    id: "m1",
    title: "Onde Tudo Começou",
    date: "10 de Maio de 2025",
    icon: "sparkles",
    highlight: "O dia em que nossas histórias se cruzaram.",
  },
  {
    id: "m2",
    title: "O Pedido Oficial",
    date: "16 de Agosto de 2025",
    icon: "heart",
    highlight: "O melhor 'sim' da minha vida.",
  },
  {
    id: "m3",
    title: "Nossa Primeira Viagem",
    date: "19 de Dezembro de 2025",
    icon: "plane",
    highlight: "Novos lugares, as mesmas risadas.",
  },
  {
    id: "m4",
    title: "Hoje & Sempre",
    date: "Agora",
    icon: "calendar",
    highlight: "E isso é só o começo do que ainda vamos viver.",
  },
];

export const MEMORIES: Memory[] = [
  {
    id: "mem-1",
    date: "2025-05-10",
    displayDate: "10 de Maio de 2025",
    title: "Primeiros Encontros",
    location: "Nossos primeiros momentos juntas",
    description:
      "Amo ficar rindo de bobeiras com você, nos entendemos desde o primeiro momento.",
    imageUrl: "/photos/foto-1.jpeg", // public/photos/foto-1.jpg
    photos: ["/photos/foto-1a.jpeg", "/photos/foto-1b.jpeg","/photos/foto-1.jpeg"],
    tag: "Início",
  },
  {
    id: "mem-2",
    date: "2025-08-16",
    displayDate: "16 de Agosto de 2025",
    title: "Um Dia Inesquecível",
    location: "Casa Leopoldo",
    description:
      "Mais uma memória que mostra como qualquer dia simples fica incrível quando estou com você.",
    imageUrl: "/photos/foto-2.jpeg", //public/photos/foto-2.jpg,
    tag: "Momento",
  },
  {
    id: "mem-3",
    date: "2025-12-19",
    displayDate: "19 e 20 de Dezembro de 2025",
    title: "Nossa Viagem Juntas",
    location: "Foz do Iguaçu/Paraguai",
    description:
      "Lembrança da nossa aventura, das fotos espontâneas e de tudo que planejamos juntas.",
    imageUrl: "/photos/foto-3.jpeg", //public/photos/foto-3.jpg
    photos: ["/photos/foto-3a.jpeg", "/photos/foto-3b.jpeg"],
    tag: "Viagem",
  },
  {
    id: "mem-4",
    date: "2026-11-11",
    displayDate: "Muitas datas especiais",
    title: "Nossos Momentos",
    location: "Lanches",
    description:
      "Porque para celebrar a gente nunca precisa de motivo, mas esses dias merecem registro.",
    imageUrl: "/photos/foto-4.jpeg", // public/photos/foto-4.jpg
    photos: ["/photos/foto-4a.jpeg", "/photos/foto-4b.jpeg","/photos/foto-4.jpeg"],
    tag: "Celebração",
  },
];

export const FINAL_LETTER: LetterData = {
  greeting: "Para você, minha pititica",
  paragraphs: [
    "Olhar para tudo o que vivemos até aqui só me dá ainda mais certeza de que escolher você todos os dias é a melhor decisão da minha vida.",
    "Obrigada por ser minha parceira, meu porto seguro e por dividir comigo tanto os grandes momentos quanto a rotina mais simples.",
    "Que essa retrospectiva seja apenas o primeiro volume de muitos anos que ainda vamos escrever juntas.",
  ],
  signature: "Amo muito você, meu denguinho.",
};