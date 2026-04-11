import type { Material, Project, Testimonial } from "./types";

export const GOLD = "#B8965A";
export const GOLD_HOVER = "#A07A42";
export const DARK = "#1A1A1A";
export const BG = "#FAFAF8";
export const MUTED = "#E8E4DF";
export const CARD_BG = "#F5F2ED";

export const BUSINESS_NAME = "מ.מ ארונות";
export const PHONE_DISPLAY = "050-989-5881";
export const WHATSAPP_NUMBER = "972509895881";

const UNS = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

export const MATERIALS: Material[] = [
  { id: "white", name: "לבן מט", color: "#F5F0EB" },
  { id: "oak", name: "אלון טבעי", color: "#C4A26E" },
  { id: "walnut", name: "אגוז", color: "#7B5B3A" },
  { id: "dark", name: "אפור כהה", color: "#4A4A4A" },
  { id: "grey", name: "אפור בהיר", color: "#B0ADA8" },
  { id: "cream", name: "שמנת", color: "#EDE5D8" },
];

export const PROJECTS: Project[] = [
  {
    title: "חדר ארונות מאסטר",
    cat: "חדרי ארונות",
    gradient: "linear-gradient(135deg, #7B5B3A 0%, #C4A26E 100%)",
    image: UNS("1558618666-fcd25c85cd64"),
  },
  {
    title: "ארון קיר מודרני",
    cat: "ארונות קיר",
    gradient: "linear-gradient(135deg, #4A4A4A 0%, #B0ADA8 100%)",
    image: UNS("1556909114-f6e7ad7d3136"),
  },
  {
    title: "מטבח אלון טבעי",
    cat: "מטבחים",
    gradient: "linear-gradient(135deg, #C4A26E 0%, #EDE5D8 100%)",
    image: UNS("1556909172-54557c7e4fb7"),
  },
  {
    title: "ארון הזזה מינימליסטי",
    cat: "ארונות קיר",
    gradient: "linear-gradient(135deg, #2C2C2C 0%, #7B5B3A 100%)",
    image: UNS("1616594039964-ae9021a400a0"),
  },
  {
    title: "חדר ארונות זוגי",
    cat: "חדרי ארונות",
    gradient: "linear-gradient(135deg, #B8965A 0%, #F5F0EB 100%)",
    image: UNS("1600585152220-90363fe7e115"),
  },
  {
    title: "פינת אחסון מעוצבת",
    cat: "אחסון",
    gradient: "linear-gradient(135deg, #EDE5D8 0%, #B0ADA8 100%)",
    image: UNS("1600585154526-990dced4db0d"),
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "רונית כהן",
    city: "תל אביב",
    text: "הארון שלנו הפך את חדר השינה למשהו אחר לגמרי. עבודה מקצועית ומדויקת.",
  },
  {
    name: "אבי לוי",
    city: "רעננה",
    text: "מהתכנון ועד ההתקנה — חוויה מושלמת. התוצאה עלתה על כל הציפיות.",
  },
  {
    name: "מיכל דוד",
    city: "הרצליה",
    text: "שירות אדיב, תשומת לב לפרטים, ותוצאה שגורמת לי לחייך כל בוקר.",
  },
];

export const SERVICES = [
  {
    icon: "✦",
    title: "עיצוב בהתאמה אישית",
    desc: "כל ארון מתוכנן מאפס — בדיוק לפי המידות, הסגנון והצרכים שלכם.",
    detail:
      "הצוות שלנו עובד איתכם כדי להבין את הצרכים האישיים שלכם ולתכנן ארון שמתאים לכם בדיוק — מהמידות ועד לחומר ולגוון.",
  },
  {
    icon: "◇",
    title: "מדידה והתקנה",
    desc: "צוות מקצועי מגיע לבית הלקוח, מודד בדייקנות ומבצע התקנה מושלמת.",
    detail:
      "המומחים שלנו מגיעים לכל מקום ברחבי הארץ, מבצעים מדידות מדויקות ומתקינים את הארון עם תשומת לב מלאה לכל פרט.",
  },
  {
    icon: "⚙",
    title: "תיקונים ושירות",
    desc: "שירות לאחר מכירה מהיר ואמין — כי אנחנו כאן לטווח הארוך.",
    detail:
      "הארון שלכם בידיים טובות גם שנים אחרי ההתקנה. שירות מהיר, אמין ומקצועי לכל בעיה שתתעורר.",
  },
  {
    icon: "✓",
    title: "בקרת איכות",
    desc: "כל פרויקט עובר בדיקת איכות קפדנית לפני מסירה ללקוח.",
    detail:
      "אנו מקפידים על עמידה בסטנדרטים הגבוהים ביותר. כל ארון עובר בדיקות מקיפות לפני המסירה — כי אתם מגיעים רק למיטב.",
  },
];

export const COUNTERTOPS = [
  { id: "concrete", name: "בטון מוחלק", color: "#A8A5A0" },
  { id: "granite",  name: "גרניט שחור", color: "#2C2C2C" },
  { id: "marble",   name: "שיש לבן",    color: "#F0EEEB" },
  { id: "wood",     name: "עץ טבעי",    color: "#C4A26E" },
  { id: "quartz",   name: "קוורץ לבן",  color: "#E8E5E0" },
];

export const PROCESS_STEPS = [
  { num: "01", title: "פגישת ייעוץ", desc: "נפגשים, מבינים צרכים ומתכננים יחד" },
  { num: "02", title: "עיצוב תלת-ממדי", desc: "מעצבים את הארון שלכם עם תצוגה מקדימה" },
  { num: "03", title: "ייצור", desc: "ייצור מדויק ואיכותי בבית המלאכה שלנו" },
  { num: "04", title: "התקנה", desc: "התקנה מקצועית ובקרת איכות מסכמת" },
];
