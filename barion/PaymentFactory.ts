import { Barion } from "./Barion";
import { Payment, Currency } from "./module";

export class PaymentFactory {
    public static create(amount: number, currency: Currency): Payment {
        return {
            POSKey: Barion.POS_KEY,
            PaymentType: "Immediate",
            PaymentWindow: "2:00:00:00",
            GuestCheckOut: true,
            FundingSources: ["All"],
            PaymentRequestId: guid(),
            Transactions: [
                {
                    POSTransactionId: guid(),
                    Payee: Barion.MERCHANT_EMAIL,
                    Total: amount,
                    Items: []
                }
            ],
            Locale: "hu-HU",
            Currency: currency
        }
    }
}

function guid(): string {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
