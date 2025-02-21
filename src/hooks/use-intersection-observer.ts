import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = (option?: IntersectionObserverInit) => {
  const [isIntersecting, serIsIntersecting] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      serIsIntersecting(entry.isIntersecting)
    }, option)
    if (targetRef.current) observer.observe(targetRef.current)
    return () => observer.disconnect()
  }, [option])

  return {
    isIntersecting,
    targetRef
  }
}