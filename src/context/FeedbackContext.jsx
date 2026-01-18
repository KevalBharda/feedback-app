import { createContext, useState, useEffect } from 'react'
const JSON_SERVER_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:8080/feedback' // local JSON Server
    : 'https://feedback-app-production-20af.up.railway.app/feedback'; // Railway prod


const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })
  useEffect(() => {
    console.log('Fetching feedback from:', JSON_SERVER_URL)
    fetchFeedback()
  }, [])

  // Fetch feedback with error handling
  const fetchFeedback = async () => {
    try {
      const response = await fetch(`${JSON_SERVER_URL}?_sort=id&_order=desc`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setFeedback(data)
    } catch (error) {
      console.error('Failed to fetch feedback:', error)
      // Optionally show an error message to the user
    } finally {
      // ALWAYS stop loading
      setIsLoading(false)
    }
  }




  // Add feedback
  const addFeedback = async (newFeedback) => {
    try {
      const response = await fetch(JSON_SERVER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFeedback),
      })
      const data = await response.json()
      setFeedback([data, ...feedback])
    } catch (error) {
      console.error('Failed to add feedback:', error)
    }
  }

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (!window.confirm('Are you sure you want to delete?')) return
    try {
      await fetch(`${JSON_SERVER_URL}/${id}`, { method: 'DELETE' })
      setFeedback(feedback.filter((item) => item.id !== id))
    } catch (error) {
      console.error('Failed to delete feedback:', error)
    }
  }

  // Update feedback item
  const updateFeedback = async (id, updItem) => {
    try {
      const response = await fetch(`${JSON_SERVER_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updItem),
      })
      const data = await response.json()
      setFeedback(feedback.map((item) => (item.id === id ? data : item)))
      setFeedbackEdit({ item: {}, edit: false })
    } catch (error) {
      console.error('Failed to update feedback:', error)
    }
  }

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
