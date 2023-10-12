'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { EmailModal } from '@/components/modal/EmailModal';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { CustomerModal } from '@/components/modal/CustomerModal';
import { QuestionsModal } from '@/components/modal/QuestionsModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SubmitHandler, useForm } from 'react-hook-form';


export type ProspectForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  knownBy: string;
  waterDrinking: string[];
  filtrationSystem: string[];
  heardOfTapWaterDisadvantages: boolean;
  alcalineWaterKnown: boolean;
  otherThingsToSay: string;

}

function stringToBoolean(stringValue: string) {
  return stringValue === 'true';
}
export default function Home() {
  const [showMailModal, setShowMailModal] = useState(false);
  const [showAppointmentModalStep, setShowAppointmentModalStep] = useState(0); // 0 for not showing, 1 for form, 2 for calendly
  const [mailLoading, setMailLoading] = useState(false);
  const [appointmentLoading, setAppointmentLoading] = useState(false);
  const [selectedSource, setSelectedSource] = useState("");


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProspectForm>();

  const handleMailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMailLoading(true);


    const response = await fetch('/api/???', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // email: values.email,
      }),
    });

    if (response.ok) {
      // If the response is okay, clear the form
      setMailLoading(false);
      toast.success('Votre message à bien été envoyé !', {
        className: 'success-toast',
      });
    } else {
      // If the response is not okay, show an error message
      setMailLoading(false);
      toast.error('Une erreur est survenue. Veuillez réessayer.', {
        className: 'error-toast',
      });
    }
  };

  const appointmentSubmit: SubmitHandler<ProspectForm> = async (data: ProspectForm) => {
    console.log('data appointmentSubmit =>', data);
    setAppointmentLoading(true);
    let {
      firstName,
      lastName,
      email,
      phone,
      waterDrinking,
      filtrationSystem,
      heardOfTapWaterDisadvantages,
      alcalineWaterKnown,
      otherThingsToSay,
    } = data;
    if (!filtrationSystem) filtrationSystem = []

    const response = await fetch('/api/prospect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        knownBy: selectedSource,
        waterDrinking,
        filtrationSystem,
        heardOfTapWaterDisadvantages: stringToBoolean(heardOfTapWaterDisadvantages as unknown as string),
        alcalineWaterKnown: stringToBoolean(alcalineWaterKnown as unknown as string),
        otherThingsToSay,
      }),
    });

    if (response.ok) {
      // If the response is okay, clear the form
      setAppointmentLoading(false);
      toast.success('Votre message à bien été envoyé !', {
        className: 'success-toast',
      });
      setShowAppointmentModalStep(3)
    } else {
      // If the response is not okay, show an error message
      setAppointmentLoading(false);
      toast.error('Une erreur est survenue. Veuillez réessayer.', {
        className: 'error-toast',
      });
    }
  };

  return (
    <main className='bg-gray-100 min-h-screen text-black'>
      {/* Module 1 - Accueil */}
      <section className='relative text-center py-20' style={{
        backgroundImage: 'url(/jossic_healthy_water_light_blue_colors_hero_background_44f59799-32bd-445f-8bd3-e8fd8e224862.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='relative z-10 container mx-auto px-6'>
          <h1 className='text-5xl text-white mb-12'>L'eau la vie</h1>
          <div className={'grid grid-cols-1 lg:grid-cols-2 gap-3'}>
            <div>
              <p className='text-white mb-8'>Demandez notre guide sur l'eau</p>
              <button
                className='bg-secondary text-white px-4 py-2 rounded-full transform hover:scale-105 transition-transform'
                onClick={() => setShowMailModal(true)}>
                Recevoir mon guide
              </button>
            </div>
            <div>
              <p className='text-white mb-8'>Bénéficier d'un rendez-vous gratuit de 30 minutes avec un spécialiste de
                l'eau</p>
              <button
                className='bg-secondary text-white px-4 py-2 rounded-full transform hover:scale-105 transition-transform'
                onClick={() => setShowAppointmentModalStep(1)}
              >
                Prendre rendez-vous
              </button>
            </div>
          </div>
        </div>
      </section>
      {/*</section>*/}

      <form className='mx-auto max-w-xl' onSubmit={handleMailSubmit}>

        {/* Email Modal */}
        {showMailModal && (
          <EmailModal setShowMailModal={setShowMailModal} register={register} />
        )}
      </form>

      <form className='mx-auto max-w-xl' onSubmit={handleSubmit(appointmentSubmit)} >

        {/* Two Step Modal for Appointment */}
        {showAppointmentModalStep === 1 && (
          <CustomerModal watch={watch} setShowAppointmentModalStep={setShowAppointmentModalStep} register={register} selectedSource={selectedSource} setSelectedSource={setSelectedSource} />
        )}

        {showAppointmentModalStep === 2 && (
          <QuestionsModal watch={watch} appointmentSubmit={appointmentSubmit} setShowAppointmentModalStep={setShowAppointmentModalStep} register={register} />
        )}
      </form>

      {showAppointmentModalStep === 3 && (
        <div
          className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'
          onClick={() => setShowAppointmentModalStep(0)} // Close modal when the overlay is clicked
        >
          <div
            className='bg-white p-8 rounded-md w-96 md:w-1/2'
            onClick={(e) => e.stopPropagation()}  // Prevent clicks on the modal from closing it
          >
            <h2 className='text-2xl mb-4'>Prendre rendez-vous</h2>
            <CalendlyEmbed />
            <button onClick={() => setShowAppointmentModalStep(2)}
                    className='w-1/2 bg-gray-200 text-gray-700 p-2 rounded mr-2'>Précédent
            </button>

            {/*<button className='w-full bg-secondary text-white p-2 rounded'>Demander mon rendez-vous</button>*/}

          </div>
        </div>
      )}

      {/* Module 2 - Page de bienvenue */}
      <section className='py-20'>
        <div className='max-w-2xl mx-auto text-center'>
          <video controls className='w-full mb-8'>
            {/*<source src='/path_to_video.mp4' type='video/mp4' />*/}
          </video>
          <h2 className='text-2xl mb-4'>Eva URRESTARAZU - Thérapeute Holistique</h2>
          <p className='text-gray-600'>Je suis Thérapeute Holistique.
            Depuis trente ans, je me forme à la psychologie et, depuis une dizaine d’années, je me forme à la médecine
            chinoise, à la sante cellulaire, aux neurosciences…
            En somme, je m’intéresse de près au comportement humain.
            Ce qui me plaît tout particulièrement dans la santé, c’est la corrélation entre le psychisme et la maladie.
            Je cherche à comprendre la source des problèmes, qu’ils soient psychosomatiques ou physiologiques.
            Savez-vous qu’il a été démontré que la posture mentale est à l’origine de 80% des pathologies ?
          </p>
        </div>
      </section>

      {/* Module 3 - Page de présentation */}
      <section className='py-20 bg-primary'>
        <div className='max-w-2xl mx-auto'>
          <h2 className='text-2xl mb-4'>Les bienfaits de l’eau et la santé</h2>
          <p className='text-gray-600 mb-8'>[Information about water and its benefits]</p>
          <button className='bg-secondary text-white p-2 rounded'>Répondre au formulaire (A ouvrir dans une modale ? -
            Lister les questions)
          </button>
          <div className='text-gray-600 mb-8'>
            <h3>L'eau, c'est la vie !</h3><br />
            <p>Nous sommes de plus en plus nombreux à nous soucier de ce que nous mangeons et prenons conscience que la
              nourriture est un facteur essentiel à notre santé.</p><br />
            <p>Certains appliquent les conseils de naturopathes ou de médecins renommés comme : Irène Grosjean, le Pr
              Joyeux, le Dr Tal Schaller ou encore Marion Kaplan… mais cela reste une minorité.</p><br />
            <p>D’autres encore s’informent sur notre flore intestinale, les huiles essentielles, l’homéopathie, la
              phytothérapie, la micronutrition, les émotions, la psychologie…</p><br />
            <p> Mais presque personne ne s’informe sur de la qualité de l’eau que nous buvons, pas même les
              professionnels de santé !</p><br />

            <p>Vous pouvez consommer la nourriture la plus saine et la plus équilibrée qui soit, prendre tous les
              compléments alimentaires que vous voulez, faire du sport, du yoga, etc… vous n’obtiendrez pas de résultat
              significatif si votre eau n’est pas filtrée, biodynamisée et alcaline et vous finirez, tôt ou tard, par en
              ressentir des effets néfastes dont voici une liste non exhaustive :</p>
            <ul>
              <li><strong>&#8226; Inflammation</strong></li>
              <li><strong>&#8226; Constipation</strong></li>
              <li><strong>&#8226; Fatigue chronique</strong></li>
              <li><strong>&#8226; Problèmes de sommeil</strong></li>
              <li><strong>&#8226; Vieillissement prématuré</strong></li>
              <li><strong>&#8226; Cholestérol</strong></li>
              <li><strong>&#8226; Prise de poids</strong></li>
              <li><strong>&#8226; Problèmes de peau</strong></li>
              <li><strong>&#8226; Troubles digestifs</strong></li>
            </ul>
            <br />
            <p>Ces signes avant-coureurs nous alertent que notre système est déréglé. Si nous n'agissont pas rapidement,
              les symptômes vont s'aggraver et la maladie va s'installer.</p>
            <br />
            <p>L’hydratation est un des 5 piliers de la santé cellulaire, démontrée par les Dr Jean-Louis Vidalo & René
              Olivier.</p>

            <hr className={'my-5'} />
            <div className={'grid grid-cols-1 lg:grid-cols-2 gap-3'}>
              <blockquote>
                <p>
                  Quand Hippocrate, médecin grec de l'Antiquité (5e siècle av. J-C), disait : <q><i> Que ton
                  alimentation
                  soit
                  ta première médecine </i></q>, il ignorait qu’après l’ère industrielle nos eaux seraient polluées,
                  sinon il
                  aurait
                  très certainement spécifié : <q><i>Que ton alimentation ET ton eau soient ta première
                  médecine. </i></q>
                </p>
              </blockquote>
              <div className={'flex items-center mx-auto'}>
                <Image src={'/hippocrate.png'} alt={'Hippocrate'} width={300} height={200} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-20 '>
        <div className='max-w-2xl mx-auto'>
          <h2 className='text-2xl mb-4'>L'eau, une ressource vitale</h2>

          <p>L'eau est une ressource essentielle à la vie sur Terre. Elle est indispensable à la survie de tous les
            êtres vivants, humains, animaux et végétaux.</p>

          <p>L'eau est présente sur Terre sous différentes formes, notamment l'eau liquide, l'eau solide et l'eau
            gazeuse. Elle est répartie sur la planète de manière inégale, avec des zones très humides et des zones très
            sèches.</p>

          <p>L'eau est une ressource précieuse qu'il faut protéger. Elle est menacée par de nombreux facteurs, tels que
            la pollution, la pénurie et le changement climatique.</p>

          <h2>Les bienfaits de l'eau</h2>

          <p>L'eau est essentielle à la santé humaine. Elle permet de réguler la température du corps, de transporter
            les nutriments et les déchets, et de lubrifier les articulations.</p>

          <p>Voici une liste des principaux bienfaits de l'eau pour la santé :</p>

          <ul>
            <li><strong>Hydratation de la peau :</strong> L'eau aide à maintenir la peau hydratée et élastique, ce qui
              réduit l'apparition des rides et des ridules.
            </li>
            <li><strong>Régulation de la température corporelle :</strong> L'eau aide à réguler la température
              corporelle en absorbant la chaleur lorsque le corps est chaud et en la libérant lorsque le corps est
              froid.
            </li>
            <li><strong>Transport des nutriments et des déchets :</strong> L'eau transporte les nutriments essentiels
              vers les cellules et les déchets hors des cellules.
            </li>
            <li><strong>Lubrification des articulations :</strong> L'eau lubrifie les articulations, ce qui réduit la
              friction et les douleurs articulaires.
            </li>
            <li><strong>Prévention des calculs rénaux :</strong> L'eau aide à prévenir la formation de calculs rénaux en
              diluant l'urine.
            </li>
            <li><strong>Amélioration des performances cognitives :</strong> L'eau aide à améliorer les performances
              cognitives en augmentant la concentration et la vigilance.
            </li>
            <li><strong>Réduction du risque de constipation :</strong> L'eau aide à réduire le risque de constipation en
              ramollissant les selles.
            </li>
            <li><strong>Maintien d'un poids santé :</strong> L'eau peut aider à maintenir un poids santé en réduisant la
              sensation de faim et en augmentant la sensation de satiété.
            </li>
          </ul>

          <h3>Combien d'eau faut-il boire par jour ?</h3>

          <p>La quantité d'eau qu'il faut boire par jour varie en fonction de l'âge, du sexe, de l'activité physique et
            de l'environnement. En général, il est recommandé de boire environ 8 verres d'eau par jour.</p>

          <p>Cependant, il est important de boire plus d'eau si vous faites beaucoup d'exercice physique ou si vous
            vivez dans un environnement chaud et humide.</p>

          <h3>Comment savoir si je suis bien hydraté ?</h3>

          <p>Il existe plusieurs signes qui indiquent que vous êtes bien hydraté, notamment :</p>

          <ul>
            <li>Votre urine est claire ou jaune pâle.</li>
            <li>Vous avez une bonne énergie.</li>
            <li>Vous n'avez pas de maux de tête.</li>
            <li>Votre peau est hydratée et élastique.</li>
          </ul>

          <h3>Conseils pour rester hydraté</h3>

          <p>Voici quelques conseils pour rester hydraté :</p>

          <ul>
            <li>Gardez toujours une bouteille d'eau à proximité.</li>
            <li>Buvez de l'eau avant, pendant et après l'exercice physique.</li>
            <li>Évitez les boissons sucrées, telles que les sodas et les jus de fruits.</li>
            <li>Mangez des fruits et légumes riches en eau, tels que la pastèque, le concombre et les tomates.</li>
            <li>Si vous vivez dans un environnement chaud et humide, buvez plus d'eau.</li>
          </ul>

          <h3>Conclusion</h3>

          L'eau est une ressource essentielle à la santé humaine. Il est important de rester hydraté en buvant
          suffisamment d'eau chaque jour.
        </div>

      </section>
      {/* ... Further sections can be similarly structured ... */}


    </main>
  );
}
