import { useState, useCallback } from 'react';
import { HelpCircle, Upload } from 'lucide-react';

const MediaContent = () => {
  const [files, setFiles] = useState([]);
  const [url, setUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileArray = Array.from(e.dataTransfer.files);
      setFiles(prevFiles => [...prevFiles, ...fileArray]);
      e.dataTransfer.clearData();
    }
  }, []);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...fileArray]);
    }
  };

  const handleUrlSubmit = () => {
    if (url.trim()) {
      setFiles(prevFiles => [...prevFiles, { name: url, type: 'url' }]);
      setUrl('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <h2 className="text-xl text-gray-700">Attach files</h2>
        <HelpCircle className="w-5 h-5 text-gray-400" />
      </div>

      {/* Drag and Drop Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-lg text-gray-600 mb-2">Drag and drop files here</p>
          <p className="text-gray-500 mb-4">or</p>
          <label className="cursor-pointer text-blue-500 hover:text-blue-600">
            click here to browse
            <input
              type="file"
              className="hidden"
              multiple
              onChange={handleFileSelect}
            />
          </label>
        </div>
      </div>

      {/* URL Input */}
      <div className="space-y-2">
        <p className="text-gray-700">You can also add files using a URL</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste URL here"
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleUrlSubmit}
            className="px-6 py-2 bg-gray-100 text-blue-500 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Attached Files */}
      <div className="space-y-2">
        <h3 className="text-lg text-gray-700">Attached files</h3>
        {files.length === 0 ? (
          <p className="text-gray-500">No files uploaded yet</p>
        ) : (
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-gray-700">{file.name}</span>
                <button
                  onClick={() => setFiles(files.filter((_, i) => i !== index))}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MediaContent;