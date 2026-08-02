import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6">
            <div className="max-w-xl text-center">

                <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-6">
                    Lumilaya
                </p>

                <h1 className="text-6xl font-light text-neutral-800 mb-6">
                    404
                </h1>

                <h2 className="text-2xl font-medium text-neutral-800 mb-4">
                    Cette page semble s’être éteinte doucement...
                </h2>

                <p className="text-neutral-600 leading-relaxed mb-10">
                    La page que vous recherchez n’existe plus ou a peut-être changé de chemin.
                    Retrouvez nos bougies naturelles et nos rituels pour continuer votre voyage.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">

                    <Link
                        href="/"
                        className="px-8 py-3 rounded-full bg-neutral-900 text-white hover:opacity-90 transition"
                    >
                        Retour à l’accueil
                    </Link>

                    <Link
                        href="/bougies-emotion"
                        className="px-8 py-3 rounded-full border border-neutral-300 text-neutral-800 hover:bg-white transition"
                    >
                        Découvrir les bougies
                    </Link>

                </div>

            </div>
        </main>
    );
}