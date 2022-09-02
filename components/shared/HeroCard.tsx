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
        <div>
            <div />
            <div>
                <div className="relative shadow-xl sm:overflow-hidden ">
                    <div className="absolute inset-0">
                        <img
                            className="h-full w-full object-cover"
                            src={data.background ?? 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100'}
                            alt="People working on laptops"
                        />
                        <div className="absolute inset-0 bg-indigo-700 mix-blend-multiply" />
                    </div>
                    <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-48 lg:px-8">
                        <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                            <span className="block text-white">{data.title}</span>
                            <span className="block text-indigo-200">{data.subtitle}</span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-lg text-center text-xl text-indigo-200 sm:max-w-3xl">
                            {data.description}
                        </p>
                        <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                            <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                                {/* { data.buttons?.length && 
                                    data.buttons.map((btn: iButtonHeroCard) => {
                                        <a
                                            key={btn.link}
                                            href={btn.link}
                                            className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-indigo-700 shadow-sm hover:bg-indigo-50 sm:px-8"
                                        >
                                            {btn.label}
                                        </a>
                                    })
                                } */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroCard;