import React, { useState, useRef, useCallback, useEffect } from 'react'
import usePoems from './components/usePoems'
import './App.css';
import Header from "./components/header";

function App() {
  const [pageNumber, setPageNumber] = useState(0)

  const {
    poems,
    hasMore,
    loading,
    error
  } = usePoems(pageNumber)

  const observer = useRef()
  const lastBookElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  useEffect(() => {
    setPageNumber(pageNumber)
  });

  return (
    <>
    <Header />
    <div className="App">
      {poems.map((poem, index) => {
        if (poems.length === index + 1) {
          return <div ref={lastBookElementRef} key={poem} dangerouslySetInnerHTML={{__html: poem}}/>
        } else {
          return <div key={poem} dangerouslySetInnerHTML={{__html: poem}} />
        }
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </div>
    </>
  );
}

export default App;
