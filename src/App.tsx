import logoImg from './assets/logo-nlw-esports.svg'
import { GameController, MagnifyingGlassPlus } from 'phosphor-react'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'

import { useState, useEffect } from 'react'
import * as Diolog from '@radix-ui/react-dialog'
import './styles/main.css'
import { Input } from './components/Form/Input'



interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: { ads: number };
}
function App() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then((response) => response.json())
      .then((data) => {
        setGames(data)
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

        <Diolog.Portal>
          <Diolog.Overlay className='bg-black/60 inset-0 fixed'>

            <Diolog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
              <Diolog.Title className='text-3xl font-black'>Publique um anúncio</Diolog.Title>


              <form className='mt-8 flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                  <Input
                    type="game"
                    placeholder='Selecione o game que deseja jogar'
                    className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <Input
                    id="name"
                    placeholder='Como te chamam dentro do game?'
                    className='bg-zinc-900'
                  />
                </div>
                <div className='grid grid-cols-2 gap-6'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="yoursPlaying">Joga há quantos anos?</label>
                    <Input id="yoursPlaying" type="number" placeholder='Tudo bem ser ZERO' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="discord">Qual seu discord?</label>
                    <Input id="discord" type="text" placeholder='Usuario#0000' />
                  </div>
                </div>
                <div className='flex gap-6'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                    <div className='grid grid-cols-4 gap-2'>
                      <button
                        title="Domingo"
                        className='w-8 h-8 rounded bg-zinc-900'
                      >D</button>
                      <button
                        title="Segunda"
                        className='w-8 h-8 rounded bg-zinc-900'
                      >S</button>
                      <button
                        title="Terça"
                        className='w-8 h-8 rounded bg-zinc-900'
                      >
                        T
                      </button>
                      <button
                        title="Quarta"
                        className='w-8 h-8 rounded bg-zinc-900'
                      >
                        Q</button>
                      <button
                        title="Quinta"
                        className='w-8 h-8 rounded bg-zinc-900'
                      >
                        Q</button>
                      <button
                        title="Sexta"
                        className='w-8 h-8 rounded bg-zinc-900'
                      >
                        S
                      </button>
                      <button
                        title="Sabado"
                        className='w-8 h-8 rounded bg-zinc-900'
                      >
                        S
                      </button>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2 flex-1'>
                    <label htmlFor="hourStart">Qual horário do dia?</label>
                    <div className='grid grid-cols-2 gap-2'>
                      <Input id="hourStart" type="time" placeholder='De' />
                      <Input id="hourEnd" type="time" placeholder='Até' />
                    </div>
                  </div>
                </div>
                <div className='mt-2 flex gap-2 text-sm'>
                  <Input type="checkbox" />
                  Constumo me conectar ao chat de voz
                </div>
                <footer className='mt-4 flex justify-end gap-4'>
                  <Diolog.Close
                    type="button"
                    className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'
                  >
                    Cancelar
                  </Diolog.Close>
                  <button
                    className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
                    type='submit'>
                    <GameController size={24} />
                    Encontrar duo</button>
                </footer>
              </form>

            </Diolog.Content>
          </Diolog.Overlay>
        </Diolog.Portal>
      </Diolog.Root>

    </div>

  )
}

export default App