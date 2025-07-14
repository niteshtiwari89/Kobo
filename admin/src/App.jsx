import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AdminPanel from "./components/AdminHome";
import CreateForm from "./components/CreateForm";
import FormFill from "./components/FormFill";
import LoginForm from "./components/LoginForm";
import PrivateRoute from "./components/PrivateRoute";
import CreateTemplateForm from "./components/CreateTemplateForm";
import PreviewForm from "./components/PreviewForm";
import PreviewLibraryForm from "./components/PreviewLibraryForm";
import LibraryForm from "./components/LibraryForm";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/create-form"
          element={
            <PrivateRoute>
              <CreateForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/form/:link"
          element={
            // <PrivateRoute>
            <FormFill />
            // </PrivateRoute>
          }
        />
        
        <Route
          path="/admin-panel/*"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/library-form"
          element={
            <PrivateRoute>
              <LibraryForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-template-form/:projectName/:projectId/:projectDescription"
          element={<CreateTemplateForm />}
        />
        <Route path="/preview-form/:templateId" element={<PreviewForm />} />
        <Route
          path="/preview-library-form/:formId"
          element={<PrivateRoute><PreviewLibraryForm /></PrivateRoute>}
        />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
      </Router>
      
      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </>
  );
};

export default App;
