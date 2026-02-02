// ConfirmModal.jsx
const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'success', // 'success' or 'danger'
  showCancel = true,
  loading = false,
}) => {
  if (!isOpen) return null

  const confirmStyles = {
    success: 'bg-[#32cd32] hover:bg-[#28a428]',
    danger: 'bg-red-500 hover:bg-red-600',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-2xl bg-[#1a1a1d] p-6 shadow-2xl">
        {/* Title */}
        <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>

        {/* Message */}
        <p className="mb-6 text-sm text-gray-300">{message}</p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          {showCancel && (
            <button
              onClick={onClose}
              disabled={loading}
              className="rounded-xl bg-gray-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {cancelText}
            </button>
          )}

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`rounded-xl px-5 py-2.5 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${confirmStyles[confirmVariant]}`}
          >
            {loading ? 'Loading...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
