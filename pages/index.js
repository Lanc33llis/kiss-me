import styles from '../styles/Index.module.sass'
import { useEffect, useState, useRef } from 'react'

const chars = `$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^\`\'. `.split('')
const charWidth = 5

const genBackgroundNoise = (width, height, maxBrightness) => {
  return (
    <div>
      <style jsx>{`
        p {
          font-size: ${charWidth * 1.818}px;
        }
      `}</style>
      {
        Array(parseInt(height / (charWidth * 2), 10)).fill(0).map((v, i) => {
          let s = ""
          for (let i = 0; i < width; i += charWidth) {
            s += chars[Math.floor(chars.length - maxBrightness + (Math.random() * (maxBrightness)))]
          }
          return (
            <p key={i}>
              {
                s
              }
            </p>
          )
        })
      }
    </div>
  )
}

const AsciiVideo = (props) => {
  const canvasRef = useRef(<></>)
  const videoRef = useRef(<></>)

  useEffect(() => {
    const {width, height, src} = props
    const canvas = canvasRef.current
    const video = videoRef.current
    const ctx = canvas.getContext('2d')
  
    const draw = async () => {
      const bitmap = await createImageBitmap(video)
      
      ctx.drawImage(bitmap, 0, 0, width, height)
      const frame = await ctx.getImageData(0, 0, width, height)

      
      //convert to grayscale
      for (let i = 0; i < frame.data.length; i += 4) {
        const avg = (frame.data[i] + frame.data[i + 1] + frame.data[i + 2]) / 3
        frame.data[i] = avg
        frame.data[i + 1] = avg
        frame.data[i + 2] = avg
      }

      //subsample
      // for (let i = 0; i < frame.data.length; i += 4) {
      //   frame.data[i] = frame.data[i] / 2
      //   frame.data[i + 1] = frame.data[i + 1] / 2
      //   frame.data[i + 2] = frame.data[i + 2] / 2
      // }

      // //convert to ASCII
      for (let i = 0; i < frame.data.length; i += 4) {
        const avg = (frame.data[i] + frame.data[i + 1] + frame.data[i + 2]) / 3
        const char = chars[Math.floor(avg / (256 / chars.length))]

        frame.data[i] = char.charCodeAt(0)
        frame.data[i + 1] = char.charCodeAt(0)
        frame.data[i + 2] = char.charCodeAt(0)
      }

      ctx.putImageData(frame, 0, 0)

      video.requestVideoFrameCallback(draw)
    }

    video.requestVideoFrameCallback(draw)
  }, [])

  return (
    <>
      <canvas ref={canvasRef} {...props}/>
      <video ref={videoRef} muted loop style={{visibility: "hidden", position: "absolute"}}>
        <source src={props.src}/>
      </video>
    </>
  )
}

export default function Index() {
  const [backgroundNoise, setBackgroundNoise] = useState(<></>)
  const [bgBrightness, setBgBrightness] = useState(5)
  const [timer, setTimer] = useState(0)
  const timerRef = useRef()
  const videosRef = useRef(<></>)
  const cursorRef = useRef(<></>)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer(t => t + 100)
    }, 100)

    const videosContainer = videosRef.current
    const canvases = videosContainer.querySelectorAll('canvas')
    const videos = videosContainer.querySelectorAll('video')
    canvases.forEach((canvas, i) => {
      canvas.addEventListener("mouseenter", (eve) => {
        eve.target.style.opacity = "1"
        videos[i].play()
      })
      canvas.addEventListener("mouseleave", (eve) => {
        eve.target.style.opacity = "0"
        videos[i].pause()
      })
    })

    document.addEventListener("mousemove", (eve) => {
      cursorRef.current.style.left = eve.clientX - 25 + "px"
      cursorRef.current.style.top = eve.clientY - 25+ "px"
    })
  }, [])

  useEffect(() => {
    if (timer < 2000) {
      setBackgroundNoise(genBackgroundNoise(window.innerWidth, window.innerHeight, 5))
    } else if (timer > 2000 && timer < 10000) {
      setBgBrightness(bg => bg + .5)
    } if (timer > 10000) {
      setBgBrightness(bg => bg >= 2 ? bg - 1 : 1)
    } 
  }, [timer])
  
  useEffect(() => {
    setBackgroundNoise(genBackgroundNoise(window.innerWidth, window.innerHeight, bgBrightness))
    if (bgBrightness == 1) {
      setTimer(0)
    }
  }, [bgBrightness])

  return (
    <div className={styles.container}>
      <div className={styles["background-noise"]}>
        {backgroundNoise}
      </div>
      <div className={styles.title}>
        <h1>
          KISS
        </h1>
      </div>
      <div ref={videosRef} className={styles.content}>
        <AsciiVideo width={320} height={320} src="1.mp4" />
        <AsciiVideo width={320} height={320} src="2.mp4" />
        <AsciiVideo width={320} height={320} src="3.mp4" />
        <AsciiVideo width={320} height={320} src="4.mp4" />
      </div>
      <div ref={cursorRef} className={styles.cursor}/>
    </div>
  )
}
