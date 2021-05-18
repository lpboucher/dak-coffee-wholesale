export type NavigationItemType = { label: string, link: string, children: NavigationItemType[] };

export const NAVIGATION: NavigationItemType[] = [
    {
        label: "All Products",
        link: "/products",
        children: [
            {
                label: "Coffees",
                link: "/coffee",
                children: [],
            },
            {
                label: "Merchandise",
                link: "/merchandise",
                children: [],
            },
        ],
    },
];
