import { useMemo, useState } from 'react'
import { Calendar, Clock, CheckCircle2 } from 'lucide-react'
import useJobStore from '../../../../../store/useJobStore'
import useClientStore from '../../../../../store/useClientStore'

const Step7 = ({ formData }) => {
  const setMainTab = useClientStore(state => state.setMainTab)
  const postJob = useJobStore(state => state.postJob)
  const loading = useJobStore(state => state.loading)

  const [when, setWhen] = useState('today')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [feedback, setFeedback] = useState({ isOpen: false, type: 'success', message: '' })

  const titleValid = formData.title?.trim().length > 0
  const categoryValid = Boolean(formData.category)
  const budgetValid = Number(formData.budget) > 0
  const addressValid = formData.address?.trim().length > 0

  const scheduleValidation = useMemo(() => {
    if (when === 'today') {
      return { valid: true, isoDate: new Date().toISOString(), text: 'ASAP selected' }
    }

    if (!date || !time) {
      return { valid: false, isoDate: null, text: 'Date and time are required' }
    }

    const selectedDate = new Date(`${date}T${time}`)
    if (Number.isNaN(selectedDate.getTime()) || selectedDate <= new Date()) {
      return { valid: false, isoDate: null, text: 'Please choose a future date/time' }
    }

    return { valid: true, isoDate: selectedDate.toISOString(), text: 'Schedule is valid' }
  }, [date, time, when])

  const formReadyToPost =
    categoryValid && titleValid && budgetValid && addressValid && scheduleValidation.valid

  const handleSubmit = async () => {
    if (!formReadyToPost || loading) {
      return
    }

    try {
      await postJob({ ...formData, scheduledAt: scheduleValidation.isoDate })
      setFeedback({ isOpen: true, type: 'success', message: 'Job posted successfully!' })

      setTimeout(() => {
        setFeedback({ isOpen: false, type: 'success', message: '' })
        setMainTab('home')
      }, 3500)
    } catch (error) {
      const reason = error?.response?.data?.message
      setFeedback({
        isOpen: true,
        type: 'error',
        message: reason
          ? `There was an error posting your job. Please try again. ${reason}`
          : 'There was an error posting your job. Please try again.',
      })
    }
  }

  const cardBase =
    'relative flex flex-1 flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer'
  const activeCard = `border-[#32cd32] bg-zinc-900 ring-1 ring-[#32cd32]`
  const inactiveCard = 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 text-zinc-500'

  const inputClass = `
    w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 
    text-white outline-none focus:border-[#32cd32] focus:outline-none transition-colors
    appearance-none [color-scheme:dark]
  `

  return (
    <>
      {feedback.isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgb(15,15,16)] px-6 text-center text-white">
          <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-8">
            <h3
              className={`text-2xl font-bold ${
                feedback.type === 'success' ? 'text-[#32cd32]' : 'text-red-400'
              }`}
            >
              {feedback.type === 'success'
                ? 'Job posted successfully!'
                : 'There was an error posting your job. Please try again.'}
            </h3>
            <p className="mt-3 text-sm text-zinc-300">{feedback.message}</p>
            {feedback.type === 'success' ? (
              <button
                onClick={() => setMainTab('home')}
                className="mt-6 w-full rounded-xl bg-[#32cd32] py-3 font-semibold text-black"
              >
                View your job
              </button>
            ) : (
              <button
                onClick={() => setFeedback({ isOpen: false, type: 'error', message: '' })}
                className="mt-6 w-full rounded-xl border border-zinc-600 py-3 font-semibold text-white"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}

      <div className="mx-auto w-full font-sans text-zinc-100 ">
        <header className="mb-8 text-center sm:text-left">
          <h2 className="text-2xl font-bold tracking-tight text-white">When do you want it done?</h2>
          <p className="mt-1 text-zinc-400">Select your preferred schedule</p>
        </header>

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
              ASAP
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

        <div className="mt-4 space-y-1 text-sm">
          <p className={categoryValid ? 'text-[#32cd32]' : 'text-red-400'}>
            {categoryValid ? '✓ Category selected' : 'Category is required'}
          </p>
          <p className={titleValid ? 'text-[#32cd32]' : 'text-red-400'}>
            {titleValid ? '✓ Title entered' : 'Title is required'}
          </p>
          <p className={budgetValid ? 'text-[#32cd32]' : 'text-red-400'}>
            {budgetValid ? '✓ Budget entered' : 'Budget must be greater than 0'}
          </p>
          <p className={addressValid ? 'text-[#32cd32]' : 'text-red-400'}>
            {addressValid ? '✓ Address entered' : 'Address is required'}
          </p>
          <p className={scheduleValidation.valid ? 'text-[#32cd32]' : 'text-red-400'}>
            {scheduleValidation.valid ? `✓ ${scheduleValidation.text}` : scheduleValidation.text}
          </p>
        </div>

        <div className="mt-10">
          <button
            onClick={handleSubmit}
            disabled={!formReadyToPost || loading}
            className={`w-full rounded-2xl py-4 font-black uppercase tracking-tight transition-all ${
              formReadyToPost && !loading
                ? 'bg-[#32cd32] text-black shadow-lg shadow-[#32cd32]/10 hover:brightness-110 active:scale-[0.97]'
                : 'pointer-events-none bg-gray-700 text-gray-400'
            }`}
          >
            {loading ? 'Posting...' : 'Post Job'}
          </button>
        </div>
      </div>
    </>
  )
}

export default Step7
