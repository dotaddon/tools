
export function Clamp(cur: number, min: number, max: number) {
    if (cur < min) return min;
    if (cur > max) return max;
    return cur;
}