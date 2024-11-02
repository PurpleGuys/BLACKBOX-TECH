"use client";

import { Header } from "@/components/Header";
import { DisplayCustomization } from "./components/DisplayCustomization";
import { UserManagement } from "./components/UserManagement";
import { DrinkManagement } from "./components/DrinkManagement";
import { motion } from "framer-motion";
import { useDrinkStore } from "@/lib/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Beer, Palette } from "lucide-react";

export default function ManagementPage() {
  const { users, drinks, addUser, removeUser, addDrink, updateDrink, removeDrink } = useDrinkStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black">
      <Header />
      
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        <Tabs defaultValue="display" className="space-y-8">
          <TabsList className="grid grid-cols-3 gap-4 bg-transparent">
            <TabsTrigger
              value="display"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
            >
              <Palette className="w-4 h-4 mr-2" />
              Personnalisation
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
            >
              <Users className="w-4 h-4 mr-2" />
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger
              value="drinks"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
            >
              <Beer className="w-4 h-4 mr-2" />
              Boissons
            </TabsTrigger>
          </TabsList>

          <TabsContent value="display">
            <DisplayCustomization />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement
              users={users}
              onAddUser={addUser}
              onRemoveUser={removeUser}
            />
          </TabsContent>

          <TabsContent value="drinks">
            <DrinkManagement
              drinks={drinks}
              onAddDrink={addDrink}
              onUpdateDrink={updateDrink}
              onRemoveDrink={removeDrink}
            />
          </TabsContent>
        </Tabs>
      </motion.main>
    </div>
  );
}