import type { Metadata } from "next";
import DesignPageClient from "@/components/design/DesignPageClient";

export const metadata: Metadata = {
  title: "עיצוב אישי — בנו את הארון או המטבח שלכם",
  description:
    "כלי העיצוב האינטראקטיבי שלנו — בחרו מידות, חומרים ופריסה לארון חדר או מטבח ושלחו את העיצוב ישירות אלינו.",
};

export default function DesignPage() {
  return <DesignPageClient />;
}
