'use client'

import { Loader2, Check, Save } from 'lucide-react'

interface SaveButtonProps {
  onClick: () => void
  saving: boolean
  disabled: boolean
  hasChanges: boolean
  lastSaved?: string
}

export function SaveButton({ onClick, saving, disabled, hasChanges, lastSaved }: SaveButtonProps) {
  return (
    <div className="flex items-center gap-4">
      {lastSaved && !hasChanges && (
        <span className="text-sm text-gray-500">
          Last saved: {lastSaved}
        </span>
      )}
      
      {hasChanges && !saving && (
        <span className="text-sm text-amber-600 font-medium">
          Unsaved changes
        </span>
      )}
      
      <button
        onClick={onClick}
        disabled={disabled || saving}
        className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-colors ${
          disabled || saving
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-green-600 text-white hover:bg-green-700'
        }`}
      >
        {saving ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving...
          </>
        ) : hasChanges ? (
          <>
            <Save className="w-4 h-4" />
            Save Changes
          </>
        ) : (
          <>
            <Check className="w-4 h-4" />
            Saved
          </>
        )}
      </button>
    </div>
  )
}
