import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, PlusIcon, Trash2 } from "lucide-react";
import { Tr } from "zod/v4/locales";
import api from "@/lib/axios";


interface mealSchema {
    mealType: "breakfast" | "lunch" | "dinner" | "snack";
    foodItem: {
        name: string;
        quantity: number;
        unit: string;
    }[];
}

interface FormValues {
    meals: mealSchema[];
}

const schema: yup.SchemaOf<FormValues> = yup.object({
    meals: yup.array().of(
        yup.object({
            mealType: yup
                .string()
                .required("Meal type is required")
                .oneOf(["breakfast", "lunch", "dinner", "snack"]),
            foodItem: yup.array().of
                (yup.object({
                    name: yup.string().required("Food name is required"),
                    quantity: yup
                        .number()
                        .typeError("Quantity must be a number")
                        .positive("Quantity must be greater than 0")
                        .required("Quantity is required"),
                    unit: yup
                        .string()
                        .required("Unit is required")
                })).required("Please provide at least one food item"),
        })
    ).min(1, "At least one meal is required"),
});

type FormData = yup.InferType<typeof schema>;

const MealLog: React.FC = () => {
    const {
        control,
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            meals: []
        },
    });


    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "meals",
    });

    const addMeals = () => {
        append({
            mealType: "",
            foodItem: [{ name: "", quantity: null, unit: "" }],
        });
    };

    const addFoodItem = (index: number) => {
        const meals = getValues("meals");
        const updatedMeals = [...meals];
        updatedMeals[index].foodItem.push({ name: "", quantity: null, unit: "" });
        update(index, updatedMeals[index]);
    }

    const removeFoodItem = (mealIndex: number, foodIndex: number) => {
        const meals = getValues("meals");
        console.log("meals ==> ", meals);
        const updatedMeals = [...meals];
        updatedMeals[mealIndex].foodItem.splice(foodIndex, 1);
        update(mealIndex, updatedMeals[mealIndex]);
    }

    const onSubmit = async(data: FormData) => {
        console.log("Meal logged:", data);
        // reset();
        await api.post('meal/log', data).then((response) => {
            console.log("Meal logged successfully:", response.data);
            reset();
        }).catch((error) => {
            console.error("Error logging meal:", error);
            // Handle error appropriately, e.g., show a notification
        });
    };

    return (
        <div className="space-y-4">

            <div className="flex justify-end mb-4">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700" onClick={handleSubmit(onSubmit)}>Save Meal</Button>
            </div>
            <ScrollArea className="h-[40vh] w-full pr-2 rounded-2xl">

                <div className="space-y-4">
                    {fields.map((f, index) => (
                        <Card
                            key={index}
                            className="bg-gradient-to-br from-gray-800 to-gray-900 border-none shadow-lg rounded-xl p-4 pt-6 mb-4"
                        >
                            <CardContent className="grid grid-cols-1 gap-4">
                                {/* Meal Type */}
                                <div className="flex items-center space-x-2">

                                    <div className="mb-2  w-[95%]">
                                        <Label className="text-white mb-2">
                                            Meal Type
                                        </Label>

                                        <Controller
                                            control={control}
                                            name={`meals.${index}.mealType` as const}
                                            render={({ field }) => (
                                                <Select
                                                    required
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className="bg-white/10 border-white/20 text-white w-full">
                                                        <SelectValue
                                                            className="text-white"
                                                            placeholder="Select your gender"
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-black border-white/10 text-white w-75">
                                                        {[
                                                            { value: 'breakfast', label: 'Breakfast', icon: ' 🍳' },
                                                            { value: 'lunch', label: 'Lunch', icon: '🥗' },
                                                            { value: 'dinner', label: 'Dinner', icon: '🍛' },
                                                            { value: 'snack', label: 'Snack', icon: '🍎' },
                                                        ].map((gender) => (
                                                            <SelectItem
                                                                key={gender.value}
                                                                value={gender.value}
                                                                className="flex items-center gap-2 w-75"
                                                            >
                                                                <span>{gender.icon}</span>
                                                                <span>{gender.label}</span>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />

                                        {errors.meals?.[index]?.mealType && (
                                            <p className="text-red-500 text-sm">{errors.meals?.[index]?.mealType.message}</p>
                                        )}
                                    </div>

                                    <Button className="bg-red-500 hover:bg-red-600 text-white mt-3" onClick={() => remove(index)}>
                                        <Trash2 />
                                    </Button>

                                </div>

                                {/* Food Items Header Row */}
                                <div className="grid grid-cols-12 gap-4 text-white mb-2">
                                    <div className="col-span-4">
                                        <Label>Food Name</Label>
                                    </div>
                                    <div className="col-span-3">
                                        <Label>Quantity</Label>
                                    </div>
                                    <div className="col-span-3">
                                        <Label>Unit</Label>
                                    </div>
                                    <div className="col-span-2 text-center">
                                        <Label>Actions</Label>
                                    </div>
                                </div>

                                {/* Food Items Dynamic Rows */}
                                {f?.foodItem?.map((_, foodIndex: number) => (
                                    <div
                                        key={foodIndex}
                                        className="grid grid-cols-12 gap-4 items-center mb-2"
                                    >
                                        {/* Food Name */}
                                        <div className="col-span-4">
                                            <Input
                                                type="text"
                                                {...register(`meals.${index}.foodItem.${foodIndex}.name` as const)}
                                                placeholder="e.g. Boiled Egg"
                                                className="bg-white/10 border-white/20 rounded-lg text-white"
                                            />

                                            {errors.meals?.[index]?.foodItem?.[foodIndex]?.name && (<p className="text-red-500 text-sm"> {errors.meals?.[index]?.foodItem?.[foodIndex]?.name?.message} </p>)}

                                        </div>

                                        {/* Quantity */}
                                        <div className="col-span-3">
                                            <Input
                                                type="number"
                                                {...register(`meals.${index}.foodItem.${foodIndex}.quantity` as const)}
                                                placeholder="e.g. 2"
                                                className="bg-white/10 border-white/20 rounded-lg text-white"
                                            />
                                            {errors.meals?.[index]?.foodItem?.[foodIndex]?.quantity && (<p className="text-red-500 text-sm"> {errors.meals?.[index]?.foodItem?.[foodIndex]?.quantity?.message} </p>)}
                                        </div>

                                        {/* Unit */}
                                        <div className="col-span-3">
                                            <Input
                                                type="text"
                                                {...register(`meals.${index}.foodItem.${foodIndex}.unit` as const)}
                                                placeholder="e.g. grams, ml, pieces, cups"
                                                className="bg-white/10 border-white/20 rounded-lg text-white"
                                            />
                                            {errors.meals?.[index]?.foodItem?.[foodIndex]?.unit && (<p className="text-red-500 text-sm"> {errors.meals?.[index]?.foodItem?.[foodIndex]?.unit?.message} </p>)}
                                        </div>

                                        {/* Actions (Add/Delete buttons) */}
                                        <div className="col-span-2 flex items-center justify-center space-x-2">
                                            {foodIndex > 0 && (
                                                <Button
                                                    type="button"
                                                    onClick={() => removeFoodItem(index, foodIndex)}
                                                    className="bg-red-600 hover:bg-red-700 text-white"
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            )}
                                            <Button
                                                type="button"
                                                onClick={() => addFoodItem(index)}
                                                className="bg-green-600 hover:bg-green-700 text-white"
                                            >
                                                <PlusIcon size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                ))}

                            </CardContent>
                        </Card>
                    ))}

                    {/* Submit Button */}

                </div>
            </ScrollArea>

            <Button
                type="submit"
                onClick={addMeals}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
                Add Meal
            </Button>
        </div>
    );
};

export default MealLog;
