/**
 * School identity and contact (KVN Sec School, Bikaner).
 * Used in layout, navbar, About, and footer.
 */

export const schoolName = "KVN Sec School";
export const schoolFullName = "Krishna Vidhya Niketan Sec School";

export const school = {
  name: schoolName,
  fullName: schoolFullName,
  address: "Bikaner, Rajasthan 334001",
  /** Placeholder; replace with real contact when available */
  phone: "",
  email: "",
} as const;

/** Navbar links (Student login, Teacher login, About us, Academics). */
export const navItems = [
  { label: "Student login", href: "/login/student" },
  { label: "Teacher login", href: "/login/teacher" },
  { label: "About us", href: "/about" },
  { label: "Academics", href: "/academics" },
] as const;
