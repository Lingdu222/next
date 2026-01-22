import { clsx, type ClassValue } from "clsx" // clsx is a utility library for conditionally joining classNames
import { twMerge } from "tailwind-merge" // tailwind-merge is a utility library for merging Tailwind classes

export function cn(...inputs: ClassValue[]) { // cn is a utility function for merging Tailwind classes
  return twMerge(clsx(inputs))
}
