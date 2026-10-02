const STORAGE_KEY = "dejaboom-lists"

export const getSavedLists = () => {
  try {
    const savedLists = localStorage.getItem(STORAGE_KEY)
    return savedLists ? JSON.parse(savedLists) : []
  } catch {
    return []
  }
}

export const saveList = (list) => {
  const savedLists = getSavedLists()
  const savedList = {
    ...list,
    id: list.id ?? `custom-${Date.now()}`,
    count: list.games.length,
    covers: list.games.length
      ? list.games.slice(0, 4).map((game) => game.cover)
      : list.covers ?? [],
  }
  const existingIndex = savedLists.findIndex((item) => String(item.id) === String(savedList.id))

  if (existingIndex === -1) {
    savedLists.push(savedList)
  } else {
    savedLists[existingIndex] = savedList
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedLists))
  return savedList
}