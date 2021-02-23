import Head from 'next/head'
import { AgainButton, Layout, Playground, Progress, Score, Star, StartButton} from '../shared/styles'
import {useEffect, useState} from 'react'
import {generateArray, getRandomInt, calcHeight} from '../utils/utils'
import {IStar, IScore} from '../interfaces/interfaces'
import {config} from '../config/config'


export default function Home() {

  const {countStars, distance} = config

  const [stars, setStars] = useState<IStar[]>([])
  const [position, setPosition] = useState<number | null>(null)
  const [start, setStart] = useState<boolean>(false)
  const [score, setScore] = useState<IScore>({realScore: 0, maxScore: 0})
  const [progress, setProgress] = useState<number>(0)

  const generateStars = (array: number[]): void => {
    const newStars = []

    array.forEach((item) => {
      const star: IStar = {
        value: getRandomInt(-5, 6),
        x: getRandomInt(20, 660),
        y: item * distance
      }
      newStars.push(star)
    })
    
    setStars(newStars)
  }

  const CalcMaxScore = (): void => {
    let positiveNumbers: number[] = [] 
    stars.forEach(s => {if (s.value > 0) positiveNumbers.push(s.value)})
    const result = positiveNumbers.reduce((a, b) => a + b)
    setScore({realScore: 0, maxScore: result})
  }

  const progressWidth = (prevPos: number): number => {
    let allHeight: number = Math.abs(calcHeight(countStars, distance)) + window.innerHeight 
    let realPosition: number = Math.abs(calcHeight(countStars, distance)) + prevPos

    let percent: number = (realPosition/allHeight) * 100
    return percent
  }

  const clickStartHandler = (): void => {
    setStart(true)
    CalcMaxScore()
    const timer = setInterval(() => {
      
      setPosition((prev: number): number => {  
        if (prev === (calcHeight(countStars, distance))) {
          setPosition(window.innerHeight)
          generateStars(generateArray(countStars))
          setStart(false)
          clearInterval(timer)
        }
        setProgress(progressWidth(prev))
        return prev - 1
      })
    }, 1000/150)  
  }

  const deleteStarHandler = (star: IStar): void => {

    const s = [...stars]
    const deleteStar = s.filter(i => i !== star)

    setScore(prev => { return {
      realScore: prev.realScore + star.value, 
      maxScore: prev.maxScore} 
    })
    setStars(deleteStar)
  }

  const allStars = stars.map((star, i) => {
    return (
      <Star 
        key={i} 
        bottom={star.y}
        left={star.x}
        onClick={() => deleteStarHandler(star)}
      >{star.value}</Star>
    )
  })

    useEffect(() => {
      setPosition(window.innerHeight) 
      generateStars(generateArray(countStars))
    }, [])

  const {realScore, maxScore} = score

  return (
    <>
      <Head>
        <title>Falling stars</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Progress style={{width: `${progress}%`}} />
      <main>
          <Layout>
            { !start 
            ? <> 
                { !start && maxScore === 0 
                ? <>
                    <p>Наберите максимальное количество очков</p>
                    <StartButton 
                      onClick={clickStartHandler}
                    >Начать игру</StartButton> 
                  </>
                : <>
                    <p>Ваш результат: {realScore} / {maxScore}</p>
                    <AgainButton onClick={clickStartHandler}>Попробовать еще</AgainButton> 
                  </>
                }
              </>
            : <> 
                <Score>Очки: {realScore} / {maxScore}</Score>
                <Playground style={{bottom: `${position}px`}}> 
                  {allStars}
                </Playground>
              </>
            }
            
          </Layout>
          
      </main>

    </>
  )
}
