'use client'

import { FAQBlockData, FAQItem, EditorProps } from '@/src/lib/types'

export function FAQEditor({ data, onChange }: EditorProps<FAQBlockData>) {
  const updateField = <K extends keyof FAQBlockData>(field: K, value: FAQBlockData[K]) => {
    onChange({ ...data, [field]: value })
  }

  const updateQuestion = (index: number, updates: Partial<FAQItem>) => {
    const newQuestions = [...data.questions]
    newQuestions[index] = { ...newQuestions[index], ...updates }
    updateField('questions', newQuestions)
  }

  const addQuestion = () => {
    updateField('questions', [
      ...data.questions,
      { question: 'New question?', answer: 'Answer goes here.' }
    ])
  }

  const removeQuestion = (index: number) => {
    updateField('questions', data.questions.filter((_, i) => i !== index))
  }

  const moveQuestion = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= data.questions.length) return
    
    const newQuestions = [...data.questions]
    const [removed] = newQuestions.splice(index, 1)
    newQuestions.splice(newIndex, 0, removed)
    updateField('questions', newQuestions)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Headline
          </label>
          <input
            type="text"
            value={data.headline}
            onChange={(e) => updateField('headline', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Frequently Asked Questions"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subheadline
          </label>
          <input
            type="text"
            value={data.subheadline || ''}
            onChange={(e) => updateField('subheadline', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Find answers to common questions"
          />
        </div>
      </div>

      {/* Layout */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Layout
        </label>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => updateField('layout', 'accordion')}
            className={`px-4 py-2 rounded-lg border-2 transition-colors ${
              data.layout === 'accordion'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            Accordion
          </button>
          <button
            type="button"
            onClick={() => updateField('layout', 'grid')}
            className={`px-4 py-2 rounded-lg border-2 transition-colors ${
              data.layout === 'grid'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            Grid
          </button>
        </div>
      </div>

      {/* Questions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Questions ({data.questions.length})
          </label>
          <button
            type="button"
            onClick={addQuestion}
            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Question
          </button>
        </div>

        <div className="space-y-4">
          {data.questions.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">Question {index + 1}</span>
                <div className="flex items-center space-x-2">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => moveQuestion(index, 'up')}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title="Move up"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                  )}
                  {index < data.questions.length - 1 && (
                    <button
                      type="button"
                      onClick={() => moveQuestion(index, 'down')}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title="Move down"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Question</label>
                  <input
                    type="text"
                    value={item.question}
                    onChange={(e) => updateQuestion(index, { question: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="What is your question?"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Answer</label>
                  <textarea
                    value={item.answer}
                    onChange={(e) => updateQuestion(index, { answer: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Provide a detailed answer..."
                  />
                </div>
              </div>
            </div>
          ))}

          {data.questions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No questions yet. Click &quot;Add Question&quot; to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
