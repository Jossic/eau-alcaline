import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

type QuestionModalProps = {
  setShowAppointmentModalStep: (show: number) => void;
  register: UseFormRegister<any>;
  watch: any;
  appointmentSubmit:any
}

export const QuestionsModal: React.FC<QuestionModalProps> = ({ setShowAppointmentModalStep, register, appointmentSubmit }) => {
  const [showFiltrationSystem, setShowFiltrationSystem] = useState(false);

  return (
    <div
      className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'
      onClick={() => setShowAppointmentModalStep(0)}
    >
      <div
        className='bg-white p-8 rounded-md w-96'
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className='text-xl mb-4'>Quelques questions pour mieux vous comprendre</h2>

        <form className='space-y-4'>
          <fieldset>
            <legend className='mb-2'>Quelle eau buvez-vous ? (plusieurs choix possibles)</legend>

            <label className='flex items-center space-x-2'>
              <input type='checkbox' {...register('waterDrinking')} name='waterDrinking' value='Robinet' className='form-checkbox rounded' />
              <span>Robinet</span>
            </label>

            <label className='flex items-center space-x-2'>
              <input type='checkbox' {...register('waterDrinking')} name='waterDrinking' value='Bouteille' className='form-checkbox rounded' />
              <span>Bouteille</span>
            </label>

            <label className='flex items-center space-x-2'>
              <input
                type='checkbox'
                {...register('waterDrinking')}
                name='waterDrinking'
                value={'Filtration'}
                className='form-checkbox rounded'
                onChange={e => setShowFiltrationSystem(e.target.checked)}
              />
              <span>Filtration</span>
            </label>
          </fieldset>
          {showFiltrationSystem && (
            <fieldset>
              <legend className='mb-2'>Quel système de filtration ?</legend>
              {['Carafe', 'Fontaine', 'Osmose', 'Adoucisseur'].map(system => (
                <label key={system} className='flex items-center space-x-2'>
                  <input type='checkbox' {...register('filtrationSystem')} name='filtrationSystem' value={system} className='form-checkbox rounded' />
                  <span>{system}</span>
                </label>
              ))}
            </fieldset>
          )}

          <fieldset>
            <legend className='mb-2'>Aviez-vous déjà entendu parler des méfaits de l'eau du robinet ?</legend>
            <label className={"mx-2"}>
              <input type='radio' {...register('heardOfTapWaterDisadvantages')} name='heardOfTapWaterDisadvantages' value='true' />
              <span className={"ml-1"}>oui</span>
            </label>
            <label className={"mx-2"}>
              <input type='radio'  {...register('heardOfTapWaterDisadvantages')} name='heardOfTapWaterDisadvantages' value='false' />
             <span className={"ml-1"}>non</span>
            </label>
          </fieldset>

          <fieldset>
            <legend className='mb-2'>Connaissez-vous les propriétés de de l’eau alcaline ?</legend>
            <label className={"mx-2"}>
              <input type='radio'  {...register('alcalineWaterKnown')} name='alcalineWaterKnown' value='true' />
             <span className={"ml-1"}>oui</span>
            </label>
            <label className={"mx-2"}>
              <input type='radio'  {...register('alcalineWaterKnown')} name='alcalineWaterKnown' value='false' />
             <span className={"ml-1"}>non</span>
            </label>
          </fieldset>

          <textarea className={"w-full h-24"} {...register('otherThingsToSay')} placeholder='Avez-vous des questions ou des choses que vous souhaiteriez aborder ?'></textarea>
        </form>
        <div className="flex justify-between space-x-2 mt-4">
          <button onClick={()=>setShowAppointmentModalStep(1)} className='w-1/2 bg-gray-200 text-gray-700 p-2 rounded'>Précédent</button>
          <button type={'submit'} onClick={appointmentSubmit} className='w-1/2 bg-secondary text-white p-2 rounded'>Suivant</button>
        </div>
      </div>
    </div>
  );
};
