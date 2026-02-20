import { useState } from 'react'
import { Calendar, Clock, CheckCircle2 } from 'lucide-react'
import useJobStore from '../../../../../store/useJobStore'
import useClientStore from '../../../../../store/useClientStore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const Step7 = ({ setFormData, formData }) => {
  const setMainTab = useClientStore(state => state.setMainTab)
  const navigate = useNavigate()
  const [when, setWhen] = useState('today')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const postJob = useJobStore(state => state.postJob)
  const loading = useJobStore(state => state.loading)
  const error = useJobStore(state => state.error)

  const handleSubmit = async () => {
    let baseDate

    if (when === 'today') {
      baseDate = new Date()
    } else if (when === 'date') {
      baseDate = new Date(date)
      const [hours, minutes] = time.split(':')
      baseDate.setHours(parseInt(hours), parseInt(minutes), 0, 0)
    } else {
      baseDate = 'yh dates not working'
    }

    const updatedFormData = { ...formData, scheduledAt: baseDate.toISOString() }
    try {
      const result = await postJob(updatedFormData)

      // If postJob didn't throw an error, it's a success
      toast.success('Job posted successfully!')

      // Simple check: if we got a result, move them out
      if (result) {
        setMainTab('home')
      }
    } catch (error) {
      const fallbackMessage =
        error?.message ||
        error?.response?.data?.message ||
        useJobStore.getState().error ||
        'Something went wrong'

      console.error('[client-post-job] Submit handler error', {
        code: error?.code,
        message: error?.message,
        responseMessage: error?.response?.data?.message,
      })

      toast.error(fallbackMessage)
    }
  }
  // Tailwind classes for the Zinc theme
  const cardBase =
    'relative flex flex-1 flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer'

  // Zinc 900/800 for depth, Zinc 400 for text
  const activeCard = `border-[#32cd32] bg-zinc-900 ring-1 ring-[#32cd32]`
  const inactiveCard = 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 text-zinc-500'

  const inputClass = `
    w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 
    text-white outline-none focus:border-[#32cd32] focus:outline-none transition-colors
    appearance-none [color-scheme:dark]
  `

  return (
    <div className="mx-auto w-full font-sans text-zinc-100 ">
      <header className="mb-8 text-center sm:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-white">When do you want it done?</h2>
        <p className="mt-1 text-zinc-400">Select your preferred schedule</p>
      </header>

      {/* Toggle Cards */}
      <div className="mb-8 flex gap-4">
        <div
          onClick={() => setWhen('today')}
          className={`${cardBase} ${when === 'today' ? activeCard : inactiveCard}`}
          style={when === 'today' ? { borderColor: '#32cd32' } : {}}
        >
          {when === 'today' && (
            <CheckCircle2 size={18} className="absolute right-3 top-3 text-[#32cd32]" />
          )}
          <Calendar size={28} className={when === 'today' ? 'text-[#32cd32]' : 'text-zinc-600'} />
          <span
            className={`mt-3 font-semibold ${when === 'today' ? 'text-white' : 'text-zinc-500'}`}
          >
            Today
          </span>
        </div>

        <div
          onClick={() => setWhen('date')}
          className={`${cardBase} ${when === 'date' ? activeCard : inactiveCard}`}
          style={when === 'date' ? { borderColor: '#32cd32' } : {}}
        >
          {when === 'date' && (
            <CheckCircle2 size={18} className="absolute right-3 top-3 text-[#32cd32]" />
          )}
          <Clock size={28} className={when === 'date' ? 'text-[#32cd32]' : 'text-zinc-600'} />
          <span
            className={`mt-3 font-semibold ${when === 'date' ? 'text-white' : 'text-zinc-500'}`}
          >
            Schedule
          </span>
        </div>
      </div>

      {/* Custom Form Section */}
      {when === 'date' && (
        <div className="space-y-4 duration-300 animate-in fade-in slide-in-from-top-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
                Date
              </label>
              <input
                type="date"
                className={inputClass}
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
                Time
              </label>
              <input
                type="time"
                className={inputClass}
                value={time}
                onChange={e => setTime(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="mt-10">
        <button
          onClick={handleSubmit}
          className="w-full rounded-2xl bg-[#32cd32] py-4 font-black uppercase tracking-tight text-black shadow-lg shadow-[#32cd32]/10 transition-all hover:brightness-110 active:scale-[0.97]"
        >
          Post Job
        </button>
      </div>
    </div>
  )
}

export default Step7
