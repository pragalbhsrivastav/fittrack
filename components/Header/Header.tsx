import React from 'react'
import { Button } from '../ui/button'
import { Activity } from 'lucide-react'
import Link from 'next/link'

const Header = () => {
    return (
        <nav className="flex justify-between items-center p-6 backdrop-blur-sm bg-white/10">
            <div className="text-2xl font-bold text-white flex items-center gap-2">
                <Activity className="h-8 w-8 text-purple-400" />
                FitTracker Pro
            </div>
            <div className="flex gap-4">
                <Link href="/signin">
                    <Button variant="default" >
                        Sign In
                    </Button>
                </Link>
                <Link href="/signup">
                    <Button variant={"outline"}>
                        Get Started
                    </Button>
                </Link>
            </div>
        </nav>
    )
}

export default Header
