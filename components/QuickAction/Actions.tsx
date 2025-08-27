'use client';

import React, { useState } from "react";
import { Activity, Droplets, Flame, Target, Plus } from "lucide-react";
import WorkoutPage from "./Workout/WorkoutPage";
import MealPage from "./Meals/MealPage";

interface ActionInterface {
    id: string;
    title: string;
    icon: React.ElementType;
}

const Actions = () => {
    const actions: ActionInterface[] = [
        { id: "workout", title: "Log Workout", icon: Activity },
        { id: "meal", title: "Add Meal", icon: Flame },
        { id: "water", title: "Log Water", icon: Droplets },
        { id: "goals", title: "Update Goals", icon: Target },
    ];

    const [open, setOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState<string | null>("workout");

    const handleSelect = (id: string) => {
        setSelectedAction(id);
        setOpen(false); // close menu after selection
    };

    return (
        <div className="flex flex-col md:flex-row w-full gap-6">
            {/* Right Section for details */}
            <div className="flex-1 p-4 bg-white/5 rounded-xl min-h-screen text-white">
                {selectedAction === "workout" && <WorkoutPage />}
                {selectedAction === "meal" && <MealPage />}
                {selectedAction === "water" && <div>💧 Water Tracker Coming Soon</div>}
                {selectedAction === "goals" && <div>🎯 Goals Updater Coming Soon</div>}
            </div>

            {/* Floating Action Menu */}
            <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
                {/* Menu Items */}
                <div
                    className={`flex flex-col items-end gap-3 transition-all duration-300 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
                        }`}
                >
                    {actions.map((action) => {
                        const Icon = action.icon;
                        return (
                            <button
                                key={action.id}
                                onClick={() => handleSelect(action.id)}
                                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-full shadow-lg backdrop-blur-md transition-all duration-200"
                            >
                                <span className="text-sm">{action.title}</span>
                                <Icon className="h-5 w-5" />
                            </button>
                        );
                    })}
                </div>

                {/* Main FAB */}
                <button
                    onClick={() => setOpen(!open)}
                    className="bg-pink-600 hover:bg-pink-700 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-xl transition-all duration-300"
                >
                    <Plus
                        className={`h-6 w-6 transform transition-transform duration-300 ${open ? "rotate-45" : "rotate-0"
                            }`}
                    />
                </button>
            </div>
        </div>
    );
};

export default Actions;
