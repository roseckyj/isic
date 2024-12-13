import { useEffect, useState } from "react";

export function Refresh({ children }: { children: () => React.ReactNode }) {
    const [n, setN] = useState(0);

    useEffect(() => {
        const interval = setTimeout(() => {
            setN(n + 1);
        }, 1000);

        return () => clearTimeout(interval);
    }, [n]);

    // Set key to force re-render
    return <>{children()}</>;
}
