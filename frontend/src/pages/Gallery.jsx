import { useState, useMemo, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

// NEW DYNAMIC PATIENT GALLERY COMPONENT
const PatientGallery = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Get patients data from location state
  useEffect(() => {
    const loadPatientsData = () => {
      try {
        setLoading(true)
        
        // Get project data from location state
        const projectData = location.state?.project
        
        if (projectData && projectData.groupedResponses) {
          // Use groupedResponses which has patients with their visit counts
          setPatients(projectData.groupedResponses)
          setError(null)
        } else {
          // Fallback to mock data if no project data available
          console.log("No project data found in location state, using mock data")
          const mockData = [
            {
              patient: "john.doe@email.com",
              visits: [
                {
                  visitNumber: 1,
                  date: "2024-03-15T10:00:00.000Z",
                  formResponses: [
                    { questionText: "Name", answer: "John Doe" },
                    { questionText: "Age", answer: "45" },
                    { questionText: "Set Your Icon (e.g., 📋, 🔍, 📊)", answer: "🏥" },
                    { questionText: "Email", answer: "john.doe@email.com" },
                    { questionText: "Phone Number", answer: "+1234567890" }
                  ]
                },
                {
                  visitNumber: 2,
                  date: "2024-03-20T10:00:00.000Z",
                  formResponses: [
                    { questionText: "Name", answer: "John Doe" },
                    { questionText: "Age", answer: "45" },
                    { questionText: "Email", answer: "john.doe@email.com" },
                    { questionText: "Phone Number", answer: "+1234567890" },
                    { questionText: "Blood Pressure", answer: "120/80" }
                  ]
                }
              ]
            },
            {
              patient: "jane.smith@email.com",
              visits: [
                {
                  visitNumber: 1,
                  date: "2024-03-18T10:00:00.000Z",
                  formResponses: [
                    { questionText: "Name", answer: "Jane Smith" },
                    { questionText: "Age", answer: "32" },
                    { questionText: "Set Your Icon (e.g., 📋, 🔍, 📊)", answer: "💊" },
                    { questionText: "Email", answer: "jane.smith@email.com" },
                    { questionText: "Phone Number", answer: "+1234567891" }
                  ]
                }
              ]
            }
          ]
          setPatients(mockData)
        }
      } catch (err) {
        setError("Failed to load patient data")
        console.error("Error loading patients:", err)
      } finally {
        setLoading(false)
      }
    }

    loadPatientsData()
  }, [location.state?.project])

  // Helper function to extract patient icon from form responses
  const getPatientIcon = (patient) => {
    if (!patient.visits || patient.visits.length === 0) {
      return null
    }
    
    // Get the most recent visit's responses
    const latestVisit = patient.visits[patient.visits.length - 1]
    const responses = latestVisit.formResponses
    
    const iconResponse = responses.find(response => 
      response.questionText && 
      (response.questionText.toLowerCase().includes("icon") || 
       response.questionText.toLowerCase().includes("set your icon") ||
       response.questionText.toLowerCase().includes("your icon"))
    )
    
    const icon = iconResponse?.answer || iconResponse?.answerText
    return (icon && icon.trim() !== '') ? icon : null
  }

  // Helper function to render patient icon
  const renderPatientIcon = (patient, sizeClass = "w-16 h-16") => {
    const icon = getPatientIcon(patient)
    
    // If no icon is set, show patient's first letter as fallback
    if (!icon) {
      // More robust name extraction for fallback
      const latestVisit = patient?.visits?.[patient.visits.length - 1]
      const responses = latestVisit?.formResponses || []
      const nameResponse = responses.find(r => 
        r.questionText && (
          r.questionText.toLowerCase().includes('name') ||
          r.questionText.toLowerCase() === 'name' ||
          r.questionText.toLowerCase().startsWith('name') ||
          r.questionText.toLowerCase().includes('patient name') ||
          r.questionText.toLowerCase().includes('full name')
        )
      )
      
      const patientName = nameResponse?.answer || nameResponse?.answerText || '?'
      
      return (
        <div 
          className={`${sizeClass} rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold text-2xl border border-blue-300`}
        >
          {patientName.charAt(0)?.toUpperCase() || '?'}
        </div>
      )
    }

    // Check if the icon is a URL (image)
    if (typeof icon === "string" && 
        (icon.startsWith("http://") || icon.startsWith("https://")) &&
        /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(icon)) {
      return (
        <div className="relative">
          <img
            src={icon}
            alt="Patient Icon"
            className={`${sizeClass} rounded-full object-cover border border-gray-300`}
            onError={(e) => {
              const fallbackEl = e.target.nextElementSibling
              if (fallbackEl) {
                fallbackEl.style.display = 'flex'
              }
              e.target.style.display = 'none'
            }}
          />
          <div 
            className={`${sizeClass} rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-2xl border border-gray-300 hidden`}
            style={{display: 'none'}}
          >
            {(() => {
              const latestVisit = patient?.visits?.[patient.visits.length - 1]
              const responses = latestVisit?.formResponses || []
              const nameResponse = responses.find(r => 
                r.questionText && (
                  r.questionText.toLowerCase().includes('name') ||
                  r.questionText.toLowerCase() === 'name' ||
                  r.questionText.toLowerCase().startsWith('name') ||
                  r.questionText.toLowerCase().includes('patient name') ||
                  r.questionText.toLowerCase().includes('full name')
                )
              )
              const patientName = nameResponse?.answer || nameResponse?.answerText || '?'
              return patientName.charAt(0)?.toUpperCase() || '?'
            })()}
          </div>
        </div>
      )
    }
    
    // If it's emoji/text, show it in a circle
    return (
      <div className={`${sizeClass} rounded-full bg-gray-100 flex items-center justify-center text-4xl border border-gray-300`}>
        {icon}
      </div>
    )
  }

  // Get patient info
  const getPatientInfo = (patient) => {
    if (!patient.visits || patient.visits.length === 0) {
      return { age: 'N/A', email: 'N/A', phone: 'N/A', name: 'N/A' }
    }
    
    // Get the most recent visit's responses
    const latestVisit = patient.visits[patient.visits.length - 1]
    const responses = latestVisit.formResponses
    
    // More robust name extraction
    const nameResponse = responses.find(r => 
      r.questionText && (
        r.questionText.toLowerCase().includes('name') ||
        r.questionText.toLowerCase() === 'name' ||
        r.questionText.toLowerCase().startsWith('name') ||
        r.questionText.toLowerCase().includes('patient name') ||
        r.questionText.toLowerCase().includes('full name')
      )
    )
    
    const name = nameResponse?.answer || nameResponse?.answerText || 'N/A'
    const age = responses.find(r => r.questionText?.toLowerCase().includes('age'))?.answer || 
               responses.find(r => r.questionText?.toLowerCase().includes('age'))?.answerText || 'N/A'
    const email = responses.find(r => r.questionText?.toLowerCase().includes('email'))?.answer || 
                  responses.find(r => r.questionText?.toLowerCase().includes('email'))?.answerText || 'N/A'
    const phone = responses.find(r => r.questionText?.toLowerCase().includes('phone'))?.answer || 
                  responses.find(r => r.questionText?.toLowerCase().includes('phone'))?.answerText || 'N/A'
    
    return { age, email, phone, name }
  }

  // Navigate to patient's collected data
  const handlePatientClick = (project, patient) => {
    // Get the original project data from location state
    const originalProject = location.state?.project
    
    // The patient data is already in the correct format from groupedResponses
    const transformedGroupedResponses = originalProject?.groupedResponses || []
    
    console.log('Final transformed data for CollectedData:', transformedGroupedResponses)
    
    navigate('/project-details/collected-data', {
      state: { 
        project: {
          ...originalProject,
          selectedPatient: patient,
          // Use the already grouped responses
          groupedResponses: transformedGroupedResponses
        }
      }
    })
  }

  // Process patients data for display
  const allPatients = useMemo(() => {
    return patients.map((patient, index) => {
      // Extract patient info from the latest visit
      const latestVisit = patient.visits?.[patient.visits.length - 1]
      const responses = latestVisit?.formResponses || []
      
      // More robust name extraction
      const nameResponse = responses.find(r => 
        r.questionText && (
          r.questionText.toLowerCase().includes('name') ||
          r.questionText.toLowerCase() === 'name' ||
          r.questionText.toLowerCase().startsWith('name') ||
          r.questionText.toLowerCase().includes('patient name') ||
          r.questionText.toLowerCase().includes('full name')
        )
      )
      
      const patientName = nameResponse?.answer || nameResponse?.answerText || patient.patient || 'Unknown'
      
      return {
        ...patient,
        _id: `patient-${index}`, // Generate an ID for the grouped patient
        // Add calculated fields for display
        patientName: patientName,
        lastVisit: latestVisit?.date ? new Date(latestVisit.date).toLocaleDateString() : 'N/A',
        totalVisits: patient.visits?.length || 0, // Count the actual visits
        project: { formTitle: 'Medical Form' } // Default project info
      }
    })
  }, [patients])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading patients...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header with title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Patient Gallery</h1>
      </div>

      {/* Patient count info */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {allPatients.length} {allPatients.length === 1 ? "patient" : "patients"}
        </p>
      </div>

      {/* Patient Cards Grid */}
      {allPatients.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No patients found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allPatients.map((patient, index) => {
            const patientInfo = getPatientInfo(patient)
            return (
              <div
                key={`${patient._id}-${index}`}
                className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => handlePatientClick(patient.project, patient)}
              >
                <div className="p-6">
                  {/* Patient Icon */}
                  <div className="flex justify-center mb-4">
                    {renderPatientIcon(patient, "w-20 h-20")}
                  </div>
                  
                  {/* Patient Name */}
                  <h3 className="text-lg font-semibold text-gray-800 text-center mb-3">
                    {patientInfo.name}
                  </h3>
                  
                  {/* Patient Info */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Age:</span>
                      <span className="font-medium">{patientInfo.age}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Visits:</span>
                      <span className="font-medium">{patient.totalVisits}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Last Visit:</span>
                      <span className="font-medium">{patient.lastVisit}</span>
                    </div>
                    <div className="border-t pt-2 mt-3">
                      <p className="text-xs text-gray-500 truncate">
                        Form: {patient.project.formTitle}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Hover indicator */}
                <div className="bg-blue-50 px-6 py-3 border-t border-gray-100">
                  <p className="text-xs text-blue-600 text-center font-medium">
                    Click to view details →
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default PatientGallery

