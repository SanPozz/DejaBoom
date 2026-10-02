const PROFILE_STORAGE_KEY = "dejaboom-profile"

export const defaultProfile = {
  name: "User Example",
  username: "@userexample",
  bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  avatar: "https://unsplash.com",
  bannerImage: "https://unsplash.com",
  joinedDate: "Agosto 2023",
}

export const getProfile = () => {
  try {
    const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY)
    return savedProfile ? { ...defaultProfile, ...JSON.parse(savedProfile) } : defaultProfile
  } catch {
    return defaultProfile
  }
}

export const saveProfile = (profile) => {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
}