import { useEffect, useState } from 'react'
import axios from 'axios'
import poemsDB from '../assests/poems.json';

export default function usePoems(pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [poems, setPoems] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const [poemsDump, setPoemsDump] = useState(poemsDB.poems)

  // useEffect(() => {
  //   setPoems([])
  // }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
      setPoems(prevPoems => {
        return [...new Set([...prevPoems, ...poemsDump.slice(pageNumber*5, pageNumber*5+5)])]
      })
      setHasMore(pageNumber*5 < poemsDump.length)
      setLoading(false)
  }, [pageNumber])

  return { loading, error, poems, hasMore }
}