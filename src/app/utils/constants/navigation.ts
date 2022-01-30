export type NavigationItemType = { label: string, link: string, children: NavigationItemType[] };

export type FooterNavigationItemType = Omit<NavigationItemType, "children"> & { internal: boolean };

export const NAVIGATION: NavigationItemType[] = [
    {
        label: "All Products",
        link: "/products",
        children: [
            {
                label: "Coffees",
                link: "/coffee",
                children: [
                    {
                        label: "Filter",
                        link: "/filter",
                        children: [],
                    },
                    {
                        label: "Espresso",
                        link: "/espresso",
                        children: [],
                    },
                ],
            },
            {
                label: "Merchandise",
                link: "/merchandise",
                children: [],
            },
        ],
    },
    {
        label: "General Information",
        link: "/general-information",
        children: [],
    }
];

export const FOOTER_NAVIGATION: FooterNavigationItemType[] = [
    { label: "All Products", link: "products/all", internal: true },
    { label: "Coffee", link: "products/coffee", internal: true },
    { label: "Merchandise", link: "products/merchandise", internal: true },
    { label: "General Information", link: "general-information", internal: true },
    { label: "Contact", link: "https://www.dakcoffeeroasters.com/contact", internal: false },
    { label: "Newsletter", link: "https://www.dakcoffeeroasters.com/subscribe", internal: false },
    { label: "About", link: "https://www.dakcoffeeroasters.com/about", internal: false },
    { label: "Terms & Conditions", link: "https://www.dakcoffeeroasters.com/terms", internal: false },
    { label: "Privacy", link: "https://www.dakcoffeeroasters.com/privacy", internal: false },
];
