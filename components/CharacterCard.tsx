import Image from "next/image";

interface CharacterCardProps {
    name: string;
    age: number;
    description: string;
    imageUrl: string;
    isOnline?: boolean;
}

const CharacterCard = ({ name, age, description, imageUrl, isOnline }: CharacterCardProps) => {
    return (
        <div className="group relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-gray-800 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,112,255,0.6)] hover:-translate-y-1">
            {/* Image */}
            <div className="relative h-full w-full">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 20vw"
                />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-4">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-white shadow-black drop-shadow-md">
                        {name}, {age}
                    </h3>
                    {isOnline && (
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                    )}
                </div>
                <p className="line-clamp-2 text-sm text-gray-300 font-light leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Hover Highlight (Border bottom glow) */}
            <div className="absolute bottom-0 left-0 h-1 w-full bg-pepsi-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
    );
};

export default CharacterCard;
