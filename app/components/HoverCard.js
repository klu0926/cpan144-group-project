"use client";


export default function HoverCard({ image, name, description, githublink }) {
  return (
    <div className="w-[280px] h-[400px] perspective-[1000px] group mx-auto">
      <div className="relative w-full h-full transition-transform duration-[1000ms] [transform-style:preserve-3d] group-hover:rotate-y-180">
        {/* Front Side */}
        <div className="bg-blue-300 absolute w-full h-full rounded-xl px-6 py-4 backface-hidden bg-cover bg-center flex flex-col justify-end text-white">
          <img className="rounded-xl" src={image}></img>
          <h2 className="text-xl font-medium mb-2">{name}</h2>
          <button className="w-[120px] border border-white rounded-full py-2 px-5 hover:bg-white hover:text-black transition">
            Hover
          </button>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full rounded-xl px-6 py-4 backface-hidden rotate-y-180 bg-blue-200 text-white">
          <h2 className="text-2xl font-semibold mb-1">{name}</h2>
          <p className="text-sm mb-4">
            {description}
          </p>

          {/* Links */}
          <div className="absolute bottom-5 left-0 right-0 flex justify-around items-center px-4">
            <a href={githublink}>
              <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="GitHub" className="w-10 h-10 cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
