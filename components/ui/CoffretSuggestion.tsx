"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

function CoffretsFuture() {

  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {

    gsap.from(sectionRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%"
      }
    })

  })

  return (
    <div
      ref={sectionRef}
      className="max-w-3xl mx-auto text-center px-6 py-20"
    >
      <h3 className="text-2xl md:text-3xl font-light text-[#2C2C2C] mb-4">
        D'autres coffrets arrivent bientôt
      </h3>

      <p className="text-[#2C2C2C]/70 mb-8">
        Nous imaginons régulièrement de nouvelles compositions.
        Si vous avez une idée de coffret ou un thème particulier,
        n'hésitez pas à nous le suggérer.
      </p>

      <div className="flex gap-3 justify-center flex-col sm:flex-row">
        <input
          type="text"
          placeholder="Votre idée de coffret..."
          className="border border-[#5A7B6E]/40 rounded-full px-6 py-3 w-full sm:w-80 outline-none focus:border-[#5A7B6E]"
        />

        <button
          className="bg-[#5A7B6E] text-white rounded-full px-6 py-3 hover:bg-[#4a6b5e] transition-colors"
        >
          Envoyer
        </button>
      </div>
    </div>
  )
}

export default CoffretsFuture