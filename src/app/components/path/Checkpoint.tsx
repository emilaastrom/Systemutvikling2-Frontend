import { colors } from "../../../../tailwind.config";
import { Vector } from "@/util/types/vector";

export default function Checkpoint({ passed, coords, scale, size, borderWidth }: { passed: boolean; coords: Vector, scale: number, size: number, borderWidth: number}) {
    const color = passed ? "bg-primary-light" : "bg-secondary-light";
    const hoverColor = passed ?  "hover:bg-primary-dark" : "hover:bg-secondary-dark";
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
            }}
            className={`${color} ${hoverColor} rounded-full border-4 border-dark transform translate-y-[-6px] active:translate-y-0 shadow-custom shadow-dark active:shadow-none`}
        >
        </button>
    );
}