"use client";
// Reusable card component that flips over to show more info
export default function HoverCard({ image, name, description, githublink }) {
  return (
    <div className="w-[280px] h-[400px] perspective-[1000px] group mx-auto">
      <div className="relative w-full h-full transition-transform duration-[1000ms] [transform-style:preserve-3d] group-hover:rotate-y-180">
        {/* Front Side */}
        <div className="bg-blue-300 absolute w-full h-full rounded-xl px-6 py-6 backface-hidden bg-cover bg-center flex flex-col items-center shadow-lg">
          <img className="rounded-full w-28 h-28 object-cover mb-4 border-4 border-white shadow" src={image || null } alt={name} />
          <h2 className="text-xl text-gray-500 font-bold mb-2 text-center">{name}</h2>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full rounded-xl px-6 py-6 backface-hidden rotate-y-180 bg-blue-200 text-gray-500 flex flex-col items-center shadow-lg">
          <h2 className="text-2xl font-semibold mb-2 text-center">{name}</h2>
          <p className="text-sm mb-4 text-center">{description}</p>

          {/* Links */}
          <div className="mt-auto mb-2 flex justify-center items-center w-full">
            <a href={githublink} target="_blank" rel="noopener noreferrer">
              <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="GitHub" className="w-10 h-10 cursor-pointer rounded-full" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}