import { FullSubPod } from "./subpod";
export type FullPod = {
    title: string;
    scanner: string;
    id: string;
    position: number;
    error: boolean;
    numsubpods: number;
    subpods: Array<FullSubPod>;
    expressiontypes: {
        name: string;
    };
};
//# sourceMappingURL=pod.d.ts.map