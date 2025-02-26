'use client'

import React, { useEffect } from "react";
import Header from "../ui/header";
import Footer from "../ui/footer";
import Image from "next/image";

// Définir les types PayPal
declare global {
  interface Window {
    paypal?: {
      Buttons: (config: PayPalButtonsConfig) => {
        render: (containerId: string) => void;
      };
    };
  }
}

interface PayPalButtonsConfig {
  createOrder: (data: unknown, actions: PayPalActions) => Promise<string>;
  onApprove: (data: PayPalApproveData, actions: PayPalActions) => Promise<void>;
}

interface PayPalActions {
  order: {
    create: (orderData: PayPalOrderData) => Promise<string>;
    capture: () => Promise<PayPalOrderDetails>;
  };
}

interface PayPalOrderData {
  purchase_units: {
    amount: {
      value: string;
    };
    description: string;
  }[];
}

interface PayPalApproveData {
  orderID: string;
}

interface PayPalOrderDetails {
  payer: {
    name: {
      given_name: string;
    };
  };
}

const TatouagePage = () => {
  // Cette fonction initialise le SDK PayPal 
  useEffect(() => {
    // Charger le script PayPal
    const loadPayPalScript = () => {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&components=messages,buttons&currency=EUR`;
      script.async = true;
      script.dataset.ppPreferences = '{"messaging":{"display":{"offerType":"PAY_LATER_PAY_IN_4"}}}';
      document.body.appendChild(script);
      
      script.onload = () => {
        if (window.paypal) {
          // Initialiser les boutons PayPal
          initPayPalButtons();
        }
      };
    };
    const initPayPalButtons = () => {
      if (!window.paypal) return;
      window.paypal.Buttons({
        createOrder: function(data: unknown, actions: PayPalActions): Promise<string> {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: "150.00" 
              },
              description: "Séance de tatouage"
            }]
          });
        },
        // Gérer l'approbation
        onApprove: function(data: PayPalApproveData, actions: PayPalActions): Promise<void> {
          return actions.order.capture().then(function(details: PayPalOrderDetails) {          
            alert("Paiement effectué! Merci " + details.payer.name.given_name);
          });
        }
      }).render("#paypal-button-container");
    };
    
    loadPayPalScript();
    return () => {
      const paypalScript = document.querySelector('script[src*="paypal.com/sdk"]');
      if (paypalScript) {
        paypalScript.remove();
      }
    };
  }, []);

  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-gray-50 pt-20 pb-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Services de Tatouage</h1>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 md:h-full relative">
                  <Image 
                    src="/img/test.png" 
                    alt="Exemple de tatouage"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="p-6 md:w-1/2">
                <h2 className="text-2xl font-semibold mb-2">Séance de tatouage personnalisé</h2>
                <p className="text-gray-600 mb-4">
                  Une expérience unique de tatouage réalisé par nos artistes expérimentés.
                  Chaque tatouage est personnalisé selon vos envies.
                </p>
                <div className="mb-4">
                  <span className="text-2xl font-bold">150 €</span>
                  <span className="text-gray-500 ml-2">/ séance</span>
                </div>
                
                {/* Message PayPal Pay in 4 */}
                <div id="paypal-message-container" className="mb-4"></div>
                
                {/* Bouton PayPal */}
                <div id="paypal-button-container"></div>
              </div>
            </div>
          </div>
          
          {/* Section informative */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Comment ça marche ?</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Choisissez votre design et réservez votre séance</li>
              <li>Effectuez votre paiement complet ou en 4 fois sans frais</li>
              <li>Recevez une confirmation par email avec la date et l&apos;heure</li>
              <li>Présentez-vous à votre rendez-vous à l&apos;heure indiquée</li>
            </ol>
          </div>
          
          {/* Mentions légales paiement */}
          <div className="text-sm text-gray-500">
            <p>* Paiement en 4 fois sans frais par PayPal. Sous réserve d&apos;acceptation. 
            Voir conditions sur le site PayPal. Un crédit vous engage et doit être remboursé.
            Vérifiez vos capacités de remboursement avant de vous engager.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TatouagePage;