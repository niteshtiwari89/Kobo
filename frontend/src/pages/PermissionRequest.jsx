import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const PermissionRequest = () => {
  const location = useLocation();

  console.log(location?.state?.project?._id);
  const [permissionRequests, setPermissionRequests] = useState([]);
  const [allPermissionRequests, setAllPermissionRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState("");
  const tokenId = localStorage.getItem("token");

  // Fetch all permission requests when the component mounts
  useEffect(() => {
    const fetchPermissionRequests = async () => {
      try {
        const response = await axios.get(
          `https://relearn-backend.vercel.app/api/forms/form/${location?.state?.project?._id}/permission-requests`,
          {
            headers: {
              Authorization: `Bearer ${tokenId}`,
            },
          }
        );

        setPermissionRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error?.response?.data?.message);
        

        setMessage(error?.response?.data?.message);
        // setMessage("Failed to fetch get permission requests.");
        setLoading(false);
      }
    };

    fetchPermissionRequests();
  }, [tokenId]);
  useEffect(() => {
    const fetchAllPermissionRequests = async () => {
      try {
        const response = await axios.get(
          `https://relearn-backend.vercel.app/api/forms/form/${location?.state?.project?._id}/all-permission-requests`
        );

        console.log(response.data)
        setAllPermissionRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setAllMessage("Failed to fetch permission requests.");
        setLoading(false);
      }
    };

    fetchAllPermissionRequests();
  }, [tokenId]);

  console.log(allPermissionRequests)

  console.log(permissionRequests[0]?._id);
  // Handle Accept or Reject request
  const handleRequestAction = async (formId, action) => {
    setLoading(true);
    setMessage("");

    try {
      // Send Accept/Reject action to the backend
      const response = await axios.put(
        `https://relearn-backend.vercel.app/api/forms/form/${location?.state?.project?._id}/permission-request/${permissionRequests[0]._id}`,
        { action: action },
        {
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
        }
      );

      if (response.status === 200) {
        // Update the list of permission requests
        setPermissionRequests(
          permissionRequests.filter((request) => request.formId !== formId)
        );
        setMessage(
          `${
            action.charAt(0).toUpperCase() + action.slice(1)
          } request successful!`
        );
      }
    } catch (e) {
      setMessage(`Failed to ${action} ${e} request.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex  gap-4 justify-center bg-gray-100 bg-opacity-10">
      <div className="bg-white shadow-lg w-full flex flex-col max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="bg-blue-400 text-white px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Permission Requests</h2>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {loading ? (
              <div className="text-center text-gray-700">Loading...</div>
            ) : permissionRequests.length === 0 ? (
              <div className="text-center text-gray-700">
                No permission requests found.
              </div>
            ) : (
              <div>
                {permissionRequests.map((request) => (
                  <div
                    key={request.formId}
                    className="mb-4 p-4 border-b border-gray-300"
                  >
                    {console.log(request)}
                    <h3 className="font-semibold text-gray-800">
                      {request.formTitle}
                    </h3>
                    <p className="text-gray-600">
                      {request.requesterUserId.name} requested permission to
                      access the project.
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: {request.status.toUpperCase()}
                    </p>

                    {/* Actions */}
                    {request.status === "pending" && (
                      <div className="mt-2">
                        <button
                          onClick={() =>
                            handleRequestAction(request.formId, "approve")
                          }
                          className="mr-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleRequestAction(request.formId, "deny")
                          }
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {message && (
          <div className="px-4 py-3 bg-blue-50 text-blue-600 text-center">
            {message}
          </div>
        )}
      </div>
      <div className="bg-white shadow-lg w-full flex flex-col max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="bg-blue-400 text-white px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Access</h2>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {loading ? (
              <div className="text-center text-gray-700">Loading...</div>
            ) : allPermissionRequests.length === 0 ? (
              <div className="text-center text-gray-700">
                No permission requests found.
              </div>
            ) : (
              <div>
                {allPermissionRequests.map((requestForm) => (
                  <div
                    key={requestForm.formId}
                    className="mb-4 p-4 border-b border-gray-300"
                  >
                    {console.log(requestForm)}
                    <h3 className="font-semibold text-gray-800">
                      {requestForm.formTitle}
                    </h3>
                    <p className="text-gray-600">
                      {requestForm.requesterUserId.name} has permission to
                      access the project.
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: {requestForm.status.toUpperCase()}
                    </p>

                    {/* Actions */}
                    {/* {requestForm.status === "pending" && (
                      <div className="mt-2">
                        <button
                          onClick={() =>
                            handleRequestAction(requestForm.formId, "approve")
                          }
                          className="mr-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleRequestAction(requestForm.formId, "deny")
                          }
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    )} */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {allMessage && (
          <div className="px-4 py-3 bg-blue-50 text-blue-600 text-center">
            {allMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionRequest;
