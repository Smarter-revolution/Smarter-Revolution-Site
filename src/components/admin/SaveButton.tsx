'use client'

interface SaveButtonProps {
  onClick: () => void
  saving: boolean
  hasChanges: boolean
  lastSaved?: Date | null
}

export function SaveButton({ onClick, saving, hasChanges, lastSaved }: SaveButtonProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  return (
    <div className="flex items-center space-x-4">
      {/* Status indicator */}
      <div className="flex items-center space-x-2 text-sm">
        {saving ? (
          <span className="text-blue-600 flex items-center">
            <svg className="animate-spin w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Saving...
          </span>
        ) : hasChanges ? (
          <span className="text-amber-600 flex items-center">
            <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse" />
            Unsaved changes
          </span>
        ) : lastSaved ? (
          <span className="text-green-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Saved at {formatTime(lastSaved)}
          </span>
        ) : null}
      </div>

      {/* Save button */}
      <button
        onClick={onClick}
        disabled={saving || !hasChanges}
        className={`
          px-6 py-2.5 rounded-lg font-semibold transition-all
          ${hasChanges && !saving
            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }
        `}
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}
