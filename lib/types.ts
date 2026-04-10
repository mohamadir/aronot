export interface Material {
  id: string;
  name: string;
  color: string;
}

export interface Project {
  title: string;
  cat: string;
  gradient: string;
}

export interface Testimonial {
  name: string;
  city: string;
  text: string;
}

export interface SectionConfig {
  shelves: number;
  drawers: number;
  rail: boolean;
}

export interface ClosetConfig {
  width: number;
  height: number;
  depth: number;
  doors: number;
  material: Material;
  sections: SectionConfig[];
}
