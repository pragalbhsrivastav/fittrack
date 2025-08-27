import Image, { StaticImageData } from 'next/image'
import React from 'react'

interface CommonBackgroundProps {
    bgImg: StaticImageData | string;
}
const CommonBackground: React.FC<CommonBackgroundProps> = ({ bgImg }) => {
    return (

        <Image
            src={bgImg}
            alt="Fitness hero background"
            className="w-full h-full object-cover"
        />
    )
}

export default CommonBackground
