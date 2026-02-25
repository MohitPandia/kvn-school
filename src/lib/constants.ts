/**
 * School identity and contact (KVN Sec School, Bikaner).
 * Used in layout, navbar, About, and footer.
 */

export const schoolName = "KVN Sec School";
export const schoolFullName = "Krishna Vidhya Niketan Sec School";

export const school = {
  name: schoolName,
  fullName: schoolFullName,
  address: "Inside Jassusar Gate, Pareek Chowk, Dagon Ka Mohalla, Bikaner, Rajasthan 334001",
  phone: "9413278057",
  email: "ghanshyamkrisha1997@gmail.com",
  /** Lat, lng for maps */
  location: { lat: 28.01954692275305, lng: 73.30343032974224 },
  /** Google Maps embed URL for iframe */
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3522.1657432426096!2d73.3009197761421!3d28.01940961165751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393fdd66514efd1b%3A0xceb7fe39398d3c8b!2sKrishna%20Vidhya%20Niketan%20Sec.%20School!5e0!3m2!1sen!2sin!4v1772028541278!5m2!1sen!2sin",
} as const;

/** Navbar links (Student login, Teacher login, About us, Academics). */
export const navItems = [
  { label: "Student login", href: "/login/student" },
  { label: "Teacher login", href: "/login/teacher" },
  { label: "About us", href: "/about" },
  { label: "Academics", href: "/academics" },
] as const;
