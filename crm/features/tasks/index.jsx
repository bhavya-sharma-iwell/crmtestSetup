import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardList, Plus } from "lucide-react";
import CreateTaskForm from "./createTaskForm"; // Adjust the import path as needed

const Tasks = (props) => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="flex-1 flex flex-col justify-end p-4 pb-16">
      {showCreateForm ? (
        <CreateTaskForm />
      ) : (
        
        <div className="flex flex-col items-center text-center max-w-sm mx-auto">
          <div className="p-3 mb-4 bg-gray-100 rounded-lg">
            <ClipboardList className="w-8 h-8 text-gray-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Manage your Tasks Here</h2>
          <p className="text-gray-500 mb-6">
            Create, assign and complete your tasks efficiently
          </p>
          <Button
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus className="w-5 h-5" />
            <span>Create Task</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Tasks;
