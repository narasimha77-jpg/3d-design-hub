import { Link, useLocation } from "react-router-dom";
import { Box, Image, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";

const links = [
  { to: "/", label: "Home", icon: Box },
  { to: "/gallery", label: "Gallery", icon: LayoutGrid },
  { to: "/upload", label: "Upload", icon: Image },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container flex items-center justify-between h-16 px-6">
        <Link to="/" className="flex items-center gap-2 text-primary font-display font-bold text-lg">
          <Box className="w-5 h-5" />
          3D Showcase
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
