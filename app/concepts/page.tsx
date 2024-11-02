"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDrinkStore } from "@/lib/store";
import { Header } from "@/components/Header";
import * as Icons from "lucide-react";
import { toast } from "sonner";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ConceptsPage() {
  const router = useRouter();
  const { currentUser, concepts, hasLicense } = useDrinkStore();

  useEffect(() => {
    if (!currentUser) {
      router.push('/');
    }
  }, [currentUser, router]);

  const handleConceptClick = (conceptId: string) => {
    if (!hasLicense(conceptId)) {
      toast.error("Vous n'avez pas accès à ce concept");
      return;
    }

    switch (conceptId) {
      case 'trading-bar':
        router.push('/acheter');
        break;
      default:
        toast.info("Ce concept n'est pas encore disponible");
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-black to-black">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <Header />
      
      <div className="relative max-w-7xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Concepts BlackBox
          </h1>
          <p className="text-purple-300/80">
            Découvrez nos différents concepts innovants
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {concepts.map((concept) => {
            const IconComponent = Icons[concept.icon as keyof typeof Icons];
            return (
              <motion.div
                key={concept.id}
                variants={item}
                whileHover={{ scale: 1.02 }}
              >
                <Card
                  className={`relative bg-black/40 border-purple-500/20 backdrop-blur-xl p-6 transition-all overflow-hidden group ${
                    hasLicense(concept.id) ? 'cursor-pointer' : 'cursor-not-allowed opacity-80'
                  }`}
                  onClick={() => handleConceptClick(concept.id)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-purple-500/20 rounded-xl">
                        {IconComponent && <IconComponent className="w-6 h-6 text-purple-400" />}
                      </div>
                      <Badge
                        variant={concept.status === 'active' ? 'default' : 'secondary'}
                        className={
                          concept.status === 'active'
                            ? 'bg-green-500/20 text-green-300 border-green-500/30'
                            : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                        }
                      >
                        {concept.status === 'active' ? 'Disponible' : 'Prochainement'}
                      </Badge>
                    </div>

                    <h2 className="text-xl font-bold text-purple-100 mb-2">
                      {concept.name}
                    </h2>
                    
                    <p className="text-purple-300/80 mb-4">
                      {concept.description}
                    </p>

                    <div className="mt-4">
                      <Button
                        className={`w-full ${
                          hasLicense(concept.id)
                            ? 'bg-purple-600 hover:bg-purple-700'
                            : 'bg-gray-600 cursor-not-allowed'
                        }`}
                        disabled={!hasLicense(concept.id)}
                      >
                        {hasLicense(concept.id) ? 'Accéder' : 'Accès Restreint'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}