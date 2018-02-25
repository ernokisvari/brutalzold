import * as https from "https";
import { PaymentFactory } from "./PaymentFactory";
import { Currency, PaymentResult } from "./module";
import * as Rx from 'rxjs/Rx';

export class Barion {
    public static readonly POS_KEY = "3b4e5ea68a774847986e16ae1359092a";
    public static readonly MERCHANT_EMAIL = "kisvarie@gmail.com";

    constructor(private barionUrl: string) {

    }

    public startPayment(amount: number, currency: Currency): Rx.Observable<PaymentResult> {
        let observable = new Rx.Subject<PaymentResult>();
        
        const options = {
            hostname: this.barionUrl,
            path: "/v2/Payment/Start",
            method: "POST"
        }
        const req = https.request(options, (res) => {
            let body: any = [];
            res.on("data", (d) => {
                body.push(d);
            }).on("end", () => {
                body = Buffer.concat(body).toString();
                let paymentResult: PaymentResult = JSON.parse(body);
                observable.next(paymentResult);
            })
        });
        req.setHeader("Content-Type", "application/json");
        req.write(JSON.stringify(PaymentFactory.create(amount, currency)));
        req.end();
        return observable;
    }
}
