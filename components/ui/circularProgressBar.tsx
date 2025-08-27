'use client';

import {
    CircularProgressbar,
    buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export default function GenericCircularProgressbar() {
    return (
        <Card className="w-100">
            <CardHeader>
                <CardTitle>Total Daily Energy Expedature</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex gap-3 justify-between items-center">
                 <div>
                    <div className="text-2xl text-shadow-amber-500 font-bold">Calories</div>
                    <div className="text-2xl text-shadow-amber-500 font-bold">Protein</div>
                    <div className="text-2xl text-shadow-amber-500 font-bold">Minerals</div>
                    <div className="text-2xl text-shadow-amber-500 font-bold">Vitamin</div>
                </div>

                <div className="w-50">
                 <CircularProgressbar
                    value={66}
                    text={`66%`}
                    styles={buildStyles({
                        textColor: "#000",
                        pathColor: "#3b82f6", // Tailwind blue-500
                        trailColor: "#e5e7eb", // Tailwind gray-200
                    })}
                />
               </div>
               </div>
               
            </CardContent>
        </Card>
    );
}
