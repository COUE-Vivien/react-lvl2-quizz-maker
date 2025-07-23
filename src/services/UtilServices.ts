// Utility to decode HTML entities (e.g., &quot;)
export function decodeHtml(htmlCharString: string): string {
  const parsedString = new DOMParser().parseFromString(htmlCharString, 'text/html');
  return parsedString.documentElement.textContent || '';
}

export function shuffleArray<T>(array: T[]): T[] {
  // Fisher-Yates shuffle
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
