import { Vector } from "@/util/types/vector";

export default function Checkpoint({ passed, coords, scale, size, borderWidth }: { passed: boolean; coords: Vector, scale: number, size: number, borderWidth: number}) {
    const color = passed ?  "bg-green-400" : "bg-gray-200";
    const hoverColor = passed ?  "hover:bg-green-500" : "hover:bg-gray-300";
    const opacity = Math.max(0, Math.min(1, Math.pow(coords.y / (200 * scale), 2)));

    return (
        <button
            style={{
                position: "absolute",
                left: `${coords.x}px`,
                top: `${coords.y}px`,
                width: `${size}px`,
                height: `${size}px`,
                borderWidth: `${borderWidth}px`,
                opacity: opacity,
                // boxShadow: "0 3px 0 0px rgb(107 114 128), 0 6px 0 0px rgb(107 114 128)",
            }}
            className={`${color} ${hoverColor} rounded-full border-4 border-gray-500 transform translate-y-[-6px] active:translate-y-0 shadow-custom active:shadow-none child`}
        >
        </button>
    );
}