// // Installer d'abord le package avec npm ou yarn
// // npm install @paypal/react-paypal-js

// // Dans votre composant
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// const PayPalCheckout = () => {
//   return (
//     <PayPalScriptProvider options={{ 
//       "client-id": "VOTRE_CLIENT_ID_PAYPAL",
//       currency: "EUR",
//       locale: "fr_FR"
//     }}>
//       <PayPalButtons
//         createOrder={(data, actions) => {
//           return actions.order.create({
//             purchase_units: [
//               {
//                 amount: {
//                   value: "100.00", // Le montant à payer
//                 },
//               },
//             ],
//           });
//         }}
//         onApprove={(data, actions) => {
//           // Capture le paiement
//           return actions.order.capture().then((details) => {
//             // Gérer le succès du paiement
//             console.log("Transaction complétée par", details.payer.name.given_name);
//           });
//         }}
//       />
//     </PayPalScriptProvider>
//   );
// };

// export default PayPalCheckout;