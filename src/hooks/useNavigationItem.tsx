import { useState, useEffect } from "react";
import { type NavigationItem, navigationConfig} from "../config/NavigationConfig.ts";

export function useNavigationItem() {
    const [items, setItem] = useState<NavigationItem[]>([]);

    useEffect(() => {
        setItem(navigationConfig)
    }, []);

    return { items };
}