import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useQuery } from '@tanstack/react-query';
import { getMostPopularShows } from './api/get-most-popular-shows';

interface Show {
  country: string;
  end_date: string;
  id: number
  image_thumbnail_path: string;
  name: string
  network: string
  permalink: string
  start_date: string
  status: string
}

function App() {
  const [count, setCount] = useState(1)
  const {
    data,
    isLoading
  } = useQuery(['tv_shows', count], () => getMostPopularShows(count), { keepPreviousData: true })
  console.log(data)

  function LoadingRender() {
    return (
      <>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo"/>
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo"/>
          </a>
        </div>
        <h1>Loading</h1>
      </>
    )
  }


  return (
    <div>
      <h1>TV Shows</h1>
      <div className="App">
        {isLoading && LoadingRender()}
        {!isLoading && (data.tv_shows as Show[]).map((show) => {
          return <img src={show.image_thumbnail_path} alt={show.name} key={show.name} style={{
            width: '100%',
            height: '100%',
          }}/>
        })}
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => Math.max(1, count - 1))}>
          Prev page
        </button>
        <button onClick={() => setCount((count) => Math.min(count + 1, data.pages))}>
          Next page
        </button>
      </div>
      <div>
        <span>Page {data.page} of {data.pages}</span>
      </div>
    </div>
  )
}

export default App
