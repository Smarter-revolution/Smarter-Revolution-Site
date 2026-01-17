'use client'

import { Save, Loader2, Check, Clock } from 'lucide-react'

interface SaveButtonProps {
  onClick: () => void
  saving: boolean
  disabled: boolean
  hasChanges: boolean
  lastSaved: string
}

export function SaveButton({ onClick, saving, disabled, hasChanges, lastSaved }: SaveButtonProps) {
  return (
    <div className="flex items-center gap-4">
      {/* Status indicator */}
      {lastSaved && !hasChanges && (
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Check className="w-4 h-4 text-green-500" />
          <span>Saved at {lastSaved}</span>
        </div>
      )}
      
      {hasChanges && (
        <div className="flex items-center gap-2 text-sm text-amber-600">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Unsaved changes</span>
        </div>
      )}
      
      {/* Save button */}
      <button
        onClick={onClick}
        disabled={disabled || saving}
        className={`
          relative overflow-hidden flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300
          ${disabled && !saving
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:shadow-red-500/25 active:scale-95'
          }
        `}
      >
        {saving ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Saving...</span>
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            <span>Save Changes</span>
          </>
        )}
      </button>
    </div>
  )
}
