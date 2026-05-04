import React from 'react'
import Image from 'next/image'
import { ModelData } from './modelsData'
import GlowButton from '@/components/glow-button'

const ModelCard = ({ model, index = 0 }: { model: ModelData; index?: number }) => {
  return (
    <div className='w-90 h-[420px] border rounded-[55px] border-neutral-200 flex flex-col items-center justify-center px-6 gap-6'>
      <div className='flex items-center justify-center'>
        <Image src={model.image} alt={model.name} width={100} height={80} className='object-contain' style={{ animation: `modelFloat 3s ease-in-out infinite`, animationDelay: `${index * 0.6}s` }} />
      </div>
      <div className='flex items-center flex-col gap-2 text-center mt-4'>
        <p className='text-2xl font-season-mix'>{model.name}{model.version ? ` ${model.version}` : ''}</p>
        <p className='text-sm text-neutral-500 leading-relaxed max-w-52'>{model.description}</p>
        <div className='flex items-center gap-2 mt-2'>
          {/* <GlowButton label='Try It' /> */}
          {/* <button
            className="relative overflow-hidden bg-black text-white rounded-full px-5 text-sm py-3 font-season-mix cursor-pointer focus:outline-none outline-none border-none whitespace-nowrap"
            style={{
              boxShadow:
                "inset 0 0 0 1.5px rgba(255,255,255,0.75), inset 0 0 12px rgba(255,255,255,0.55), inset 0 0 30px rgba(255,255,255,0.25)",
            }}
          >
            <span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, transparent 55%)" }}
            />
            <span className="relative z-10">Try It</span>
          </button> */}
          <button
          className="relative overflow-hidden bg-black text-white rounded-full px-5 text-sm py-2.5 font-season-mix cursor-pointer focus:outline-none outline-none w-fit flex items-center gap-2"
          style={{ boxShadow: "inset 0 0 12px rgba(255,255,255,0.55), inset 0 0 30px rgba(255,255,255,0.25)" }}
        >
          <span className="absolute inset-0 rounded-full pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, transparent 55%)" }} />
          <span className="relative z-10 flex items-center gap-2">Try It</span>
        </button>
          <button className='rounded-full border border-neutral-200 px-5 py-2.5 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors duration-150 cursor-pointer'>Learn more</button>
        </div>
      </div>
    </div>
  )
}

export default ModelCard