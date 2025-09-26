import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Linkedin, Github, Instagram, Dribbble } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [socialDialogOpen, setSocialDialogOpen] = useState(false);
  const [pendingSocialLink, setPendingSocialLink] = useState<string | null>(null);

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertMessage) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you as soon as possible.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertMessage) => {
    contactMutation.mutate(data);
  };

  const handleSocialClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setPendingSocialLink(href);
    setSocialDialogOpen(true);
  };

  const proceedToSocialLink = () => {
    if (pendingSocialLink) {
      window.open(pendingSocialLink, '_blank', 'noopener,noreferrer');
    }
    setSocialDialogOpen(false);
    setPendingSocialLink(null);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "yagneshvora7@gmail.com",
      href: "mailto:yagneshvora7@gmail.com",
      testId: "contact-email"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+61 406 242 179",
      href: "tel:+61406242179",
      testId: "contact-phone"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Available Worldwide",
      testId: "contact-location"
    },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/everythingux/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/yaggy.v/", label: "Instagram" },
  ];

  return (
    <section id="contact" className="py-20 bg-medium-gray bg-opacity-50" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-16"
            style={{ fontFamily: 'Inter, sans-serif' }}
            data-testid="contact-title"
          >
            Let's <span className="bg-gradient-primary bg-clip-text text-transparent">Connect</span>
          </motion.h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-4" data-testid="contact-subtitle">
                  Ready to collaborate?
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed" data-testid="contact-description">
                  I'm always excited to work on new projects and bring creative visions to life. 
                  Whether you need UX design, photography, videography, or complete multimedia solutions, 
                  let's discuss how we can create something amazing together.
                </p>
              </div>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-4"
                    data-testid={info.testId}
                  >
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <info.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold">{info.title}</h4>
                      {info.href ? (
                        <a 
                          href={info.href} 
                          className="text-gray-400 hover:text-coral transition-colors duration-200 hover:underline"
                          data-testid={`${info.testId}-link`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-400">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex space-x-6"
              >
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    onClick={(e) => handleSocialClick(e, social.href)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 glass-morphism rounded-full flex items-center justify-center hover:bg-coral hover:text-white transition-all duration-300 cursor-pointer"
                    data-testid={`contact-social-${social.label.toLowerCase()}`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass-morphism p-8 rounded-2xl"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your Name" 
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-coral"
                            data-testid="input-name"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="your@email.com" 
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-coral"
                            data-testid="input-email"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Project Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                          <FormControl>
                            <SelectTrigger 
                              className="bg-white/10 border-white/20 text-white focus:border-coral"
                              data-testid="select-project-type"
                            >
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ux">UX Design</SelectItem>
                            <SelectItem value="photography">Photography</SelectItem>
                            <SelectItem value="videography">Videography</SelectItem>
                            <SelectItem value="design">Graphic Design</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={4}
                            placeholder="Tell me about your project..." 
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-coral"
                            data-testid="textarea-message"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-gradient-primary hover:shadow-2xl py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                    data-testid="button-send-message"
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Social Media Warning Dialog */}
      <AlertDialog open={socialDialogOpen} onOpenChange={setSocialDialogOpen}>
        <AlertDialogContent className="bg-deep-navy border-white/20 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold">
              Don't Judge 😅
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              Just a quick note 👋
              My social profiles are a mix of personal and professional, and I'm in the middle of updating them. Feel free to take a look and connect—I'd love to stay in touch!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-3">
            <AlertDialogCancel className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Maybe Later
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={proceedToSocialLink}
              className="bg-gradient-primary hover:shadow-lg"
            >
              Let's Connect!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
