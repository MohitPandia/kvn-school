/**
 * Site copy in English and Hindi. Used with LocaleContext so the whole site
 * switches when the user clicks the language button.
 */
export type Locale = "en" | "hi";

export const translations = {
  en: {
    nav: {
      studentLogin: "Student login",
      teacherLogin: "Teacher login",
      aboutUs: "About us",
      academics: "Academics",
      hindi: "हिंदी",
      english: "English",
    },
    home: {
      schoolName: "KVN Sec School",
      fullName: "Krishna Vidhya Niketan Secondary School",
      address: "Bikaner, Rajasthan 334001",
    },
    about: {
      title: "About Us",
      intro:
        "Established in May 1, 1997, Krishna Vidhya Niketan Secondary School, Bikaner was founded with a dream — a dream to build not just a school, but a nurturing space where children are guided, valued, and empowered to shape their own futures.",
      leadership:
        "Under the visionary leadership of Director & Principal Shri Ghanshyam Pandia, the institution was built on the belief that education is not merely about textbooks and examinations, but about character, discipline, confidence, and compassion.",
      results:
        "For more than two decades, the school has proudly delivered exceptional board examination results. Yet, our true success is not measured only by marks — it is reflected in the journeys of our students.",
      alumniHeading: "Our alumni today stand across the world:",
      alumni: [
        "Working in global technology companies such as Google",
        "Building careers abroad",
        "Serving the nation in respected Government roles",
        "Leading their own successful businesses and ventures",
      ],
      foundation:
        "Each success story carries a part of the foundation laid here — the guidance, personal attention, and unwavering belief that every child matters.",
      philosophyIntro:
        "At Krishna Vidhya Niketan Secondary School, students are not just roll numbers — they are dreams entrusted to us by families. Shri Ghanshyam Pandia's philosophy has always been simple yet powerful:",
      quote:
        "Give every child the right direction, and they will find their own destiny.",
      years:
        "For 25+ years, this institution has stood as a symbol of dedication, discipline, and heartfelt mentorship in Bikaner.",
      closing1: "We are not just shaping careers.",
      closing2: "We are shaping lives.",
      readMore: "Read full story",
      showLess: "Show less",
      findUs: "Find us",
      mobile: "Mobile",
      email: "Email",
      address: "Address",
      location: "Location",
    },
    login: {
      studentTitle: "Student login",
      teacherTitle: "Teacher login",
      comingSoon: "Login form placeholder. Coming soon.",
    },
    academics: {
      title: "Academics",
      comingSoon: "Curriculum and programs content coming soon.",
    },
    footer: {
      headingContact: "Contact",
      headingQuickLinks: "Quick Links",
      headingSchool: "School",
      rights: "All rights reserved.",
      addressLabel: "Address",
      phoneLabel: "Phone",
      emailLabel: "Email",
      quickLinks: {
        studentLogin: "Student login",
        teacherLogin: "Teacher login",
        aboutUs: "About us",
        academics: "Academics",
      },
    },
  },
  hi: {
    nav: {
      studentLogin: "छात्र लॉगिन",
      teacherLogin: "शिक्षक लॉगिन",
      aboutUs: "हमारे बारे में",
      academics: "शैक्षणिक",
      hindi: "हिंदी",
      english: "English",
    },
    home: {
      schoolName: "KVN Sec School",
      fullName: "कृष्णा विद्या निकेतन माध्यमिक विद्यालय",
      address: "बीकानेर, राजस्थान 334001",
    },
    about: {
      title: "हमारे बारे में",
      intro:
        "मई 1997 में स्थापित, कृष्णा विद्या निकेतन माध्यमिक विद्यालय, बीकानेर एक सपने के साथ शुरू किया गया — न सिर्फ एक स्कूल, बल्कि एक ऐसी जगह जहाँ बच्चों को मार्गदर्शन मिले, उनकी कदर हो, और वे अपना भविष्य खुद बना सकें।",
      leadership:
        "निर्देशक एवं प्रधानाचार्य श्री घनश्याम पंडिया के नेतृत्व में संस्थान इस विश्वास पर बना है कि शिक्षा सिर्फ किताबों और परीक्षाओं की नहीं, बल्कि चरित्र, अनुशासन, आत्मविश्वास और दया की है।",
      results:
        "दो दशक से अधिक समय से स्कूल ने बोर्ड परीक्षाओं में शानदार परिणाम दिए हैं। पर हमारी असली कामयाबी सिर्फ अंकों में नहीं — बल्कि हमारे छात्रों की यात्रा में दिखती है।",
      alumniHeading: "हमारे पूर्व छात्र आज दुनिया भर में हैं:",
      alumni: [
        "गूगल जैसी वैश्विक तकनीक कंपनियों में काम कर रहे हैं",
        "विदेश में करियर बना रहे हैं",
        "सरकारी भूमिकाओं में देश की सेवा कर रहे हैं",
        "अपने सफल व्यवसाय चला रहे हैं",
      ],
      foundation:
        "हर सफलता की कहानी में यहीं रखी गई नींव का हिस्सा है — मार्गदर्शन, व्यक्तिगत ध्यान, और यह विश्वास कि हर बच्चा मायने रखता है।",
      philosophyIntro:
        "कृष्णा विद्या निकेतन में छात्र सिर्फ रोल नंबर नहीं — वे वो सपने हैं जो परिवारों ने हमें सौंपे हैं। श्री घनश्याम पंडिया का दर्शन सरल पर शक्तिशाली रहा है:",
      quote:
        "हर बच्चे को सही दिशा दो, और वे अपनी मंज़िल खुद ढूँढ लेंगे।",
      years:
        "25 से अधिक वर्षों से यह संस्थान बीकानेर में समर्पण, अनुशासन और हार्दिक मार्गदर्शन का प्रतीक रहा है।",
      closing1: "हम सिर्फ करियर नहीं बना रहे।",
      closing2: "हम जीवन संवार रहे हैं।",
      readMore: "पूरी कहानी पढ़ें",
      showLess: "कम दिखाएं",
      findUs: "हमसे संपर्क करें",
      mobile: "मोबाइल",
      email: "ईमेल",
      address: "पता",
      location: "लोकेशन",
    },
    login: {
      studentTitle: "छात्र लॉगिन",
      teacherTitle: "शिक्षक लॉगिन",
      comingSoon: "लॉगिन फॉर्म जल्द जोड़ा जाएगा।",
    },
    academics: {
      title: "शैक्षणिक",
      comingSoon: "पाठ्यक्रम और कार्यक्रमों की सामग्री जल्द जोड़ी जाएगी।",
    },
    footer: {
      headingContact: "संपर्क",
      headingQuickLinks: "त्वरित लिंक",
      headingSchool: "विद्यालय",
      rights: "सर्वाधिकार सुरक्षित।",
      addressLabel: "पता",
      phoneLabel: "फोन",
      emailLabel: "ईमेल",
      quickLinks: {
        studentLogin: "छात्र लॉगिन",
        teacherLogin: "शिक्षक लॉगिन",
        aboutUs: "हमारे बारे में",
        academics: "शैक्षणिक",
      },
    },
  },
} as const;
