// components/StatCard.tsx
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils"; // optional, for merging classes
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type StatCardProps = {
    title: string;
    icon: React.ReactNode;
    value: number;
    target: number;
    unit?: string;
    bgColor?: string;
    textColor?: string;
    progressColor?: string;
    messageIcon?: React.ReactNode;
    messageText?: string;
    completedText?: string;
    isCompleted?: boolean;
};

export function StatCard({
    title,
    icon,
    value,
    target,
    unit = "",
    textColor = "text-gray-900",
    progressColor = "",
    messageIcon,
    messageText,
    completedText,
    isCompleted = false,
}: StatCardProps) {
    const progress = (value / target) * 100;

    return (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer border-0 shadow-sm hover:shadow-md w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={cn("text-2xl font-medium", textColor)}>{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className={cn("text-3xl font-bold mb-2", textColor)}>
                    {value}
                    <span className="text-lg text-gray-500">/{target}{unit}</span>
                </div>
                <Progress value={progress} className={`mt-2 h-2 ${progressColor}`} />
                <p className={cn("text-xs mt-2 flex items-center gap-1", textColor)}>
                    {isCompleted ? (
                        <>
                            {messageIcon}
                            {completedText}
                        </>
                    ) : (
                        <>
                            {messageIcon}
                            {messageText}
                        </>
                    )}
                </p>
            </CardContent>
        </Card>
    );
}
