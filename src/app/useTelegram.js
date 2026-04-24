'use client'
import { useEffect, useState, useCallback } from 'react'

export function useTelegram() {
  const [user, setUser] = useState(null)      // { userId, firstName }
  const [favorites, setFavorites] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    async function init() {
      try {
        const tg = window.Telegram?.WebApp
        if (!tg?.initData) {
          setLoading(false)
          setIsReady(true)
          return
        }

        tg.ready()
        tg.expand()

        // Авторизация
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ initData: tg.initData }),
        })

        if (!res.ok) {
          console.error('Auth failed:', await res.text())
          setLoading(false)
          setIsReady(true)
          return
        }

        const userData = await res.json()
        setUser(userData)

        // Загружаем избранное
        const favsRes = await fetch(`/api/favorites?userId=${userData.userId}`)
        if (favsRes.ok) {
          const favsData = await favsRes.json()
          setFavorites(new Set(favsData))
        }
      } catch (error) {
        console.error('Telegram init error:', error)
      } finally {
        setLoading(false)
        setIsReady(true)
      }
    }
    init()
  }, [])

  const toggleFavorite = useCallback(async (universityId) => {
    if (!user) return

    const isFaved = favorites.has(universityId)
    const method = isFaved ? 'DELETE' : 'POST'

    // Оптимистичное обновление — сразу меняем UI
    setFavorites(prev => {
      const next = new Set(prev)
      if (isFaved) {
        next.delete(universityId)
      } else {
        next.add(universityId)
      }
      return next
    })

    try {
      const res = await fetch('/api/favorites', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.userId, universityId }),
      })

      if (!res.ok) {
        // Revert on error
        setFavorites(prev => {
          const next = new Set(prev)
          if (isFaved) {
            next.add(universityId)
          } else {
            next.delete(universityId)
          }
          return next
        })
      }
    } catch (error) {
      console.error('Toggle favorite error:', error)
      // Revert on error
      setFavorites(prev => {
        const next = new Set(prev)
        if (isFaved) {
          next.add(universityId)
        } else {
          next.delete(universityId)
        }
        return next
      })
    }
  }, [user, favorites])

  const isFavorite = useCallback((universityId) => {
    return favorites.has(universityId)
  }, [favorites])

  return { user, favorites, isFavorite, toggleFavorite, loading, isReady }
}