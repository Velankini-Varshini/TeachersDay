export type TeacherTheme = "mentor" | "innovator" | "storybook" | "spark" | "architect";

export interface TeacherData {
  id: string;
  name: string;
  fullName: string;
  theme: TeacherTheme;
  title: string;
  quote: string;
  route: string;
  aliases: string[];
  placeholders: {
    message: string;
    memories: string[];
    photo: string;
    appreciation: string;
  };
}

export const teachers: TeacherData[] = [
  {
    id: "murali",
    name: "Murali",
    fullName: "Mr. P. Murali",
    theme: "mentor",
    title: "The Mentor",
    quote: "The one who guided us beyond the classroom.",
    route: "/murali",
    aliases: ["murali", "pmurali", "muralisir", "muralip", "mrpmurali"],
    placeholders: {
      message: "[Add teacher message]",
      memories: ["[Add student memories]", "[Add student memories]"],
      photo: "[Add teacher photograph]",
      appreciation: "[Add appreciation quote]"
    }
  },
  {
    id: "prabhakar",
    name: "Prabhakar",
    fullName: "Mr. Prabhakar",
    theme: "innovator",
    title: "The Innovator",
    quote: "Some teachers give answers. Some teach us how to find them.",
    route: "/prabhakar",
    aliases: ["prabhakar", "prabhakarsir", "mrprabhakar"],
    placeholders: {
      message: "[Add teacher message]",
      memories: ["[Add student memories]"],
      photo: "[Add teacher photograph]",
      appreciation: "[Add appreciation quote]"
    }
  },
  {
    id: "anjali",
    name: "Anjali",
    fullName: "Mrs. Anjali",
    theme: "storybook",
    title: "The Storybook",
    quote: "Every lesson became a chapter worth remembering.",
    route: "/anjali",
    aliases: ["anjali", "anjalimadam", "anjalimaam", "mrsanjali"],
    placeholders: {
      message: "[Add teacher message]",
      memories: ["[Add student memories]"],
      photo: "[Add teacher photograph]",
      appreciation: "[Add appreciation quote]"
    }
  },
  {
    id: "nagasirisha",
    name: "Naga Sirisha",
    fullName: "Mrs. Naga Sirisha",
    theme: "spark",
    title: "The Spark",
    quote: "Some teachers teach. Some make us want to learn.",
    route: "/naga-sirisha",
    aliases: ["naga", "sirisha", "nagasirisha", "nagamadam", "sirishamadam", "mrsnagasirisha"],
    placeholders: {
      message: "[Add teacher message]",
      memories: ["[Add student memories]"],
      photo: "[Add teacher photograph]",
      appreciation: "[Add appreciation quote]"
    }
  },
  {
    id: "sindhuja",
    name: "Sindhuja",
    fullName: "Mrs. Sindhuja",
    theme: "architect",
    title: "The Architect",
    quote: "Building futures, one lesson at a time.",
    route: "/sindhuja",
    aliases: ["sindhuja", "sindhujamadam", "sindhujamaam", "mrssindhuja"],
    placeholders: {
      message: "[Add teacher message]",
      memories: ["[Add student memories]"],
      photo: "[Add teacher photograph]",
      appreciation: "[Add appreciation quote]"
    }
  }
];

/**
 * Normalizes user input and matches it against teacher aliases.
 */
export const findTeacherByInput = (input: string): TeacherData | null => {
  // Normalize: lower case, remove punctuation, trim
  const normalized = input
    .toLowerCase()
    .replace(/[.,'"]/g, "")
    .trim();
    
  // Remove common honorifics
  let searchKey = normalized
    .replace(/^(mr|mrs|ms)\s*/, "")
    .replace(/\s*(sir|madam|maam|teacher)$/, "")
    .replace(/\s+/g, ""); // strip all spaces for easier matching

  if (!searchKey) return null;

  for (const teacher of teachers) {
    if (teacher.aliases.includes(searchKey)) {
      return teacher;
    }
  }
  
  // Fuzzy fallback: if the searchKey is included in any alias
  for (const teacher of teachers) {
    if (teacher.aliases.some(alias => alias.includes(searchKey) || searchKey.includes(alias))) {
      return teacher;
    }
  }

  return null;
};
