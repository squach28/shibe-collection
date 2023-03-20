import { Roboto } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import '../styles/Home.module.css'

const roboto = Roboto({
    weight: '400',
    subsets: ['latin']

  })

export default function Home({shibes}) {
  console.log(shibes)
  return (
    <div className="h-screen w-screen p-5">
      <header>
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-5xl"><Link href="/">Shibe Museum</Link></h1>
        </div>
      </header>
      <main>
        <div>
          <h2 className="text-lg text-center my-20">The website to truly experience the best of shibes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 justify-items-center">
            {shibes.map(shibe => <Image key={shibe} width={400} height={400} src={shibe} alt="it's a shibe" />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
export async function getStaticProps() {
  const shibes = await fetch('http://shibe.online/api/shibes?count=9&urls=true&httpsUrls=true')
  const shibesJSON = await shibes.json()
  return {
    props: {
      shibes: shibesJSON
    }
  }
}