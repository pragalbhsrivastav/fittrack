'use client';

import { Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

const DEFAULT_EXERCISE_TYPE = ["strength", "cardio", "flexibility"];
const DEFAULT_MUSCLE_GROUP = [
    "Chest", "Back", "Shoulders", "Biceps", "Triceps",
    "Legs", "Abs", "Glutes", "Full Body", "Other"
];

interface ExerciseSet {
    reps: number;
    weight: number;
}

interface ExerciseSchema {
    id: string;
    name: string;
    duration: number | null;
    muscleGroup: string[];
    sets: ExerciseSet[];
    exerciseType: string;
    notes?: string;
}

interface FormValues {
    workoutName: string;
    exercises: ExerciseSchema[];
}

const workoutSchema: yup.SchemaOf<FormValues> = yup.object({
    workoutName: yup.string().required("Workout Name is required"),
    exercises: yup.array().of(
        yup.object({
            id: yup.string().required(),
            name: yup.string().required("Exercise Name is required"),
            duration: yup.number().nullable().required("Duration is required").min(1, "Must be > 0"),
            muscleGroup: yup.array().of(yup.string()).min(1, "Select at least one muscle group"),
            sets: yup.array().of(
                yup.object({
                    reps: yup.number().required("Reps required").min(1),
                    weight: yup.number().required("Weight required").min(0),
                })
            ).min(1, "At least 1 set required"),
            exerciseType: yup.string().required("Exercise Type is required"),
            notes: yup.string().optional(),
        })
    ).min(1, "Add at least one exercise")
});

export default function WorkoutForm() {
    const { control, register, handleSubmit, getValues, formState: { errors }, reset } =
        useForm<FormValues>({
            resolver: yupResolver(workoutSchema),
            defaultValues: {
                workoutName: "",
                exercises: [],
            },
        });

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "exercises",
    });

    const addExercise = () => {
        append({
            id: Date.now().toString(),
            name: "",
            duration: null,
            muscleGroup: [],
            sets: [{ reps: 0, weight: 0 }],
            exerciseType: "strength",
            notes: "",
        });
    };

    const addSet = (exerciseIndex: number) => {
        const ex = fields[exerciseIndex];
        update(exerciseIndex, {
            ...ex,
            sets: [...ex.sets, { reps: 0, weight: 0 }],
        });
    };

    const removeSet = (exerciseIndex: number, setIndex: number) => {
        const ex = fields[exerciseIndex];
        update(exerciseIndex, {
            ...ex,
            sets: ex.sets.filter((_, i) => i !== setIndex),
        });
    };

    const toggleMuscleGroup = (exerciseIndex: number, muscle: string) => {
        const allValues = getValues();
        const ex = allValues.exercises[exerciseIndex];

        const updatedGroups = ex.muscleGroup.includes(muscle)
            ? ex.muscleGroup.filter((m) => m !== muscle)
            : [...ex.muscleGroup, muscle];

        update(exerciseIndex, { ...ex, muscleGroup: updatedGroups });
    };

    const saveWorkout = async (data: FormValues) => {
        const modifiedWorkouts = data.exercises.map(ex => ({
            exerciseName: ex.name,
            exerciseType: ex.exerciseType,
            muscleGroups: ex.muscleGroup,
            sets: ex.sets.length,
            reps: ex.sets.map(s => s.reps),
            weight: ex.sets.map(s => s.weight),
            duration: ex.duration,
        }));

        const modifiedPayload = {
            workoutName: data.workoutName,
            exercises: modifiedWorkouts
        };

        try {
            await api.post("/workout/log", modifiedPayload).then((res) => {
                toast.success(res.data.message);
                reset();
            });
        } catch (error) {
            toast.error("Failed to save workout");
        }
    };

    return (
        <div className="space-y-2">
            {/* Header */}
            <div className="flex justify-end">
                <Button
                    className="bg-purple-600 hover:bg-purple-500"
                    onClick={handleSubmit(saveWorkout)}
                >
                    <Save className="mr-2 h-4 w-4" /> Save Workout
                </Button>
            </div>

            {/* Workout Name */}
            <div>
                <Label className="mb-1 block text-white">Workout Name</Label>
                <Input
                    className="bg-white/10 border-white/20 rounded-lg text-white"
                    placeholder="e.g., Push Day"
                    {...register("workoutName")}
                />
                {errors.workoutName && (
                    <p className="text-red-400 text-sm mt-1">{errors.workoutName.message}</p>
                )}
            </div>

            <div className="space-y-4">
                <ScrollArea className="h-[33vh] w-full pr-2 rounded-2xl">
                    {fields.map((exercise, exerciseIndex) => (
                        <Card
                            key={exercise.id}
                            className="bg-gradient-to-br from-gray-800 to-gray-900 border-none shadow-lg rounded-xl py-4 px-0 mb-4"
                        >
                            <CardHeader className="pb-2 flex flex-col gap-4">
                                {/* Name & Duration */}
                                <div className="flex gap-4 items-center w-full">
                                    <div className="flex-1">
                                        <Label className="text-white mb-2">Exercise Name</Label>
                                        <Input
                                            className="bg-white/10 border-white/20 rounded-lg text-white"
                                            placeholder="Bench Press"
                                            {...register(`exercises.${exerciseIndex}.name` as const)}
                                        />
                                        {errors.exercises?.[exerciseIndex]?.name && (
                                            <p className="text-red-400 text-sm mt-1">
                                                {errors.exercises[exerciseIndex].name.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <Label className="text-white mb-2">Duration (min)</Label>
                                        <Input
                                            type="number"
                                            className="bg-white/10 border-white/20 rounded-lg text-white"
                                            {...register(`exercises.${exerciseIndex}.duration` as const)}
                                        />
                                        {errors.exercises?.[exerciseIndex]?.duration && (
                                            <p className="text-red-400 text-sm mt-1">
                                                {errors.exercises[exerciseIndex].duration.message}
                                            </p>
                                        )}
                                    </div>
                                    <Button className="mt-4" variant="ghost" size="icon" onClick={() => remove(exerciseIndex)}>
                                        <Trash2 className="text-red-600" />
                                    </Button>
                                </div>

                                {/* Exercise Type */}
                                <div>
                                    <Label className="text-white mb-2">Exercise Type</Label>
                                    <Controller
                                        control={control}
                                        name={`exercises.${exerciseIndex}.exerciseType`}
                                        render={({ field }) => (
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="bg-white/10 text-white rounded-lg w-80">
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-black/90 text-white">
                                                    {DEFAULT_EXERCISE_TYPE.map((type) => (
                                                        <SelectItem key={type} value={type}>
                                                            {type}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {errors.exercises?.[exerciseIndex]?.exerciseType && (
                                        <p className="text-red-400 text-sm mt-1">
                                            {errors.exercises[exerciseIndex].exerciseType.message}
                                        </p>
                                    )}
                                </div>

                                {/* Muscle Groups */}
                                <div>
                                    <Label className="text-white mb-2">Muscle Group</Label>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {DEFAULT_MUSCLE_GROUP.map((muscle) => (
                                            <Badge
                                                key={muscle}
                                                variant={exercise.muscleGroup.includes(muscle) ? "default" : "secondary"}
                                                onClick={() => toggleMuscleGroup(exerciseIndex, muscle)}
                                                className={`cursor-pointer rounded-full px-4 py-1 transition-all ${exercise.muscleGroup.includes(muscle)
                                                    ? "bg-purple-600 hover:bg-purple-500"
                                                    : "bg-gray-700 hover:bg-gray-600 text-white"
                                                    }`}
                                            >
                                                {muscle}
                                            </Badge>
                                        ))}
                                    </div>
                                    {errors.exercises?.[exerciseIndex]?.muscleGroup && (
                                        <p className="text-red-400 text-sm mt-1">
                                            {errors.exercises[exerciseIndex].muscleGroup.message}
                                        </p>
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Sets */}
                                <div className="grid grid-cols-3 gap-4 mb-4 text-white">
                                    <div>Sets</div>
                                    <div>Reps</div>
                                    <div>Weight</div>
                                </div>

                                {exercise.sets.map((set, setIndex) => (
                                    <div key={setIndex} className="flex gap-4 items-center">
                                        <Badge className="bg-indigo-500 text-white">{setIndex + 1}</Badge>
                                        <Input
                                            type="number"
                                            placeholder="Reps"
                                            className="bg-white/10 border-white/20 rounded-lg text-white"
                                            {...register(`exercises.${exerciseIndex}.sets.${setIndex}.reps` as const)}
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Weight"
                                            className="bg-white/10 border-white/20 rounded-lg text-white"
                                            {...register(`exercises.${exerciseIndex}.sets.${setIndex}.weight` as const)}
                                        />
                                        {exercise.sets.length > 1 && (
                                            <Button variant="destructive" size="icon" onClick={() => removeSet(exerciseIndex, setIndex)}>
                                                <Trash2 />
                                            </Button>
                                        )}
                                        {exercise.sets.length - 1 === setIndex && (
                                            <Button variant="outline" size="sm" onClick={() => addSet(exerciseIndex)}>
                                                <Plus className="mr-1 h-4 w-4" /> Add Set
                                            </Button>
                                        )}
                                    </div>
                                ))}

                                {/* Notes */}
                                <div>
                                    <Label className="text-white mb-2">Notes</Label>
                                    <Textarea
                                        rows={2}
                                        className="bg-white/10 border-white/20 rounded-lg text-white"
                                        {...register(`exercises.${exerciseIndex}.notes` as const)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </ScrollArea>

                {/* Add Exercise */}
                <Button
                    className="w-full bg-purple-600 hover:bg-purple-500"
                    onClick={addExercise}
                >
                    <Plus className="mr-2 h-5 w-5" /> Add Exercise
                </Button>
            </div>
        </div>
    );
}
