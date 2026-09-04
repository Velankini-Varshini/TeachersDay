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
    title: "The One Who Taught Us to Think Beyond the Surface",
    quote: "You didn’t just teach us Deep Learning… you taught us that every complex problem has a pattern waiting to be discovered.",
    route: "/murali",
    aliases: ["murali", "pmurali", "muralisir", "muralip", "mrpmurali"],
    placeholders: {
      message: "From neural networks to backpropagation, you made even the most complicated concepts feel understandable. But beyond algorithms, models, and loss functions, you taught us something more valuable — the patience to learn, the courage to make mistakes, and the curiosity to keep going.\n\nThank you, Murali Sir, for helping us train not just our models, but our minds. 🧠✨",
      memories: [
        "From neural networks to backpropagation, you made even the most complicated concepts feel understandable.",
        "You taught us something more valuable — the patience to learn, the courage to make mistakes, and the curiosity to keep going."
      ],
      photo: "[Add teacher photograph]",
      appreciation: "Thank you for making our brains work overtime… and somehow making us enjoy it. 🧠😂"
    }
  },
  {
    id: "prabhakar",
    name: "Prabhakar",
    fullName: "Mr. Prabhakar",
    theme: "innovator",
    title: "The Compiler Architect",
    quote: "You didn't just teach us Compiler Design… you taught us how to turn errors into lessons and code into endless possibilities.",
    route: "/prabhakar",
    aliases: ["prabhakar", "prabhakarsir", "mrprabhakar"],
    placeholders: {
      message: "From lexical analysis to code generation, you made Compiler Design feel structured, logical, and deeply rewarding. Beyond syntax and parsing, you taught us how to debug our mistakes with patience and write our futures with confidence.\n\nThank you, Prabhakar Sir, for guiding us through every layer of code! 💻✨",
      memories: [
        "From lexical analysis to code generation, you made Compiler Design feel structured, logical, and deeply rewarding.",
        "You taught us how to turn errors into lessons and code into possibilities."
      ],
      photo: "[Add teacher photograph]",
      appreciation: "Thank you for helping us turn errors into lessons and code into possibilities. 💻✨"
    }
  },
  {
    id: "anjali",
    name: "Anjali",
    fullName: "Mrs. Anjali",
    theme: "storybook",
    title: "The AI Visionary",
    quote: "You didn't just teach us Artificial Intelligence… you taught us to think smarter, question deeper, and see possibilities beyond what we already know.",
    route: "/anjali",
    aliases: ["anjali", "anjalimadam", "anjalimaam", "mrsanjali"],
    placeholders: {
      message: "From neural networks to machine intelligence, you made even the most complex AI models clear, intuitive, and inspiring. Beyond data and algorithms, you taught us how to think critically and approach problems with curiosity.\n\nThank you, Anjali Ma'am, for guiding us to build a smarter future! 🤖✨",
      memories: [
        "From neural networks to machine intelligence, you made even the most complex AI models clear and inspiring.",
        "You taught us to think smarter, question deeper, and see possibilities beyond what we already know."
      ],
      photo: "[Add teacher photograph]",
      appreciation: "Thank you for teaching us to think smarter, question deeper, and see the possibilities beyond what we already know. 🤖✨"
    }
  },
  {
    id: "nagasirisha",
    name: "Naga Sirisha",
    fullName: "Mrs. Naga Sirisha",
    theme: "spark",
    title: "The Network Architect",
    quote: "You didn't just teach us Computer Networks… you kept us connected to knowledge, guidance, and inspiration every single day.",
    route: "/naga-sirisha",
    aliases: ["naga", "sirisha", "nagasirisha", "nagamadam", "sirishamadam", "mrsnagasirisha"],
    placeholders: {
      message: "From OSI layers to network protocols, you made Computer Networks feel seamless, intuitive, and engaging. Beyond data packets and routing, you taught us how to build strong connections and navigate life's challenges with confidence.\n\nThank you, Naga Sirisha Ma'am, for always keeping us connected to learning! 🌐✨",
      memories: [
        "From OSI layers to network protocols, you made Computer Networks feel seamless, intuitive, and engaging.",
        "You always kept us connected to knowledge, even when our own networks seemed to disconnect."
      ],
      photo: "[Add teacher photograph]",
      appreciation: "Thank you for always keeping us connected to knowledge, even when our own networks seemed to disconnect! 🌐❤️"
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
