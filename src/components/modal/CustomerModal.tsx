import React from 'react';
import { Listbox } from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa';
import { UseFormRegister } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type CustomerModalProps = {
  setShowAppointmentModalStep: (show: number) => void;
  register: UseFormRegister<any>;
  selectedSource: string;
  setSelectedSource: (source: string) => void;
  watch: any;
}

export const CustomerModal: React.FC<CustomerModalProps> = ({setShowAppointmentModalStep, register, selectedSource, setSelectedSource, watch}) => {
  const sources = ['Réseaux sociaux', 'Site', 'Mailing', 'Google', 'Ami'];

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const email = watch("email");
  const canGoToNextStep = () => {
    // Vérifiez si les champs requis sont remplis
    return !!(firstName && lastName && email && selectedSource !== '');

  };
  
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
      onClick={() => setShowAppointmentModalStep(0)} // Close modal when the overlay is clicked
    >
      <ToastContainer position={toast.POSITION.BOTTOM_CENTER} />

      <div
        className="bg-white p-8 rounded-md w-96"
        onClick={(e) => e.stopPropagation()}  // Prevent clicks on the modal from closing it
      >
        <h2 className="text-xl mb-4">Renseignez vos informations</h2>
        <button className="absolute top-2 right-2" onClick={() => setShowAppointmentModalStep(0)}>&times;</button>

        <form className="space-y-4">
          <input className='p-2 w-full rounded border' type='text' placeholder='Prénom*'  {...register('firstName', {required: true})} />
          <input className='p-2 w-full rounded border' type='text' placeholder='Nom*' {...register('lastName', {required: true})} />
          <input className='p-2 w-full rounded border' type='email' placeholder='Email*' {...register('email', {required: true})}/>
          <input className='p-2 w-full rounded border' type='tel' placeholder='Téléphone' {...register('phone')}/>

          <div className="mt-4">
            <Listbox value={selectedSource} onChange={setSelectedSource}>
              {({ open }) => (
                <div className="relative">
                  <Listbox.Button className="block text-left w-full p-3 border rounded flex justify-between items-center">
                    {selectedSource === '' ? 'Vous nous avez connu via*' : selectedSource}
                    <FaChevronDown />  {/* Adding the Chevron icon here */}

                  </Listbox.Button>
                  <Listbox.Options
                    as="ul"
                    className={`absolute z-10 mt-2 w-full py-1 bg-white border border-gray-300 rounded-md shadow-lg ${
                      open ? 'block' : 'hidden'
                    }`}
                  >

                    {sources.map((source) => (
                      <Listbox.Option key={source} value={source}>
                        {({ active, selected }) => (
                          <li
                            className={`cursor-pointer select-none relative px-3 py-2 ${
                              active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                            }`}
                          >
                            {selected && (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? 'text-white' : 'text-indigo-600'
                                }`}
                              >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                            )}
                            {source}
                          </li>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              )}
            </Listbox>
          </div>

            <button onClick={(e) => {
              e.preventDefault();  // Prevent the form from submitting
              e.stopPropagation();
              if (canGoToNextStep()) {
                setShowAppointmentModalStep(2);
              } else {
                toast.error("Veuillez remplir tous les champs requis.", {
                  className: "error-toast",
                });
              }
            }} className='w-full bg-secondary text-white p-2 rounded'>Suivant</button>
           </form>
      </div>
    </div>
  )
}