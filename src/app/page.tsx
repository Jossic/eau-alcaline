export default function Home() {
  return (
      <div className="bg-gray-100 min-h-screen">
        {/* Module 1 - Accueil */}
        <section className="text-center py-20 bg-primary">
          <h1 className="text-4xl text-white mb-4">L'eau la vie</h1>
          <p className="text-white mb-8">Join our conference on water and its importance.</p>
          <form className="space-y-4 space-x-4">
            <input className="p-2 rounded" type="text" placeholder="Prénom" />
            <input className="p-2 rounded" type="text" placeholder="Nom" />
            <input className="p-2 rounded" type="email" placeholder="Email" />
            <input className="p-2 rounded" type="text" placeholder="Source" />
            <button className="bg-secondary text-white p-2 rounded">Envoyer</button>
          </form>
        </section>

        {/* Module 2 - Page de bienvenue */}
        <section className="py-20">
          <div className="max-w-2xl mx-auto text-center">
            <video controls className="w-full mb-8">
              <source src="/path_to_video.mp4" type="video/mp4" />
            </video>
            <h2 className="text-2xl mb-4">Thérapeute Holistique</h2>
            <p className="text-gray-600">[Bio and personal story]</p>
          </div>
        </section>

        {/* Module 3 - Page de présentation */}
        <section className="py-20 bg-blue-50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl mb-4">Les bienfaits de l’eau et la santé</h2>
            <p className="text-gray-600 mb-8">[Information about water and its benefits]</p>
            <button className="bg-secondary text-white p-2 rounded">Take the Survey</button>
          </div>
        </section>

        {/* ... Further sections can be similarly structured ... */}
      </div>
  );
}
