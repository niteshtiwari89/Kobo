import { Filter, Grid, Archive, Delete, Rocket } from "lucide-react"
import { Link } from "react-router-dom"

const ProjectsContent = ({
  isFilterOpen,
  setIsFilterOpen,
  isFieldsOpen,
  setIsFieldsOpen,
  selectedFields,
  setSelectedFields,
}) => {
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">My Projects</h2>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button
            onClick={() => setIsFieldsOpen(true)}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Grid className="h-4 w-4" />
            <span>Fields</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
            <Archive className="h-4 w-4" />
            <span>Archive</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
            <Delete className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-3 text-left">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Project name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Owner</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date modified</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date deployed</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Submissions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-4">
                <input type="checkbox" className="rounded border-gray-300" />
              </td>
              <td className="px-4 py-4">
                <Link to="/project-details" className="text-blue-600 hover:underline">
                  Demo Project
                </Link>
              </td>
              <td className="px-4 py-4">
                <span className="flex items-center text-blue-600">
                  <Rocket className="h-4 w-4 mr-1" />
                  deployed
                </span>
              </td>
              <td className="px-4 py-4">me</td>
              <td className="px-4 py-4">February 5, 2025</td>
              <td className="px-4 py-4">February 5, 2025</td>
              <td className="px-4 py-4">1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProjectsContent

