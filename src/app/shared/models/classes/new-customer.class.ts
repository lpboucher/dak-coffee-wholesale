type Sector = "cafe" | "restaurant" | "office" | "subscription box" | "reseller";

export class NewCustomer {
    contactName: string = "";
    businessName: string = "";
    email: string = "";
    password: string = "";
    sector: Sector | undefined;
    vatNumber: string | undefined;

    constructor(
        contactName: string,
        businessName: string,
        email: string,
        password: string,
        sector?: Sector,
        vatNumber?: string,
    ) {
        this.contactName = contactName;
        this.businessName = businessName;
        this.email = email;
        this.password = password;

        if (sector != null) {
            this.sector = sector;
        }

        if (vatNumber != null) {
            this.vatNumber = vatNumber;
        }
    }
}
