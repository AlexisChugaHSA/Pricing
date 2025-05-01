import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Renders errors or successfull transactions on the screen.
type MessageProps = {
    content: string; // Definimos que 'content' es de tipo string
  };
  
  function Message({ content }: MessageProps) {
    return <p>{content}</p>;
  }
  
function PayPalButtonComponent({iva,paypalItems,subtotal,onPaymentApproved }:any) {
    
    const initialOptions = {
        clientId:
            "AYLqvj3pfMRED1JHhtL2p1TvTMT_m_jvqTF_VvwtZ-nE8aCfzVdRDLxNs_eR9scSx9ZzKtnlButvv3nw",
        "enable-funding": "venmo",
        "disable-funding": "",
        "buyer-country": "US",
        currency: "USD",
        "data-page-type": "product-details",
        components: "buttons",
        commit: true,
        "data-sdk-integration-source": "developer-studio",
    };

    const [message, setMessage] = useState("");
    const total=(subtotal * (1+parseFloat(iva))).toFixed(2);
    const impuesto=(subtotal * parseFloat(iva)).toFixed(2);
    const subtotalF=subtotal.toFixed(2);
 


    return (
        <div className="App">
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                    style={{
                        shape: "rect",
                        layout: "vertical",
                        color: "gold",
                        label: "paypal",
                    }} 
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [{
                                amount: {
                                    currency_code: "USD",
                                    value: total,
                                    breakdown: {
                                        item_total: {
                                            currency_code: "USD",
                                            value: subtotalF
                                        },
                                        tax_total: {
                                            currency_code: "USD",
                                            value: impuesto
                                        }
                                    }
                                },
                                items:paypalItems
                            }]
                        });
                    }}
                    onApprove={async (data, actions) => {
                        try {
                            if(actions.order){
                            const order = await actions.order.capture();
                            const payerName = order.payer?.name?.given_name + ' ' + order.payer?.name?.surname;
                            setMessage(`Pago aprobado: ${order.id}`);
                            onPaymentApproved(order.id,payerName); 
                            }
                        } catch (error) {
                            console.error("Error en el pago:", error);
                            setMessage(`Error en la transacción: ${error}`);
                        }
                    }} 
                    onCancel={() => {
                        console.log("Pago cancelado");
                    }}
                    onError={(err) => {
                        console.error("Error en el pago", err);
                    }}
                    onClick={(data, actions) => {
                        console.log("onClick", data, actions);
                      }}
                />
            </PayPalScriptProvider>
            <Message content={message} />
        </div>
    );
}

export default PayPalButtonComponent; 