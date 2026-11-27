export interface Memory {
  id: string;
  date: string; // Formato: "YYYY-MM-DD"
  displayDate: string; // Ex: "14 de Fevereiro de 2025"
  title: string;
  location?: string;
  description: string;
  imageUrl: string; // Caminho dentro de public/ (ex: "/photos/foto1.jpg")
  tag?: string;
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  icon: "heart" | "plane" | "sparkles" | "calendar";
  highlight: string;
}

export interface LetterData {
  greeting: string;
  paragraphs: string[];
  signature: string;
}