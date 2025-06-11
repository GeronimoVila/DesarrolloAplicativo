import { useNavigate } from 'react-router-dom'; // Importa useNavigate de react-router-dom

export const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <section className="bgWhite">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div className="flex flex-col items-center maxW-sm mx-auto text-center">
          <p className="p-3 text-sm font-medium text-primary-300 rounded-full bg-blue-50 d">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
            Página no encontrada
          </h1>
          <p className="mt-4 text-gray-500">
            Inténtalo más tarde o regresa a la página principal
          </p>

          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <button
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bgWhite border roundedLg gap-x-2 sm:w-auto hover:bg-gray-100"
              onClick={handleGoBack}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              <span>Volver</span>
            </button>

            <button
              className="w-1/2 px-5 py-2 text-sm trackingWide text-white transition-colors duration-200 bg-primary-300 roundedLg shrink-0 sm:w-auto hover:bg-primary-200"
              onClick={handleGoHome}
            >
              Ir a la página principal
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
