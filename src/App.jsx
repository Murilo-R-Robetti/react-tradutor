import { useState,useEffect } from "react";

function App() {
  const languages = [
    { code: "en-us", name: "Inglês" },
    { code: "es", name: "Espanhol" },
    { code: "fr", name: "Francês" },
    { code: "de", name: "Alemão" },
    { code: "it", name: "Italiano" },
    { code: "pt-br", name: "Português" },
  ];
  const [texto, setTexto] = useState("")
  const [traduz, setTraduz] = useState("")
  function Tradutor() {
    fetch(`https://api.mymemory.translated.net/get?q=${texto}&langpair=en-us|pt-br`)
        .then((resposta) => resposta.json())
        .then((dados) => setTraduz(dados.responseData.translatedText))
        .catch((error) => {
            alert("Erro:", error);
        });
        console.log(traduz)
}
  let isLoading = false
  let error = ""

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center">
          <h1 className="text-headerColor text-2xl font-bold">Tradutor</h1>
        </div>
      </header>

      <main className="flex-grow flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <select
              className="text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer"
              value="en-us"
            >
              <option value="pt-br">Português</option>
              <option value="en-us">Inglês</option>
            </select>

            <button className="p-2 rounded-full hover:bg-gray-100 outline-none">
              <svg
                className="w-5 h-5 text-headerColor"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </button>

            <select 
              className="text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer"
              value="pt-br"
            >
              <option value="pt-br" selected>Português</option>
              <option value="en-us">Inglês</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-4">
              <textarea value={texto} onChange={(evento) => setTexto(evento.target.value)} 
                className="w-full h-40 text-lg text-textColor bg-transparent resize-none border-none outline-none"
                placeholder="Digite seu texto..."                
              ></textarea>
            </div>

            <div className="relative p-4 bg-secondaryBackground border-l border-gray-200">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-blue-500 border-t-2"></div>
                </div>
              ) : (
                <p className="text-lg text-textColor">{texto}</p>
              )}
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-100 border-t border-red-400 text-red-700">
              {error}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-3 text-sm text-headerColor text-center">
          &copy; {new Date().getFullYear()} Tradutor
        </div>
      </footer>
    </div>
  );
}

export default App;
