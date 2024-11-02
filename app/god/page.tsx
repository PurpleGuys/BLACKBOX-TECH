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

export default function GodPage() {
  const router = useRouter();
  const { currentUser, users, concepts, grantLicense, revokeLicense } = useDrinkStore();

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'god') {
      router.push('/');
    }
  }, [currentUser, router]);

  const handleToggleLicense = (userId: string, conceptId: string, hasLicense: boolean) => {
    if (hasLicense) {
      revokeLicense(userId, conceptId);
      toast.success("Licence révoquée");
    } else {
      grantLicense(userId, conceptId);
      toast.success("Licence accordée");
    }
  };

  if (!currentUser || currentUser.role !== 'god') return null;

  const adminUsers = users.filter(user => user.role === 'admin');

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
          <div className="inline-flex items-center justify-center p-2 bg-purple-500/10 rounded-xl mb-4">
            <Icons.Crown className="w-6 h-6 text-purple-400 mr-2" />
            <span className="text-purple-300">Panneau Divin</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Gestion des Licences
          </h1>
          <p className="text-purple-300/80">
            Accordez ou révoquez l'accès aux concepts
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-8"
        >
          {adminUsers.map((user) => (
            <motion.div
              key={user.id}
              variants={item}
            >
              <Card className="bg-black/40 border-purple-500/20 backdrop-blur-xl p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-purple-100 flex items-center gap-2">
                    <Icons.User className="w-5 h-5" />
                    {user.username}
                    <Badge className="ml-2 bg-purple-500/20 text-purple-300 border-purple-500/30">
                      {user.role}
                    </Badge>
                  </h2>
                </div>

                <div className="grid gap-4">
                  {concepts.map((concept) => {
                    const hasLicense = user.licenses?.includes(concept.id);
                    const IconComponent = Icons[concept.icon as keyof typeof Icons];
                    
                    return (
                      <div
                        key={concept.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-purple-500/10"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-500/20 rounded-lg">
                            {IconComponent && <IconComponent className="w-5 h-5 text-purple-400" />}
                          </div>
                          <div>
                            <h3 className="font-semibold text-purple-100">{concept.name}</h3>
                            <p className="text-sm text-purple-300/80">{concept.description}</p>
                          </div>
                        </div>

                        <Button
                          variant={hasLicense ? "destructive" : "default"}
                          className={hasLicense ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                          onClick={() => handleToggleLicense(user.id, concept.id, !!hasLicense)}
                        >
                          {hasLicense ? "Révoquer" : "Accorder"}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}