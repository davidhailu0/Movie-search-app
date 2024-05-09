import Image from "next/image";

async function getData(id: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const json = await res.json();
  return json;
}

export default async function Movie({ params }: { params: { id: number } }) {
  const data = await getData(params.id);
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8">
      <div className="w-full lg:w-1/2">
        <Image
          src={process.env.NEXT_PUBLIC_IMAGE_PATH + data["poster_path"]}
          alt="Movie Poster"
          className="w-full h-auto rounded-lg shadow-md"
          width={700}
          height={700}
        />
      </div>

      <div className="w-full lg:w-1/2 px-4 py-8">
        <h1 className="text-xl font-bold mb-4">{data["title"]}</h1>
        <p className="text-gray-700 mb-4">
          Release Date:{" "}
          <span className="font-medium">{data["release_date"]}</span>
        </p>
        <p className="text-gray-700 mb-4">
          Average Rating:{" "}
          <span className="font-medium">{data["vote_average"]}</span> / 10
        </p>
        <p className="text-gray-700 mb-8">{data["overview"]}</p>
        <h3 className="text-lg font-bold mb-2">Runtime</h3>
        <p className="text-gray-700 mb-8">{data["runtime"]} minute</p>
      </div>
    </div>
  );
}
