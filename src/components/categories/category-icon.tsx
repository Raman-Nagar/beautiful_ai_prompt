import React from "react";
import {
  Briefcase,
  FileText,
  UserCheck,
  Code2,
  FileCode2,
  Atom,
  Layers,
  TrendingUp,
  Megaphone,
  Target,
  Share2,
  Video,
  PenTool,
  Clock,
  Mail,
  GraduationCap,
  BookOpen,
  Search,
  Compass,
  Headphones,
  Palette,
  Sparkles,
  LucideIcon,
} from "lucide-react";

interface CategoryIconProps {
  name: string;
  className?: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Briefcase,
  FileText,
  UserCheck,
  Code2,
  FileCode2,
  Atom,
  Layers,
  TrendingUp,
  Megaphone,
  Target,
  Share2,
  Video,
  PenTool,
  Clock,
  Mail,
  GraduationCap,
  BookOpen,
  Search,
  Compass,
  Headphones,
  Palette,
  Sparkles,
};

export function CategoryIcon({ name, className = "h-5 w-5" }: CategoryIconProps) {
  const IconComponent = ICON_MAP[name] || Sparkles;
  return <IconComponent className={className} aria-hidden="true" />;
}
