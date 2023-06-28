import React from 'react'
import { useParams } from 'react-router-dom'

export const Result = () => {

  let { result } = useParams<{result: string}>();

  return (
    <div>{result}</div>
  )
}
