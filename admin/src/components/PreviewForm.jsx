import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Grid, Tag } from 'lucide-react';
import { getTemplateById } from '../api';

export default function PreviewForm() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTemplateDetails = async () => {
      try {
        setIsLoading(true);
        const fetchedTemplate = await getTemplateById(templateId);
        setTemplate(fetchedTemplate);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching template details:", error);
        setIsLoading(false);
      }
    };

    fetchTemplateDetails();
  }, [templateId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <div className="animate-pulse w-16 h-16 mx-auto mb-4 bg-blue-300 rounded-full"></div>
          <p className="text-blue-800">Loading template...</p>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-red-100">
        <div className="text-center">
          <div className="mb-4">
            <FileText className="w-16 h-16 mx-auto text-red-400" />
          </div>
          <p className="text-red-800 text-xl">Template not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Modern Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 md:p-8">
          <div className="flex items-center">
            <button
              onClick={handleGoBack}
              className="mr-4 p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{template.name}</h1>
              {template.description && (
                <p className="text-sm md:text-base text-white/80 mt-1">{template.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Sections Container */}
        <div className="p-6 md:p-8 space-y-6">
          {template.sections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="bg-white border border-blue-100 rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Section Header */}
              <div className="bg-blue-50 p-4 flex items-center border-b border-blue-100">
                <Grid className="w-5 h-5 mr-3 text-blue-500" />
                <h2 className="text-lg md:text-xl font-semibold text-blue-800">
                  {section.title || `Section ${sectionIndex + 1}`}
                </h2>
              </div>

              {/* Questions */}
              <div className="p-4 md:p-6 space-y-4">
                {section.questions.map((question, questionIndex) => (
                  <div
                    key={questionIndex}
                    className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start mb-2">
                      <span className="mr-3 text-blue-500 font-bold text-lg">
                        {sectionIndex + 1}.{questionIndex + 1}
                      </span>
                      <p className="text-blue-900 font-medium text-base">
                        {/* Check if question.text is an object and handle accordingly */}
                        {typeof question.text === 'object' ? question.text.text : question.text}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center text-sm text-blue-700">
                      <Tag className="w-4 h-4 mr-2" />
                      <span className="mr-4">
                        Type: <span className="font-semibold">{question.type}</span>
                      </span>

                      {question.options && question.options.length > 0 && (
                        <details className="w-full">
                          <summary className="cursor-pointer hover:text-blue-900">
                            View Options ({question.options.length})
                          </summary>
                          <ul className="mt-2 pl-4 text-blue-700 list-disc space-y-1">
                            {question.options.map((option, optIndex) => (
                              <li key={optIndex}>
                                {/* Check if option is an object and render the appropriate property */}
                                {typeof option === 'object' ? option.text : option}
                              </li>
                            ))}
                          </ul>
                        </details>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
