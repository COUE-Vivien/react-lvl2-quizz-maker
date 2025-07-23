import type { CategoryOption } from '../types/CategoryOption';

const apiUrl = import.meta.env.VITE_CATEGORY_API_ADDRESS;

export async function fetchCategoryOptions(): Promise<CategoryOption[]> {
  try {
    const response = await fetch(apiUrl);
    const data: { trivia_categories: CategoryOption[] } = await response.json();
    return data.trivia_categories;
  } catch (error) {
    console.debug('Erreur lors de la récupération des catégories:', error);
    throw new Error('Impossible de récupérer les catégories.');
  }
}
