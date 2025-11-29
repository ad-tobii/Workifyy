import { User, Briefcase, Wrench, MapPin, Languages, FileText } from 'lucide-react'

// Initial state structure
export const initialFormData = {
  profilePictureFile: null,
  profilePicturePreview: null,
  tagLine: '',
  experienceYears: 0,
  skills: [],
  location: null,
  languages: [],
  bio: '',
}

// Configuration for the steps
export const stepsConfig = [
  { id: 1, title: 'Profile', description: 'Photo & Tagline', icon: User },
  { id: 2, title: 'Experience', description: 'Years on the job', icon: Briefcase },
  { id: 3, title: 'Skills', description: 'Your expertise', icon: Wrench },
  { id: 4, title: 'Location', description: 'Where you work', icon: MapPin },
  { id: 5, title: 'Languages', description: 'Communication', icon: Languages },
  { id: 6, title: 'Bio', description: 'About yourself', icon: FileText },
]
