import { PaymentResult } from './barion/module.d';
import { Barion } from './barion/Barion';
import * as express from "express";
import * as morgan from "morgan";
import * as https from "https";
import * as ejs from "ejs";
import { Request, Response, NextFunction, RequestHandler } from "express-serve-static-core";

(<any>Object).assign = require('object-assign');

class Application {
    private static readonly CLIENT_FILES = "views";
    private static readonly PORT: number = <any>(process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
    private static readonly IP: string = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

    private app: express.Express;

    constructor(private barion: Barion) {
        this.app = express();
        this.app.engine("html", ejs.renderFile);
        this.app.use(morgan("combined"));

        var options = {
            dotfiles: "ignore",
            etag: false,
            extensions: ["htm", "html"],
            index: "index.html",
            maxAge: "1d",
            redirect: false,
            setHeaders: (res, path, stat) => {
                res.set("x-timestamp", Date.now())
            }
        }
        this.app.use(express.static(Application.CLIENT_FILES, options));

        this.app.get("/startPayment", ((err, req, res) => {
            this.barion.startPayment(400, "HUF").subscribe((paymentResult: PaymentResult) => {
                console.log(paymentResult);
            })
        }));
        this.app.get("/barionCallback", ((err, req, res) => {
            console.log("barionCallback");
        }));

        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack);
            res.status(500).send('Something bad happened!');
        });
    }

    public start() {
        this.app.listen(Application.PORT, Application.IP);
        console.log('Server running on http://%s:%s', Application.PORT, Application.IP);
    }
}

const barion = new Barion("api.test.barion.com");
const app = new Application(barion);

app.start();

export = app["app"];
