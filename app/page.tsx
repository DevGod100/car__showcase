'use client'
import {CustomFilter, Hero, SearchBar, CarCard, ShowMore} from "@/components"
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils"
import Image from "next/image";
import { useEffect, useState } from "react";



export default function Home() {
   const [allCars, setAllCars] = useState([])
   const [loading, setLoading] = useState(false)

   //SEARCH-STATES
   const [manufacturer, setManufacturer] = useState('')
   const [model, setModel] = useState('')

   //FILTER STATES
   const [fuel, setFuel] = useState('')
   const [year, setYear] = useState(2023)

   //PAGINATION-STATES
   const [limit, setLimit] = useState(10)

   //Re-serve cars on-new-filters

   const getCars = async () => {
    setLoading(true)
    try {
    const result  = await fetchCars({
         manufacturer: manufacturer  || '',
          model: model  || '',
          year: year  || 2023,
          fuel: fuel  || '',
          limit: limit  || 10,
        })

        setAllCars(result)
      } catch (error) {
        console.log(error);
        
      } finally {
        setLoading(false)
      }
         
   }

   useEffect(() => {
     getCars();
   }, [fuel, year, limit, manufacturer, model])
   

  const isDataEmpty = allCars.length <1

  console.log(allCars);
  

  return (
  <main className="overflow-hidden">
     <Hero />

    <div className="mt-12 padding-x padding-y max-width" id="discover">
      <div className="home__text-container">
        <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
        <p>Explore the cars you've dreamt of driving!</p>
      </div>
      <div className="home__filters">
      <SearchBar  setManufacturer={setManufacturer} setModel={setModel} />
      <div className="home__filter-container">
        <CustomFilter setFilter={setFuel} title='fuel' options={fuels}/>
        <CustomFilter setFilter={setYear} title='year' options={yearsOfProduction}/>
        </div>
      </div>
      {allCars.length > 0 ? (
        <section>
          <div className="home__cars-wrapper">
            {allCars?.map((car) => (
              <CarCard  car={car}/>
            ))}
          </div>
          {loading && (
            <div className="mt-16 w-full flex-center ">
              <Image
              src='/loader.svg'
              alt='loading'
              width={50}
              height={50}
              className='object-contain'
              />
            </div>
          )}


          <ShowMore 
          pageNumber={limit/ 10}
          isNext={limit > allCars.length}
          setLimit={setLimit}
          />
        </section>
      ) : (
        <div className="home__error-container">
          <h2 className="text-black text-xl text-bold">NO RESULT!</h2>
          <p className="text-red-500 bg-slate-600 rounded-lg">{allCars?.message}</p>
        </div>
      )}

    </div>
    </main>
  )
}

// import {CustomFilter, Hero, SearchBar, CarCard, ShowMore} from "@/components"
// import { fuels, yearsOfProduction } from "@/constants";
// import { fetchCars } from "@/utils"



// export default async function Home({searchParams}) {
//   const allCars = await fetchCars({
//     manufacturer: searchParams.manufacturer  || '',
//     model: searchParams.model  || '',
//     year: searchParams.year  || 2023,
//     fuel: searchParams.fuel  || '',
//     limit: searchParams.limit  || 10,
//   })

//   const isDataEmpty = allCars.length <1

//   console.log(allCars);
  

//   return (
//   <main className="overflow-hidden">
//      <Hero />

//     <div className="mt-12 padding-x padding-y max-width" id="discover">
//       <div className="home__text-container">
//         <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
//         <p>Explore the cars you've dreamt of driving!</p>
//       </div>
//       <div className="home__filters">
//       <SearchBar />
//       <div className="home__filter-container">
//         <CustomFilter title='fuel' options={fuels}/>
//         <CustomFilter title='year' options={yearsOfProduction}/>
//         </div>
//       </div>
//       {!isDataEmpty ? (
//         <section>
//           <div className="home__cars-wrapper">
//             {allCars?.map((car) => (
//               <CarCard  car={car}/>
//             ))}
//           </div>
//           <ShowMore 
//           pageNumber={(searchParams.limit || 10) / 10}
//           isNext={(searchParams.limit || 10) > allCars.length}
//           />
//         </section>
//       ) : (
//         <div className="home__error-container">
//           <h2 className="text-black text-xl text-bold">NO RESULT!</h2>
//           <p className="text-red-500 bg-slate-600 rounded-lg">{allCars?.message}</p>
//         </div>
//       )}

//     </div>
//     </main>
//   )
// }