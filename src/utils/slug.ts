/**
 * Convert a string to a URL-friendly slug
 * @param str - The string to convert
 * @returns The slugified string
 */
export function generateSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Check if a string is a valid slug
 * @param slug - The slug to validate
 * @returns True if valid, false otherwise
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

/**
 * Generate a unique slug with a suffix if needed
 * @param baseSlug - The base slug
 * @param existingSlugs - Array of existing slugs to check against
 * @returns A unique slug
 */
export function generateUniqueSlug(
  baseSlug: string,
  existingSlugs: string[],
): string {
  let slug = generateSlug(baseSlug);

  if (!existingSlugs.includes(slug)) {
    return slug;
  }

  let counter = 1;
  while (existingSlugs.includes(`${slug}-${counter}`)) {
    counter++;
  }

  return `${slug}-${counter}`;
}
