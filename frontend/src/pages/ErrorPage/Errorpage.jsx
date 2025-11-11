import { AlertCircle, Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center p-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4 text-center">
            <div
              className="bg-danger bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
              style={{ width: '96px', height: '96px' }}
            >
              <AlertCircle className="text-danger" style={{ width: '48px', height: '48px' }} />
            </div>
            <h1 className="text-dark mb-3">Meeting Not Found</h1>
            <p className="text-muted mb-4">
              The meeting you're trying to join doesn't exist or has already ended.
              Please check the meeting link and try again.
            </p>
            <div className="bg-white rounded-3 p-4 mb-4 border shadow-sm">
              <div className="d-flex flex-column gap-3">
                <div className="bg-secondary bg-opacity-25 rounded mx-auto" style={{ height: '12px', width: '75%' }} />
                <div className="bg-secondary bg-opacity-25 rounded mx-auto" style={{ height: '12px', width: '50%' }} />
                <div
                  className="bg-light rounded-3 d-flex align-items-center justify-content-center mt-3"
                  style={{ height: '48px' }}
                >
                  <AlertCircle className="text-secondary opacity-50" style={{ width: '24px', height: '24px' }} />
                </div>
              </div>
            </div>
            <div className="d-grid gap-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="btn btn-primary btn-lg py-3"
              >
                <Home className="me-2" style={{ width: '20px', height: '20px' }} />
                Back to Dashboard
              </button>
              <button
                onClick={() => window.history.back()}
                className="btn btn-outline-secondary btn-lg py-3"
              >
                <ArrowLeft className="me-2" style={{ width: '20px', height: '20px' }} />
                Go Back
              </button>
            </div>
            <p className="text-muted small mt-4">
              Need help? Contact support at{' '}
              <a href="mailto:support@stoicmeet.com" className="text-primary text-decoration-none">
                support@stoicmeet.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
