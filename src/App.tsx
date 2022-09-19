import logoImg from './assets/logo-nlw-esports.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'

import { useState, useEffect } from 'react'
import * as Diolog from '@radix-ui/react-dialog'
import './styles/main.css'
import { CreateAdModal } from './components/CreateAdModal'
import axios from 'axios'



interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: { ads: number };
}
function App() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games').then((reponse) => {
        setGames(reponse.data)
      })

  }, [])//array de dependencia sem nada vai executar o useEffect apenas 1 vez quando o componente for carregada

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>
      <Diolog.Root>
        <CreateAdBanner />
        <CreateAdModal></CreateAdModal>
        
      </Diolog.Root>

    </div>

  )
}

export default App
