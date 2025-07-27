"use client"

import HoverCard from "../components/HoverCard"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Meet the Team</h1>
      <div className="flex flex-wrap justify-center gap-8 px-4 py-8">
        <HoverCard
          name={"Darryl Lecraw"}
          image={"https://avatars.githubusercontent.com/u/6304758?v=4"}
          description={"Bio for Darryl"}
          githublink={"https://github.com/BossClaw"} />
        <HoverCard
          name={"Clarance Leung"}
          image={"https://avatars.githubusercontent.com/u/194448761"}
          description={"Bio for CL"}
          githublink={"https://github.com/kn-mn"} />
        <HoverCard
          name={"Kuo Yu Lu"}
          image={"https://avatars.githubusercontent.com/u/106499794?v=4"}
          description={"Bio for Lu"}
          githublink={"https://github.com/klu0926"} />
        <HoverCard
          name={"Noah Park"}
          image={""}
          description={"Bio for Noah"}
          githublink={"https://github.com/noahp211"} />
        <HoverCard
          name={"Jasmine Sanders"}
          image={"https://avatars.githubusercontent.com/u/172424810?v=4"}
          description={"Bio for Jasmine"}
          githublink={"https://github.com/Jaysandja3y"}
        />
      </div>
    </div>
  )
}