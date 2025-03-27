import { useState } from "react";
import { Dialog } from "../ui/dialog";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Button } from "../ui/button";
import type { Agent } from "@/types/agent.types";

interface AgentFormProps {
  agent?: Agent | null;
  onClose: () => void;
}

export function AgentForm({ agent, onClose }: AgentFormProps) {
  const [formData, setFormData] = useState({
    name: agent?.name || "",
    email: agent?.email || "",
    role: agent?.role || "junior",
    department: agent?.department || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement save logic here
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          {agent ? "Modifier" : "Ajouter"} un Agent
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom</label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Rôle</label>
            <Select
              value={formData.role}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  role: e.target.value,
                }))
              }
            >
              <option value="junior">Agent Junior</option>
              <option value="senior">Agent Senior</option>
              <option value="supervisor">Superviseur</option>
              <option value="admin">Administrateur</option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Département
            </label>
            <Select
              value={formData.department}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  department: e.target.value,
                }))
              }
            >
              <option value="technical">Support Technique</option>
              <option value="customer">Service Client</option>
              <option value="billing">Facturation</option>
            </Select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">{agent ? "Mettre à jour" : "Créer"}</Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
