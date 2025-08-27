import React from "react";
import CommonBackground from "../CommonBackground";
import gym2 from '@/public/gymnew5.jpg'
import './loader.css';

const Loader = () => {
    return (
        <div className='min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-700 to-black flex items-center justify-center'>

            <div className="absolute inset-0 opacity-10">
                <CommonBackground bgImg={gym2} />
            </div>

            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent animate-spin-slow"></div>

            <div className="text-center z-10 relative">
                {/* Animated Dumbbell */}
                <div className="mb-8">
                    <div className="flex items-center justify-center animate-lift">
                        {/* Left Weight */}
                        <div className="w-8 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg relative shadow-lg shadow-purple-500/30 animate-bounce-left">
                            <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-5 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded"></div>
                        </div>

                        {/* Bar */}
                        <div className="w-20 h-2 bg-gradient-to-r from-slate-500 to-slate-600 mx-2 rounded shadow-inner"></div>

                        {/* Right Weight */}
                        <div className="w-8 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg relative shadow-lg shadow-purple-500/30 animate-bounce-right">
                            <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-5 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded"></div>
                        </div>
                    </div>
                </div>

                {/* Loading Text */}
                <div className="font-black text-2xl text-purple-500 tracking-widest mb-8 drop-shadow-lg">
                    <span className="inline-block animate-bounce-letter" style={{ animationDelay: '0s' }}>L</span>
                    <span className="inline-block animate-bounce-letter" style={{ animationDelay: '0.01s' }}>O</span>
                    <span className="inline-block animate-bounce-letter" style={{ animationDelay: '0.02s' }}>A</span>
                    <span className="inline-block animate-bounce-letter" style={{ animationDelay: '0.03s' }}>D</span>
                    <span className="inline-block animate-bounce-letter" style={{ animationDelay: '0.04s' }}>I</span>
                    <span className="inline-block animate-bounce-letter" style={{ animationDelay: '0.05s' }}>N</span>
                    <span className="inline-block animate-bounce-letter" style={{ animationDelay: '0.06s' }}>G</span>
                </div>

                {/* Progress Bars */}
                <div className="flex gap-1 justify-center items-end">
                    <div className="w-2 h-10 bg-gradient-to-t from-purple-800 via-purple-500 to-purple-300 rounded animate-pulse-bar shadow-sm shadow-purple-400/50"></div>
                    <div className="w-2 h-10 bg-gradient-to-t from-purple-800 via-purple-500 to-purple-300 rounded animate-pulse-bar shadow-sm shadow-purple-400/50" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-10 bg-gradient-to-t from-purple-800 via-purple-500 to-purple-300 rounded animate-pulse-bar shadow-sm shadow-purple-400/50" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;