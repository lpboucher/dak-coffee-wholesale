import { Sector } from "@shared/models/types/sector-type.type";

export class NewCustomer {
    contactName: string | null = null;
    businessName: string | null = null;
    email: string | null = null;
    password: string | null = null;
    sector: Sector | null = null;
    vatNumber: string | null = null;

    constructor(newCustomerShape?: Partial<NewCustomer>) {
        if (newCustomerShape != null) {
            if (newCustomerShape.contactName != null) {
                this.contactName = newCustomerShape.contactName;
            }

            if (newCustomerShape.businessName != null) {
                this.businessName = newCustomerShape.businessName;
            }

            if (newCustomerShape.email != null) {
                this.email = newCustomerShape.email;
            }

            if (newCustomerShape.password != null) {
                this.password = newCustomerShape.password;
            }

            if (newCustomerShape.sector != null) {
                this.sector = newCustomerShape.sector;
            }

            if (newCustomerShape.vatNumber != null) {
                this.vatNumber = newCustomerShape.vatNumber;
            }
        }
    }
}
