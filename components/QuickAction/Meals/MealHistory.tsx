"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import api from '@/lib/axios';
import { CapitalizeText } from '@/lib/commonFunctions/CapitalizeText';
import React, { useEffect, useState } from 'react';

interface FoodType {
  name: string;
  quantity: number;
  unit: string;
  protein: number;
  carbs: number;
  fats: number;
  otherNutrients?: string;
  calories: number;
}

interface MealType {
  _id: string;
  date: string;
  mealType: string;
  loggedAt: string;
  createdAt: string;
  updatedAt: string;
  foodItems: FoodType[];
}

interface MealHistoryProps {
  isFlipped: boolean;
}

const MealHistory: React.FC<MealHistoryProps> = ({ isFlipped }) => {
  const [historyData, setHistoryData] = useState<MealType[]>([]);
  
  const [date, setDate] = useState<Date | undefined>(undefined);
  type DateRange = { from: Date | undefined; to?: Date | undefined };
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      let url = "/meal/log";

      if (date && !dateRange) {
        url += `?date=${date.toISOString()}`;
      }

      if (dateRange?.from && dateRange?.to) {
        url += `?startDate=${dateRange.from.toISOString()}&endDate=${dateRange.to.toISOString()}`;
      }

      const data = await api.get(url);
      setHistoryData(data?.data?.meals);
    };

    fetchData();
  }, [date, dateRange, isFlipped]);

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-100 rounded-2xl overflow-hidden">

      {/* Date pickers */}
      <div className="flex justify-end items-center px-4 space-x-4 pb-3 border-b border-white/10">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="text-black bg-white">
              {date ? date.toLocaleDateString() : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="text-black bg-white">
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

      {/* Meal History */}
      <ScrollArea className="h-full w-full p-4 pb-18 pt-0">
        {historyData?.length > 0 ? (
          historyData.map((item) => (
            <Accordion
              key={item._id}
              type="single"
              collapsible
              className="w-full mb-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-md"
            >
              <AccordionItem
                value="item-1"
                className="rounded-lg overflow-hidden border border-white/10"
              >
                <AccordionTrigger className="flex justify-between items-center px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors rounded-lg">
                  <span className="font-semibold text-lg">
                    {CapitalizeText(item.mealType)}
                  </span>
                  <span className="text-sm opacity-80">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </AccordionTrigger>

                <AccordionContent className="px-4 py-3 space-y-4">
                  {item.foodItems.map((food, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-md bg-white/5 hover:bg-white/10 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center"
                    >
                      {/* Left side: food name + qty/unit */}
                      <div>
                        <p className="font-medium text-base">{CapitalizeText(food.name)}</p>
                        <p className="text-sm text-gray-300">
                          {food.quantity} {food.unit} • {food.calories} kcal
                        </p>

                        {food.otherNutrients && (
                          <div className="other-nutrients">
                            <span>Other Nutrients:</span>
                            <Badge variant={'secondary'} className='ml-2'>
                              {Object.entries(food.otherNutrients).map(([nutrient, value], i) => (
                                <span key={i}>{nutrient}: {value}, </span>
                              ))}
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Right side: nutrient badges */}
                      <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                        <Badge className="bg-blue-500 text-white">
                          Protein: {food.protein}g
                        </Badge>
                        <Badge className="bg-green-500 text-white">
                          Carbs: {food.carbs}g
                        </Badge>
                        <Badge className="bg-yellow-500 text-white">
                          Fats: {food.fats}g
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
            No meal history found
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};

export default MealHistory;
