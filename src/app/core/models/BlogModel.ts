export interface BlogModel {
  id: number;
  authorFullName: string;
  label: string;
  imageUrl: string;
  title: string;
  description: string;
  content?: string; // Puedes ajustar esto según tus necesidades
  publishDate: number;
}
