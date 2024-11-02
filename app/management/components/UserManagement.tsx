"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { UserPlus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { User } from "@/lib/types";

interface UserManagementProps {
  users: User[];
  onAddUser: (username: string, password: string, role: 'admin' | 'user') => void;
  onRemoveUser: (userId: string) => void;
}

export function UserManagement({ users, onAddUser, onRemoveUser }: UserManagementProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<'admin' | 'user'>('user');

  const handleAddUser = () => {
    if (!username || !password) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    onAddUser(username, password, role);
    setUsername("");
    setPassword("");
    toast.success("Utilisateur ajouté avec succès");
  };

  return (
    <Card className="p-6 bg-black/40 border-purple-500/20">
      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="username">Nom d'utilisateur</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-purple-950/50 border-purple-500/30"
          />
        </div>
        
        <div>
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-purple-950/50 border-purple-500/30"
          />
        </div>
        
        <div>
          <Label htmlFor="role">Rôle</Label>
          <Select value={role} onValueChange={(value: 'admin' | 'user') => setRole(value)}>
            <SelectTrigger className="bg-purple-950/50 border-purple-500/30">
              <SelectValue placeholder="Sélectionner un rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">Utilisateur</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleAddUser} className="w-full bg-purple-600 hover:bg-purple-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Ajouter un utilisateur
        </Button>
      </div>

      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 rounded-lg bg-purple-900/20 border border-purple-500/20"
          >
            <div>
              <p className="text-purple-100">{user.username}</p>
              <p className="text-sm text-purple-400">{user.role}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveUser(user.id)}
              className="text-purple-400 hover:text-purple-100 hover:bg-purple-800/50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}