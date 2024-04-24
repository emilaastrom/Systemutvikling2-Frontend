import { Vector } from "@/util/types/vector";

export default function Checkpoint({ passed, coords, size, borderWidth }: { passed: boolean; coords: Vector, size: number, borderWidth: number}) {
    const bgColor = passed ? "#0F0" : "#f3f6f4";

    return (
        <button
            style={{
                backgroundColor: bgColor,
                position: "absolute",
                left: `${coords.x}px`,
                top: `${coords.y}px`,
                width: `${size}px`,
                height: `${size}px`,
                borderWidth: `${borderWidth}px`,
            }}
            className="rounded-full border-4 border-gray-500"
        >
        </button>
    );
}