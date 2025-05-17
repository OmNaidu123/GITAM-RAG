import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const keyFeatures = [
  { title: "User Authentication", description: "Secure JWT-based login & access control." },
  { title: "Chat Management", description: "Create, edit, delete chatrooms & search chat history." },
  { title: "RAG-Powered Q&A", description: "Retrieve course materials for precise AI-generated answers." },
  { title: "OpenAI Integration", description: "AI-generated answers enriched with institution-specific knowledge." },
  { title: "Contextual Conversations", description: "Track previous discussions for seamless learning." },
];

const impactBenefits = [
  { title: "Enhanced Learning", description: "Provides precise, course-aligned responses." },
  { title: "Reduced Search Time", description: "Offers direct, relevant academic answers." },
  { title: "Deeper Understanding", description: "Facilitates deeper subject matter comprehension." },
];

const LandingPage = () => {
  const navigate = useNavigate(); // ✅ Added useNavigate hook

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-black to-gray-900">
        <div className="container mx-auto text-center px-6">
          <motion.h1
            className="text-6xl font-extrabold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            RAG Unlock Academic Excellence with AI
          </motion.h1>
          <motion.p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Empowering students with a cutting-edge AI assistant, designed to provide precise and personalized academic support.
          </motion.p>

          {/* ✅ Fixed Buttons */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-4">
              <Button onClick={() => navigate("/register")} className="bg-white text-black px-8 py-4 rounded-full text-lg shadow-lg hover:bg-gray-300">
                Get Started <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>

              <Button onClick={() => navigate("/login")} className="bg-white text-black px-8 py-4 rounded-full text-lg shadow-lg hover:bg-gray-300">
                Login <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((feature, index) => (
              <Card key={index} className="bg-gray-800 text-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="my-8 border-gray-700" />

      {/* Impact & Benefits Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-8">Impact & Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactBenefits.map((benefit, index) => (
              <Card key={index} className="bg-gray-800 text-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-t from-black to-gray-900 text-center">
        <h2 className="text-3xl font-semibold mb-6">Ready to Revolutionize Your Learning?</h2>
        <p className="text-lg text-gray-400 mb-8">Join countless students benefiting from AI-driven academic assistance.</p>
        <Button onClick={() => navigate("/register")} className="bg-white text-black px-8 py-4 rounded-full text-lg shadow-lg hover:bg-gray-300">
          Start Your Journey Today <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-black border-t border-gray-800 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Academic AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
