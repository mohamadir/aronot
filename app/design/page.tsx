import type { Metadata } from "next";
import DesignConfigurator from "@/components/design/DesignConfigurator";

export const metadata: Metadata = {
  title: "עיצוב אישי — בנו את הארון שלכם",
  description:
    "כלי העיצוב האינטראקטיבי שלנו — בחרו מידות, חומרים ותוכן פנים ושלחו את העיצוב ישירות אלינו.",
};

export default function DesignPage() {
  return <DesignConfigurator />;
}
