"use client" //client side rendering

import HoverCard from "../components/HoverCard"
// main components on about page
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-gray-500 text-3xl font-bold mb-8">Meet the Team</h1>
      <div className="flex flex-wrap justify-center gap-8">
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
          description={`
            Former cinematic wizard turned code-slinging web dev. Built over 100 epic battle cutscenes. now battles bugs in JavaScript. Part-time SQL whisperer, full-time front-end sorcerer. Can debug faster than you can say “unexpected token.” Studying law, psychology, and car resale all at once because… why not? Dreams in Tailwind CSS and occasionally in APA 7 format.
            `}
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