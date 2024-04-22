import { Vector } from "@/util/types/vector";

export default function Checkpoint({ passed, coords, size }: { passed: boolean; coords: Vector, size: number}) {
    const bgColor = passed ? "#0F0" : "#F00";

    return (
        <button
            style={{
                backgroundColor: bgColor,
                position: "absolute",
                left: `${coords.x}px`,
                top: `${coords.y}px`,
                width: `${size}px`,
                height: `${size}px`,
            }}
            className="rounded-full h-12 w-12 border-4 border-gray-500 shadow-2xl transform hover:scale-110 transition-transform duration-200 ease-in-out">
        </button>
    );
}