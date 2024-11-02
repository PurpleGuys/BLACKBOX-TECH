"use client";

import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { GlassWater, LogOut, Crown, Box } from 'lucide-react';
import { useDrinkStore } from '@/lib/store';
import { motion } from 'framer-motion';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, logout } = useDrinkStore();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const isAdmin = currentUser?.role === 'admin';
  const isGod = currentUser?.role === 'god';
  const isConceptsPage = pathname === '/concepts';

  return (
    <header className="border-b border-purple-500/20 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-4 group cursor-pointer"
          onClick={() => router.push(currentUser ? '/concepts' : '/')}
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="relative p-2 bg-black/50 ring-1 ring-purple-500/20 rounded-lg"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Box className="w-8 h-8 text-purple-400" />
            </motion.div>
          </div>
          <div className="relative">
            <motion.h1 
              className="text-xl font-bold"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                BLACK
              </span>
              <span className="bg-gradient-to-r from-fuchsia-500 via-purple-600 to-purple-400 bg-clip-text text-transparent">
                BOX
              </span>
              <span className="ml-2 text-sm font-light tracking-wider text-purple-400/80">
                EVENTS
              </span>
            </motion.h1>
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
              animate={{
                opacity: [0, 1, 0],
                scaleX: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
        
        <nav className="flex items-center space-x-4">
          {/* Navigation links shown everywhere except concepts page */}
          {!isConceptsPage && (
            <>
              <Button
                variant="ghost"
                className="text-purple-300 hover:text-purple-100 hover:bg-purple-900/50"
                onClick={() => router.push('/tv')}
              >
                Affichage TV
              </Button>
              
              {(isAdmin || isGod) && (
                <Button
                  variant="ghost"
                  className="text-purple-300 hover:text-purple-100 hover:bg-purple-900/50"
                  onClick={() => router.push('/management')}
                >
                  Management
                </Button>
              )}
              
              {(isAdmin || isGod) && (
                <Button
                  variant="ghost"
                  className="text-purple-300 hover:text-purple-100 hover:bg-purple-900/50"
                  onClick={() => router.push('/admin')}
                >
                  Admin
                </Button>
              )}
              
              <Button
                variant="ghost"
                className="text-purple-300 hover:text-purple-100 hover:bg-purple-900/50"
                onClick={() => router.push('/acheter')}
              >
                Acheter
              </Button>
            </>
          )}

          {/* God panel access always shown for god user */}
          {isGod && (
            <Button
              variant="ghost"
              className="text-purple-300 hover:text-purple-100 hover:bg-purple-900/50 flex items-center gap-2"
              onClick={() => router.push('/god')}
            >
              <Crown className="w-4 h-4" />
              Panneau Divin
            </Button>
          )}

          {/* Back to concepts button when on any page except concepts */}
          {!isConceptsPage && currentUser && (
            <Button
              variant="ghost"
              className="text-purple-300 hover:text-purple-100 hover:bg-purple-900/50"
              onClick={() => router.push('/concepts')}
            >
              Retour aux Concepts
            </Button>
          )}

          {currentUser && (
            <>
              <span className="text-purple-400 px-3 py-1 rounded-full bg-purple-900/30">
                {currentUser.username} ({currentUser.role})
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-purple-300 hover:text-purple-100 hover:bg-purple-900/50"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}