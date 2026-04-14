"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

function CoffretsIntro() {

  const boxRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {

    gsap.from(boxRef.current, {
      y: 40,
      opacity: 0,
      scale: 0.95,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: boxRef.current,
        start: "top 80%",
      }
    })

  })

  return (
    <div className="max-w-4xl mx-auto px-6 my-16">
      <div
        ref={boxRef}
        className="bg-[#5A7B6E] text-[#FDFBF7] rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-2xl md:text-3xl font-light mb-4">
          Une expérience <span className="font-ballet text-3xl md:text-4xl">Lumi'laya</span>
        </h2>

        <p className="text-white/90 leading-relaxed">
          Nos coffrets sont pensés comme de véritables expériences sensorielles.
          Chaque composition associe plusieurs bougies afin de créer un moment
          unique : découverte de parfums, rituels de bien-être ou instants de
          détente.
        </p>

        <p className="text-white/80 mt-4">
          Certains coffrets vous permettent même de choisir vos parfums pour
          composer une atmosphère qui vous ressemble.
        </p>
      </div>
    </div>
  )
}

export default CoffretsIntro