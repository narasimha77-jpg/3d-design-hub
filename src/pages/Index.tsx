import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Upload, LayoutGrid, Sparkles, Eye, Zap } from "lucide-react";
import HeroScene from "@/components/HeroScene";

const features = [
  { icon: Eye, title: "Interactive 3D", desc: "Rotate, zoom, and pan models in real-time" },
  { icon: Sparkles, title: "Presentation Mode", desc: "Fullscreen immersive showcasing" },
  { icon: Zap, title: "Material Toggle", desc: "Switch between solid and wireframe views" },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center grid-bg">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-[100px]" />

        <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center pt-24 px-6">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary font-mono text-sm mb-4 tracking-widest uppercase">
              3D Design Platform
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4">
              <span className="text-gradient">3D Design</span>
              <br />
              Showcase
            </h1>
            <p className="text-xl text-muted-foreground max-w-md mb-8">
              Visualize. Present. Impress.
              <br />
              The modern way to showcase 3D designs.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/upload"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm glow-primary hover:brightness-110 transition-all"
              >
                <Upload className="w-4 h-4" /> Upload Model
              </Link>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm border border-border hover:bg-secondary/80 transition-colors"
              >
                <LayoutGrid className="w-4 h-4" /> View Gallery
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* 3D Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[400px] lg:h-[500px]"
          >
            <HeroScene />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-display font-bold mb-3">
              Everything you need
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              A complete toolkit for presenting your 3D designs professionally.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 text-center group hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:glow-primary transition-shadow">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
