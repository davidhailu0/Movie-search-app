import Link from "next/link";
import Image from "next/image";

export type Props = {
  id: number;
  title: string;
  releaseDate: string;
  posterImage: string;
  averageRating: string;
};
export default function Card(props: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full">
      <Image
        className="w-full h-48 object-cover"
        src={process.env.NEXT_PUBLIC_IMAGE_PATH + props.posterImage}
        alt="Card image"
        width={400}
        height={400}
      />

      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{props.title}</h2>
        <p className="text-gray-700 text-base mb-4">{props.releaseDate}</p>
        <p className="text-gray-700 text-base mb-4">
          Average Rating {props.averageRating}
        </p>
        <Link
          href={"movie/" + props.id}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          View More
        </Link>
      </div>
    </div>
  );
}
