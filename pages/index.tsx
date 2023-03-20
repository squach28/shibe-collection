import { Roboto } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import '../styles/Home.module.css'
import { useEffect, useRef, useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

const roboto = Roboto({
    weight: '400',
    subsets: ['latin']

  })

export default function Home({shibas}) {

  const [shibes, setShibes] = useState([...shibas])
  const [position, setPosition] = useState(0)

  const observer = useRef()
  const lastShibeElementRef = useCallback(node => {
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) {
        fetch('http://shibe.online/api/shibes?count=9&urls=true&httpsUrls=true')
        .then(shibas => shibas.json())
        .then(shibesJSON => setShibes(oldShibes => [...oldShibes, ...shibesJSON]))
        .finally(() => {
        })
      }
    })
    if(node) observer.current.observe(node)
  }, [])



  return (
    <div className="h-screen w-screen p-5">
      <header>
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-5xl"><Link href="/">Shibe Museum</Link></h1>
        </div>
      </header>
      <main>
        <div>
          <h2 className="text-2xl text-center my-20">Because who wouldn't want more shibes in their lives?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 justify-items-center">
            {shibes.map((shibe, index) => {
              if(shibes.length === index + 1) {
                return <Image ref={lastShibeElementRef} key={uuidv4()} width={400} height={400} src={shibe} alt="it's a shibe" />
              } else {
                return <Image key={uuidv4()} width={400} height={400} src={shibe} alt="it's a shibe" />

              }
            }
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
      shibas: shibesJSON
    }
  }
}