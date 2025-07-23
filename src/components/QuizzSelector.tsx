import { useState, useEffect } from 'react';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { fetchCategoryOptions } from '../services/CategoryService';
import { useQuizzData } from '../providers/QuizzDataProvider';
import { fetchQuestions } from '../services/QuestionService';
import type { Option } from '../types/Option';

function useOptions(defaultOptions: Option[] = []) {
  const [options, setOptions] = useState<Option[]>(defaultOptions);
  return [options, setOptions] as const;
}

const QuizzSelector: React.FC = () => {
  // Navigator
  const navigate = useNavigate();

  // States
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [categoryOptions, setCategoryOptions] = useOptions([]);
  const [difficultyOptions, setDifficultyOptions] = useOptions([]);
  const { setQuestions } = useQuizzData();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [categoryInvalid, setCategoryInvalid] = useState(false);
  const [difficultyInvalid, setDifficultyInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // useEffects
  useEffect(() => {
    // Initialize difficulty options
    setDifficultyOptions([
      { id: 'easy', name: 'Easy' },
      { id: 'medium', name: 'Medium' },
      { id: 'hard', name: 'Hard' }
    ]);
    // Initialize category options
    fetchCategoryOptions()
      .then(options => setCategoryOptions(options))
      .catch((error: Error) => {
        // If an error occurs, set the error message and show the error modal
        setErrorMsg(error.message || 'Une erreur inattendue est survenue');
        setShowModal(true);
      });
  }, []);

  // Internal functions
  const handleValidate = () => {
    let valid = true;
    // Verify the fields
    if (!selectedCategory) {
      setCategoryInvalid(true);
      valid = false;
    } else {
      setCategoryInvalid(false);
    }
    if (!selectedDifficulty) {
      setDifficultyInvalid(true);
      valid = false;
    } else {
      setDifficultyInvalid(false);
    }
    // If everything is valid, set the selected category and difficulty on quizz data
    if (valid) {
      setQuestions([]);
      setIsLoading(true);
      fetchQuestions(selectedCategory, selectedDifficulty)
        .then(results => {
          setQuestions(results);
        })
        .catch((err: Error) => {
          console.debug('Error fetching questions:', err);
          setQuestions([]);
          setErrorMsg(err.message || 'Une erreur inattendue est survenue');
          setShowModal(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center mt-4 mb-4">
        <h1 className="mb-3 text-center">Choose your category and difficulty</h1>
        <div className="d-flex gap-3 mb-3">
          <select
            id="categorySelect"
            className={`form-select${categoryInvalid ? ' is-invalid' : ''}`}
            value={selectedCategory}
            onChange={e => {
              setSelectedCategory(e.target.value);
              setCategoryInvalid(false);
            }}
            style={{ width: '300px' }}
          >
            <option value="" disabled hidden>Choose a category</option>
            {categoryOptions.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
          <select
            id="difficultySelect"
            className={`form-select${difficultyInvalid ? ' is-invalid' : ''}`}
            value={selectedDifficulty}
            onChange={e => {
              setSelectedDifficulty(e.target.value);
              setDifficultyInvalid(false);
            }}
            style={{ width: '150px' }}
          >
            <option value="" disabled hidden>and difficulty</option>
            {difficultyOptions.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>
        <button id="createBtn" className="btn btn-primary" onClick={handleValidate} >Validate</button>
      </div>
      {isLoading && <Spinner />}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Erreur</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>{errorMsg}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => navigate(0)}>
                  Rafraichir la page et réessayer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizzSelector;
