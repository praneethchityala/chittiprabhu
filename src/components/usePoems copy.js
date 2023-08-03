import { useEffect, useState } from 'react'
import axios from 'axios'
import poemsDB from '../assests/poems.json';

export default function usePoems(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [poems, setPoems] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const [poemsDump, setPoemsDump] = useState(poemsDB.poems)

  useEffect(() => {
    setPoems([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setPoems(prevPoems => {
        return [...new Set([...prevPoems, ...res.data.docs.map(b => b.title)])]
      })
      setHasMore(res.data.docs.length > 0)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [query, pageNumber])

  return { loading, error, poems, hasMore }
}