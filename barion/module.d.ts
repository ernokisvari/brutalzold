export type Currency = "HUF" | "EUR" | "USD";
export type Locale = "hu-HU" | "en-US" | "de-DE" | "fr-FR" | "es-ES" | "sk-SK" | "sl-SI";

export interface Payment {
    POSKey: string;
    PaymentType: "Immediate" | "Reservation";
    ReservationPeriod?: string;
    PaymentWindow?: string;
    GuestCheckOut: boolean;
    InitiateRecurrence?: boolean;
    RecurrenceId?: string;
    FundingSources: ("All" | "Balance")[];
    PaymentRequestId: string;
    PayerHint?: string;
    RedirectUrl?: string;
    CallbackUrl?: string;
    Transactions: PaymentTransaction[];
    OrderNumber?: string;
    ShippingAddress?: ShippingAddress;
    Locale: Locale;
    Currency: Currency;
}

export interface PaymentResult {
    PaymentId: string;
    PaymentRequestId: string;
    Status: PaymentStatus;
    QRUrl: string;
    RecurrenceResult: "Successful" | "None" | "Failed" | "NotFound";
    Transactions: ProcessedTransaction[];
    GatewayUrl: string;
    CallbackUrl: string;
    RedirectUrl: string;
}

export interface PaymentTransaction {
    POSTransactionId: string;
    Payee: string;
    Total: number;
    Comment?: string;
    PayeeTransactions?: PayeeTransaction[];
    Items: Item[];
}

export interface ShippingAddress {
    DeliveryMethod?: string;
    Country?: string;
    City?: string;
    Region?: string;
    Zip?: string;
    Street?: string;
    Street2?: string;
    FullName?: string;
    Phone?: string;
}

export interface PayeeTransaction {
    POSTransactionId: string;
    Payee: string;
    Total: number;
    Comment?: string
}

export interface Item {
    Name: string;
    Description: string;
    ImageUrl?: string;
    Quantity: number;
    Unit: string;
    UnitPrice: number;
    ItemTotal: number;
    SKU?: string;
}

export enum PaymentStatus {
    Prepared = 10,
    Started = 20,
    InProgress = 21,
    Reserved = 25,
    Canceled = 30,
    Succeeded = 40,
    Failed = 50,
    PartiallySucceeded = 60,
    Expired = 70
}

export interface ProcessedTransaction {
    POSTransactionId: string;
    TransactionId: string;
    Status: TransactionStatus;
    Currency: string;
    TransactionTime: string;
}

export enum TransactionStatus {
    Prepared = 0,
    Started = 1,
    Succeeded = 2,
    Timeout = 3,
    ShopIsDeleted = 4,
    ShopIsClosed = 5,
    Rejected = 6,
    RejectedByShop = 12,
    Storno = 13,
    Reserved = 14,
    Deleted = 15,
    Expired = 16,
    InvalidPaymentRecord = 210,
    PaymentTimeOut = 211,
    InvalidPaymentStatus = 212,
    PaymentSenderOrRecipientIsInvalid = 213,
    Unknown = 255
}
