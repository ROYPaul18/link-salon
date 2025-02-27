'use client'
import React, { useEffect, useState, useRef } from "react";
import Header from "../ui/header";
import Footer from "../ui/footer";
import Image from "next/image";

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: PayPalButtonsConfig) => {
        render: (containerId: string | HTMLElement) => void;
      };
    };
  }
}

interface PayPalButtonsConfig {
  createOrder: (data: unknown, actions: PayPalActions) => Promise<string>;
  onApprove: (data: PayPalApproveData, actions: PayPalActions) => Promise<void>;
}

interface PayPalActions {
  order?: {
    create: (orderData: PayPalOrderData) => Promise<string>;
    capture: () => Promise<PayPalOrderDetails>;
  };
}

interface PayPalOrderData {
  purchase_units: {
    amount: {
      currency_code: string;
      value: string;
    };
    description: string;
  }[];
}

interface PayPalApproveData {
  orderID: string;
}

interface PayPalOrderDetails {
  payer?: {
    name?: {
      given_name?: string;
    };
  };
}

const TatouagePage = () => {
  const paypalButtonRef = useRef<HTMLDivElement>(null);
  const [paypalReady, setPaypalReady] = useState(false);

  // Use a separate effect to render buttons only after component is fully mounted
  useEffect(() => {
    if (paypalReady && paypalButtonRef.current && window.paypal) {
      try {
        // Clear any previous content in the container
        while (paypalButtonRef.current.firstChild) {
          paypalButtonRef.current.removeChild(paypalButtonRef.current.firstChild);
        }
        
        console.log("Rendering PayPal buttons to DOM element directly");
        
        window.paypal.Buttons({
          createOrder: function (data: unknown, actions: PayPalActions): Promise<string> {
            if (!actions.order) return Promise.reject("Order action is undefined");

            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "EUR",
                    value: "150.00",
                  },
                  description: "Séance de tatouage",
                },
              ],
            });
          },
          onApprove: function (data: PayPalApproveData, actions: PayPalActions): Promise<void> {
            if (!actions.order) return Promise.reject("Order action is undefined");

            return actions.order.capture().then(function (details: PayPalOrderDetails) {
              const name = details.payer?.name?.given_name || "Client";
              alert(`Paiement effectué! Merci ${name}`);
            });
          },
        }).render(paypalButtonRef.current);
      } catch (error) {
        console.error("Error rendering PayPal buttons:", error);
      }
    }
  }, [paypalReady, paypalButtonRef.current]);

  // Load the PayPal script separately
  useEffect(() => {
    // Don't proceed if the button container isn't ready
    if (!paypalButtonRef.current) {
      console.error("PayPal button container ref is not available");
      return;
    }

    // Clean up any existing PayPal scripts to avoid duplicates
    const existingScript = document.querySelector('script[src*="paypal.com/sdk"]');
    if (existingScript) {
      existingScript.remove();
      setPaypalReady(false);
    }

    const loadPayPalScript = () => {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=ASMZTL9ga3WDTk72pnLjRzt4puDA-VD6g_llf4BB5ckQ3Oqn38uJwgblg2yMpQxtK93fbEcyeHsIBUKs&components=messages,buttons&currency=EUR`;
      script.async = true;
      script.dataset.ppPreferences = '{"messaging":{"display":{"offerType":"PAY_LATER_PAY_IN_4"}}}';
      
      script.onload = () => {
        console.log("PayPal script loaded successfully");
        // Set ready state after script is fully loaded
        setPaypalReady(true);
      };
      
      script.onerror = (error) => {
        console.error("Error loading PayPal script:", error);
        setPaypalReady(false);
      };
      
      document.body.appendChild(script);
      
      // For PayPal messaging
      const paypalMessages = document.getElementById("paypal-message-container");
      if (paypalMessages) {
        paypalMessages.setAttribute("data-pp-message", "");
        paypalMessages.setAttribute("data-pp-placement", "product");
        paypalMessages.setAttribute("data-pp-amount", "150.00");
      }
    };

    loadPayPalScript();

    return () => {
      // Clean up script on unmount
      const script = document.querySelector('script[src*="paypal.com/sdk"]');
      if (script) {
        script.remove();
      }
      setPaypalReady(false);
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
                  <Image src="/img/test.png" alt="Exemple de tatouage" fill className="object-cover" />
                </div>
              </div>
              <div className="p-6 md:w-1/2">
                <h2 className="text-2xl font-semibold mb-2">Séance de tatouage personnalisé</h2>
                <p className="text-gray-600 mb-4">
                  Une expérience unique de tatouage réalisé par nos artistes expérimentés. Chaque tatouage est
                  personnalisé selon vos envies.
                </p>
                <div className="mb-4">
                  <span className="text-2xl font-bold">150 €</span>
                  <span className="text-gray-500 ml-2">/ séance</span>
                </div>

                {/* Message PayPal Pay in 4 */}
                <div id="paypal-message-container" className="mb-4"></div>

                {/* Bouton PayPal container */}
                <div className="mb-4" ref={paypalButtonRef}></div>
                
                {/* Fallback for loading state */}
                {!paypalReady && (
                  <div className="text-center py-4">
                    <p>Chargement des options de paiement...</p>
                  </div>
                )}
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
            <p>
              * Paiement en 4 fois sans frais par PayPal. Sous réserve d&apos;acceptation. Voir conditions sur le site
              PayPal. Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de
              vous engager.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TatouagePage;