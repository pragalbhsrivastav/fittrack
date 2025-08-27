export const GetBMIColor = (bmi: number) => {

    if (bmi < 18.5) return "bg-red-400";
    if (bmi < 25) return "bg-green-400";
    if (bmi < 30) return "bg-red-600";
    return "bg-blue-400";
} 