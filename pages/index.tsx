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
    <div className="h-screen w-screen p-5 bg-[#03001C] text-[#B6EADA]">
      <header>
        <div className="flex flex-row items-center justify-between">
          <h1><Link href="/">Shibe Museum</Link></h1>
        </div>
      </header>
      <main>
        <div>
          <h2 className="">The website to truly experience the best of shibes</h2>
          <div className="grid grid-cols-3 auto-rows-auto">
            {shibes.map(shibe => <Image key={shibe} width={200} height={200} src={shibe} alt="it's a shibe" />
            )}
          </div>
        </div>
      </main>
      <footer>
        <div className="w-full h-full block mt-auto">Made with love by Sean Quach :))</div>
      </footer>
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