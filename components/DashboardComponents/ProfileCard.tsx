// use this when cookies is used instead of local storage

// import api from '@/lib/axios'
// import React from 'react'

// const ProfileCard = async () => {

//     // Yaha tum apna API call ya DB call karo (yahi SSR ya SSG ka magic hai)
//      const res = await api.get("/profile");
//      console.log("res ==> ", res);

//     return (
//         <div>
//             {/* <h1>{profile.name}</h1> */}
//             {/* <p>{profile.bio}</p> */}
//         </div>
//     )
// }

// export default ProfileCard


'use client'; // <- Important

import React, { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Trophy } from 'lucide-react';
import { UserProfile } from '@/types/userTypes';
import { GetBMIColor } from '@/lib/commonFunctions/getBMIColor';
import { CapitalizeText } from '@/lib/commonFunctions/CapitalizeText';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/UserContext';

const ProfileCard = () => {

    const router = useRouter();
    const { user } = useUser();
    console.log("user  from profile card==> ", user);

    const [profile, setProfile] = useState<UserProfile>();
    console.log("profile ==> ", profile);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            router.push('/')
            return
        }
        // const getProfile = async () => {
        //     const res = await api.get("/profile");
            setProfile(user);
        // };

        // getProfile();
    }, [user]);

    if (!profile) return <div>Loading...</div>;

    return (
        <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2 text-2xl">
                    <Trophy className="h-8 w-8 text-yellow-500" />
                    Your Stats
                </CardTitle>
                <CardDescription className="text-gray-600">Track your fitness journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <p className={`text-gray-500`}>Age</p>
                        <p className="font-semibold text-gray-900 text-lg">{profile?.onboarding?.age} years</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <p className={`text-gray-500`}>Weight</p>
                        <p className="font-semibold text-gray-900 text-lg">{profile?.onboarding?.currentWeight} kg</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <p className={`text-gray-500`}>Height</p>
                        <p className="font-semibold text-gray-900 text-lg">{profile?.onboarding?.height} cm</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg relative">
                        <p className={`text-gray-500`}>BMI</p>
                        <p className="font-semibold text-gray-900 text-lg">{profile?.onboarding?.bmi?.value}</p>
                        <p className={`font-semibold text-gray-900 text-sm absolute top-[-10px] right-2 rounded-2xl  p-2 italic ${GetBMIColor(profile?.onboarding?.bmi?.value)} text-white text-shadow-accent-foreground`} style={{ boxShadow: '2px 2px 6px rgba(0,0,0,0.6)' }}>{profile?.onboarding?.bmi?.category}</p>
                    </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-500 text-sm">Primary Goal</p>
                    <p className="font-semibold text-gray-900">{CapitalizeText(profile?.onboarding?.goal)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-500 text-sm">Experience Level</p>
                    <p className="font-semibold text-gray-900">{CapitalizeText(profile?.onboarding?.experienceLevel)}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;
