import React from 'react'

function Hero() {
  return (
    <section className="bg-black lg:grid lg:h-screen lg:place-content-center">
      <div className='flex items-baseline justify-cen ter pt-20'>
      <h2 className='text-white border px-3 p-2 rounded-full text-center border-white'>See What's New | <span className='text-sky-300'>AI Diagram</span></h2>
      </div>
  <div className="mx-auto h-screen max-w-screen-xl px-4 py-12 lg:flex ">
    <div className="mx-auto max-w-prose text-center">
      <h1 className="text-4xl text-sky-300 font-bold text-gray-900 sm:text-5xl">
        Documents & diagrams
        <strong className="text-white"> for engineering teams. </strong>
      </h1>

      <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed text-slate-200">
        All-in-one markdown editor, collaborative canvas, and diagram-as-code builder.
      </p>

      <div className="mt-4 flex justify-center gap-4 sm:mt-6">
        <a
          className="inline-block rounded bg-white text-black px-5 py-3 font-medium"
          href="#"
        >
          Learn More
        </a>

      </div>
    </div>
  </div>
</section>
  )
}

export default Hero