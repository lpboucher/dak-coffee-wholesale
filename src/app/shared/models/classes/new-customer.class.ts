import { Sector } from "@shared/models/types/sector-type.type";
import { sentenceToKebab } from "@utils/helper";

export class NewCustomer {
    contactName!: string;
    businessName!: string;
    email!: string;
    password!: string;
    sector!: Sector;
    vatNumber?: string;
    walletDiscountCode?: string;
    walletDiscountId?: string;

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

            if (newCustomerShape.walletDiscountCode != null) {
                this.walletDiscountCode = newCustomerShape.walletDiscountCode;
            }

            if (newCustomerShape.walletDiscountId != null) {
                this.walletDiscountId = newCustomerShape.walletDiscountId;
            }
        }
    }
}
