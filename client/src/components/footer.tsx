import { motion } from "framer-motion";

export default function Footer() {
  const footerLinks = [
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Sitemap" },
  ];

  return (
    <footer className="py-12 bg-deep-navy">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4"
            style={{ fontFamily: 'Inter, sans-serif' }}
            data-testid="footer-logo"
          >
            Yagnesh Vora
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 mb-6"
            data-testid="footer-tagline"
          >
            Creating compelling digital experiences through thoughtful design
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center space-x-6 mb-8"
          >
            {footerLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ scale: 1.05 }}
                className="text-gray-400 hover:text-coral transition-colors duration-300"
                data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-500 text-sm"
            data-testid="footer-copyright"
          >
            © 2024 Yagnesh Vora. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
