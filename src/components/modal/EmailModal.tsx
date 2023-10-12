import React from 'react';
import { UseFormRegister } from 'react-hook-form';


type EmailModalProps = {
  setShowMailModal: (show: boolean) => void;
  register: UseFormRegister<any>;
}

export const EmailModal: React.FC<EmailModalProps> = ({setShowMailModal}) => {

  return ( <div
    className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
    onClick={() => setShowMailModal(false)} // Close modal when the overlay is clicked
  >
    <div
      className="bg-white p-8 rounded-md w-96"
      onClick={(e) => e.stopPropagation()}  // Prevent clicks on the modal from closing it
    >
      <h2 className="text-2xl mb-4">Entrez votre email</h2>
      <form className="space-y-4">
        <input className="p-2 w-full rounded border" type="email" placeholder="Email" />
        <button className="w-full bg-secondary text-white p-2 rounded">Soumettre</button>
      </form>
      <button className="absolute top-2 right-2" onClick={() => setShowMailModal(false)}>&times;</button>
    </div>
  </div>)
}