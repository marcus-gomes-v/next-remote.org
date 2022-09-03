/* This example requires Tailwind CSS v2.0+ */

import { useState } from "react"

export interface iHeroCard{
    title: string
    subtitle: string
    background?: string
    description?: string
}

function HeroCard({ data }: { data: iHeroCard }) {


    return (
        <div className="flex align-middle items-center h-[80vh]">
            <div className="text-5xl md:text-7xl mx-auto text-center">
                <span className="block text-indigo-500">{data.title}</span>
                <span className="block text-indigo-800">{data.subtitle}</span>
            </div>
        </div>
    )
}

export default HeroCard;