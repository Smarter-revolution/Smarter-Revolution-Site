'use client'

import { Plus, Trash2 } from 'lucide-react'
import type { FAQBlockData, FAQItem, EditorProps } from '@/lib/types'

export function FAQEditor({ data, onChange }: EditorProps<FAQBlockData>) {
  const updateField = (field: string, value: unknown) => {
    onChange({ ...data, [field]: value })
  }
  
  const updateQuestion = (index: number, field: keyof FAQItem, value: string) => {
    const newQuestions = [...data.questions]
    newQuestions[index] = { ...newQuestions[index], [field]: value }
    updateField('questions', newQuestions)
  }
  
  const addQuestion = () => {
    updateField('questions', [...data.questions, { question: '', answer: '' }])
  }
  
  const removeQuestion = (index: number) => {
    const newQuestions = data.questions.filter((_, i) => i !== index)
    updateField('questions', newQuestions)
  }
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
        <input
          type="text"
          value={data.headline}
          onChange={(e) => updateField('headline', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Questions & Answers</label>
        <div className="space-y-4">
          {data.questions.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">Q&A {index + 1}</span>
                <button
                  onClick={() => removeQuestion(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <input
                type="text"
                value={item.question}
                onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                placeholder="Question"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              
              <textarea
                value={item.answer}
                onChange={(e) => updateQuestion(index, 'answer', e.target.value)}
                placeholder="Answer"
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          ))}
        </div>
        
        <button
          onClick={addQuestion}
          className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-4 h-4" />
          Add Question
        </button>
      </div>
    </div>
  )
}
