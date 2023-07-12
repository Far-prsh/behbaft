
import { Inter } from 'next/font/google'

import styles from '../styles/Home.module.scss'
import Header from '@/components/header'
import Footer from '@/components/footer'
import axios from 'axios'

import { useSession, signIn, signOut } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

export default function Home({ country }) {
  
  const { data: session } = useSession()
console.log(session)
  return (
    <>
      <Header country={country}/>
      <Footer country={country}/>
    </>
  )
}

export async function getServerSideProps() {
  let data = await axios.get("https://api.ipregistry.co/?key=hznlnxegjsv8cb86").then((res) => { return res.data.location.country }).catch((err) => {console.log(err)})
  return {
    props: {
      // country: {name: data.name, flag: data.flag.emojitwo }
      country: {name: 'Canada', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/255px-Flag_of_Canada_%28Pantone%29.svg.png' }
    }
  }
}
