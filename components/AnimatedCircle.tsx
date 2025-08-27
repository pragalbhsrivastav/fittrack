import React from 'react'

const AnimatedCircles = () => {
    return (
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full animate-float"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-green-500 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-yellow-500 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute bottom-40 top-32 left-1/2 w-20 h-20 bg-orange-500 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute bottom-40 top-1/2 left-20 w-20 h-20 bg-pink-500 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute bottom-40 top-1/2 right-20 w-20 h-20 bg-red-500 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>
    )
}

export default AnimatedCircles
