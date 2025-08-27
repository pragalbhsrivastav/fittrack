'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import api from '@/lib/axios';
import React, { useEffect, useState } from 'react';

interface exerciseSchema {
  exerciseName: string;
  exerciseType: string;
  muscleGroups: string[];
  sets: number;
  reps: number[];
  weight: number[];
  duration: number;
  caloriesBurned: number;
}

interface WorkoutHistoryItem {
  workoutName: string;
  _id: string;
  date: string;
  exercises: exerciseSchema[];
  totalCaloriesBurned: number;
  notes: string;
}

interface WorkoutHistoryProps {
  isFlipped: boolean;
}

const WorkoutHistory: React.FC<WorkoutHistoryProps> = ({ isFlipped }) => {
  const [historyData, setHistoryData] = useState<WorkoutHistoryItem[]>([]);

  const [date, setDate] = useState<Date | undefined>(undefined);
  type DateRange = { from: Date | undefined; to?: Date | undefined };
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);


  useEffect(() => {
    const fetchData = async () => {
      let url = "/workout/log";

      if (date && !dateRange) {
        url += `?date=${date.toISOString()}`;
      }

      if (dateRange?.from && dateRange?.to) {
        url += `?startDate=${dateRange.from.toISOString()}&endDate=${dateRange.to.toISOString()}`;
      }

      const data = await api.get(url);
      setHistoryData(data?.data?.data);
    };

    fetchData();
  }, [date, dateRange, isFlipped]);

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-full rounded-2xl overflow-hidden">
      <div className='flex justify-end items-center px-4 space-x-4'>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className='text-black'>
              {date ? date.toLocaleDateString() : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className='text-black'>
              {dateRange?.from && dateRange?.to
                ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                : "Pick date range"}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar mode="range" selected={dateRange} onSelect={setDateRange} />
          </PopoverContent>
        </Popover>
      </div>

      <ScrollArea className="h-full w-full p-4">
        {historyData.length > 0 ? (
          historyData.map((item) => (
            <Accordion
              key={item._id}
              type="single"
              collapsible
              className="w-full mb-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl"
            >
              <AccordionItem
                value="item-1"
                className="rounded-lg overflow-hidden border border-white/10"
              >
                <AccordionTrigger className="flex justify-between items-center px-4 py-2 bg-white/5 hover:bg-white/10 transition-colors rounded-lg">
                  <span className="font-semibold text-lg">{item.workoutName}</span>
                  <span className="text-sm opacity-80">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                  <Badge className="text-white">
                    Total Calories Burned: {item.totalCaloriesBurned} kcal
                  </Badge>
                </AccordionTrigger>

                <AccordionContent className="px-4 py-3 space-y-4">
                  {item.exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">
                          {exercise.exerciseName} — {exercise.sets} sets × {exercise.reps.join(', ')} reps
                        </span>
                        <Badge variant="secondary" className="bg-yellow-500 text-black">
                          {exercise.caloriesBurned} kcal
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-blue-500 text-white">
                          Type: {exercise.exerciseType}
                        </Badge>
                        <Badge className="bg-green-500 text-white">
                          {exercise.muscleGroups.join(', ')}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))
        ) : (
          <div className="text-center text-sm text-gray-300 py-8">
            No workout history found

          </div>
        )}
      </ScrollArea>
    </Card>
  );
};

export default WorkoutHistory;
